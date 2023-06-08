import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TimetableConstants } from './timetable.constant';
import * as _ from "lodash";
import { DndDropEvent } from 'ngx-drag-drop';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export interface ITimetableSlot {
	id: string;
	enabled: boolean,
	dayOfWeek: string;
	timeslot: any,
	timeShift: string;
	startTime: number;
	endTime: number;
	order: number;
	available: boolean;
	details?: IAvailability | null
}
export interface IAvailability {
	id?: number | null;
	timeslotId: string;
	schoolYear: number;
	timeShift?: string;
	semester: string;
	available: boolean;
	gradeCode: string;
	reasonOfUnavailability: any;
}
@Component({
	selector: 'tada-ngx-timetable',
	templateUrl: 'timetable.component.html',
	styleUrls: ["timetable.component.scss"]
})
export class TimetableComponent implements OnDestroy, OnChanges {
	objectKeys = Object.keys;
	SEMESTERS = {
		FIRST: 'FIRST',
		SECOND: 'SECOND',
		ALL: 'ALL'
	}
	semesters = Object.keys(this.SEMESTERS);
	solverStatusMessage: any = null;
	private readonly destroyed$ = new Subject<void>();
	MODE = {
		EDIT: 'edit',
		NEW: 'new'
	}
	@Input() debug: boolean = false;
	@Input() filterForm: any;
	@Input() timeShift: any;
	@Input() schoolYear: any;
	@Input() type!: string;
	@Input() grades!: any[];
	@Input() lessions!: any[];
	@Input() timetableProblemId!: any;
	@Input() majorsTranscript!: any[];
	@Input() timeslots!: any[];
	@Input() isEnableAdjustMode: boolean = false;
	@Input() showProgressLoading: boolean = false;
	@Output() onRemoveAction = new EventEmitter<any>();
	@Output() onDropAcion = new EventEmitter<any>();
	@Output() onCellClickAction = new EventEmitter<any>();
	@Input() popUpContent!: TemplateRef<any>;
	@Output() onCreateNewLession = new EventEmitter<any>();

	activeLessions: any[] = [];
	activeTeachManagement: any = undefined;
	private daysOfWeek = [
		"MONDAY",
		"TUESDAY",
		"WEDNESDAY",
		"THURSDAY",
		"FRIDAY",
		"SATURDAY",
		"SUNDAY",
	];

	mode: any;

	draggable = {
		data: null,
		effectAllowed: "all",
		disable: true,
		handle: false
	};

	form!: UntypedFormGroup;
	timeTableData: any = {};
	isAutoUpdateClassIds: boolean = false;
	selectedClasses: any[] = [];
	classListSelectedDefault: any[] = [];
	teachManagements: any[] = [];
	dayLessionSlots = [...Array(5).keys()];
	CALLBACK_TIME = 5000;
	checkingGenerateProgresser: any = null;
	isDisabledPlanning: boolean = false;
	slotNumOfDay: any[] = [];

	TIMETABLE_EDIT_MODE = TimetableConstants.TIMETABLE_EDIT_MODE;

	activeSlot: any;
	activeFormDialog: any;

	FORM_FIELDS = {
		MAJOR: 'majorCode',
		TUTOR: 'tutorUuid',
		CLASS_ID: 'classId',
		SEMESTER: 'semester'
	};

	constructor(
		private fb: UntypedFormBuilder,
		private translate: TranslateService
	) {
		this.form = this.fb.group(
			{
				[this.FORM_FIELDS.MAJOR]: [{ value: -1 }],
				[this.FORM_FIELDS.TUTOR]: [{ value: '' }]
			}
		);
		this.translate.setDefaultLang('vn');
	}

	ngOnChanges(changes: SimpleChanges): void {

		if(this.debug) {
			console.log("__TIMETABLE_PROPS:", changes);
		}

		if (changes['timeShift']?.currentValue) {
			this.buildTimeTableBasic();
		}
		
		if (changes['timeslots']?.currentValue  ) {
				this.initTimetableSlot();
		}

		if (changes['isEnableAdjustMode']?.currentValue  ) {
			this.draggable = {
				...this.draggable,
				disable: !this.isEnableAdjustMode
			};
		}

		if (changes['filterForm']?.currentValue)  {
			this.filterFormChanges();
		}

		if (changes['lessions']?.currentValue) {
			this.mappingDataToTable();
		}
	}

	filterFormChanges() {
		if(!this.filterForm?.classIds?.length) {
			this.resetTimeTable();
		}
	}

	initTimetableSlot() {
		const alltimeslot: ITimetableSlot[] = this.timeslots;
		this.daysOfWeek.forEach((day) => {
			const slotsOfDay = alltimeslot.filter(
				(slot: any) => slot.dayOfWeek === day && slot.timeShift === this.timeShift
			);
			this.timeTableData[day] = {
				items: _.orderBy(slotsOfDay, ["order"]),
			};
			const maxLession = this.getMaxlessionOrder(slotsOfDay);
			this.slotNumOfDay = [...Array(maxLession).keys()];
		});
	}

	getMaxlessionOrder(timeSlot: any[]) {
		return _.maxBy(timeSlot, (o: any) => { return o.order; })?.order || 10;
	}

	buildTimeTableBasic() {
		this.daysOfWeek.forEach((day: string) => {
			this.timeTableData[day] = {
				items: [],
			};
		});
	}

	mappingDataToTable() {
		this.daysOfWeek.forEach((day) => {
			const slotsOfDay = this.lessions.filter(
				(slot: any) => slot.dayOfWeek === day
			);
			this.timeTableData[day] = {
				items: _.orderBy(slotsOfDay, ["order"]),
			};
		});
	}

	getLessonByOrder(day: string, index: number, timeShift: string) {
		return this.timeTableData[day].items.filter(
			(item: any) => {
				const found = item.order === index && item?.timeShift === timeShift;
				return found;
			}
		);
	}

	resetTimeTable() {
		this.buildTimeTableBasic();
	}


	onClickTutorName(tutor: any) {
		window.open(`/tutors/${tutor.uuid}`, '_blank')
	}

	getActiveGradeName() {
		return _.find(this.grades, (item: any) => item.code === this.filterForm['gradeCode'])?.title;
	}

	onDrop(event: DndDropEvent, day: string, slotNum: number, timeShift: string) {

		const dropSlot = this.getSlot(day, slotNum);

		const dropLession = {
			"id": _.get(event, "data.details.id", 0),
			"schoolYear": _.get(event, "data.details.schoolYear", 0),
			"semester": _.get(event, "data.details.semester", 0),
			timeslotId: dropSlot.id,
			timetableProblemId: this.timetableProblemId,
			"tutor": _.get(event, "data.details.tutor", null),
			"major": _.get(event, "data.details.major", null),
			"clazz": _.get(event, "data.details.clazz", null),
		};

		const payload = [dropLession];

		let currentLession = _.get(this.getLessonByOrder(day, slotNum, timeShift), "0", null);

		if (currentLession) {

			currentLession = {
				"id": _.get(currentLession, "details.id", 0),
				"schoolYear": _.get(currentLession, "details.schoolYear", 0),
				"semester": _.get(currentLession, "details.semester", 0),
				timeslotId: _.get(event, "data.details.timeslot.id", 0),
				timetableProblemId: this.timetableProblemId,
				"tutor": _.get(currentLession, "details.tutor", null),
				"major": _.get(currentLession, "details.major", null),
				"clazz": _.get(currentLession, "details.clazz", null),
			};

			payload.push(currentLession);
		}

		this.onDropAcion.emit(payload);

	}

	changeOnOffSwitch($event: any) {

		this.isEnableAdjustMode = $event.target.checked;

		this.draggable = {
			...this.draggable,
			disable: !this.isEnableAdjustMode
		};

	}

	getSlot(day: string, order: number) {
		const slot = this.timeslots.find(
			(slot: any) => slot.dayOfWeek === day && slot.timeShift === this.timeShift && slot.order === order
		);
		return slot;
	}

	getSlotByOrder(day: string, index: number) {
		return this.timeTableData[day].items.filter(
			(item: ITimetableSlot) => item.order === index
		);
	}

	onCellClick(p: any, day: string, slotNum: number, timeShift: string) {

		this.activeSlot = this.getSlot(day, slotNum);
		this.activeTeachManagement = null;
		if (!this.isEnableAdjustMode || !this.activeSlot.enabled) return;
		this.activeLessions = this.getLessonByOrder(day, slotNum, timeShift);
		p.open();

		if (!this.activeLessions?.length) {
			this.mode = this.MODE.NEW;
			this.activeFormDialog = p;
			this.onCellClickAction.emit(this.activeLessions);
		} else {
			this.mode = this.MODE.EDIT;
		}
	}

	onSelectTeachManagement($event: any) {
		this.activeTeachManagement = this.majorsTranscript.find((item: any) => item.code === $event);
	}

	getMajor() {
		return {
			"code": _.get(this.activeTeachManagement, 'teachManagement.majorCode', 0),
			"name": _.get(this.activeTeachManagement, 'teachManagement.majorName', 0),
		}
	}

	getTutor() {
		return {
			"uuid": _.get(this.activeTeachManagement, 'teachManagement.tutorUuid', 0),
			"name": _.get(this.activeTeachManagement, 'teachManagement.tutorName', 0)
		}
	}

	getClazz() {
		return {
			"code": _.get(this.activeTeachManagement, 'teachManagement.classId', 0),
			"name": _.get(this.activeTeachManagement, 'teachManagement.className', 0),
			"gradeCode": _.get(this.activeTeachManagement, 'teachManagement.gradeCode', 0),
		}
	}

	createNewLession() {

		if (!this.form.valid) return;

		const payload = {
			"schoolYear": this.schoolYear,
			"semester": this.filterForm.semester,
			"timeslotId": this.activeSlot?.id,
			"timetableProblemId": this.timetableProblemId,
			"tutor": this.getTutor(),
			"major": this.getMajor(),
			"clazz": this.getClazz()
		}

		this.onCreateNewLession.emit(payload);

	}

	get isAssignedTutor() {
		return this.activeTeachManagement && this.activeTeachManagement?.teachManagement?.tutorName;
	}

	get isUnAssignedTutor() {
		return this.activeTeachManagement && !this.activeTeachManagement?.teachManagement?.tutorName;
	}

	closeForm() {
		this.activeFormDialog.close();
	}

	removeLessionFromCell() {
		const activeLession = this.activeLessions[0];
		this.onRemoveAction.emit(activeLession)
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
		this.resetTimeTable();
	}
}
