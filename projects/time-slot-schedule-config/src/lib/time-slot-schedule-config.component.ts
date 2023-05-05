import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { getActiveYear } from '../shared/helper';
import { Constants } from '../shared/constant';
import { IAvailability, ITimetableSlot } from './module/type';
import * as _ from "lodash";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tada-ngx-time-slot-schedule-config',
  templateUrl: 'time-slot-schedule-config.component.html',
  styleUrls: []
})
export class TimeSlotScheduleConfigComponent implements OnInit, OnChanges {
	schoolYear: number = getActiveYear();
	objectKeys = Object.keys;
	alltimeslot: any[] = [];
	classList: any[] = [];
	majors: any[] = [];
	activeClassIndex: number = 0;
	semesters = Object.keys(Constants.SEMESTERS);
	daysOfWeek = Constants.WEEKDAYS;
	semester: string = Constants.SEMESTERS.ALL;
	timeTableData: any = {};
	classListSelectedDefault: any[] = [];
	slotNumOfDay: any[] = [];
	tutorUuid: any = null;
	@Input() gradeCode = '';
	@Input() timeShift = '';
  @Input() timeslots: any[] = [];
	@Input() availabilities: IAvailability[] = [];
	@Output() dataChanged = new EventEmitter<string>();
  
	constructor(
		private translate: TranslateService
	) {
		translate.setDefaultLang('vi');
	}

	ngOnInit() {
		this.buildTimeTableBasic();
	}

	ngOnChanges(changes: any): void {

    console.log(changes);
    if (changes?.timeslots?.currentValue) {
			this.initTimetableSlot();
		}

		if (changes && changes?.availabilities?.currentValue) {
			Object.values(this.timeTableData).forEach((weekday: any) => {
				weekday.items = weekday.items.map((slot: ITimetableSlot) => ({
					...slot,
					details: this.getAvailabilities(slot),
				}));
			});
			this.dataChanged.emit(this.timeTableData);
		}

	}

	getMaxlessionOrder(timeSlot: any[]) {
		return _.maxBy(timeSlot, (o: any) => { return o.order; })?.order || 10;
	}

	getAvailabilities(slot: ITimetableSlot) {
		const foundSchedule = this.availabilities.find(
			(item: IAvailability) => item.timeslotId === slot.id
		);
		if (foundSchedule) {
			slot.enabled = true;
		}

		return foundSchedule;
	}

	buildTimeTableBasic() {
    console.log('buildTimeTableBasic....');
		this.daysOfWeek.forEach((day: string) => {
			this.timeTableData[day] = {
				items: [],
			};
		});
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
    console.log("this.timeTableData:",this.timeTableData);
    console.log("this.slotNumOfDay:",this.slotNumOfDay)

	}

	getSlotByOrder(day: string, index: number) {
		return this.timeTableData[day].items.filter(
			(item: ITimetableSlot) => item.order === index
		);
	}

	onSelectTimeSlot(timeslot: ITimetableSlot) {
		if (!timeslot.enabled) return;
		if (!!timeslot?.id && timeslot.details) {
			timeslot.details.available = !timeslot.details.available;
		} else {
			timeslot.details = {
				id: null,
				timeslotId: timeslot.id,
				schoolYear: getActiveYear(),
				semester: this.semester,
				gradeCode: this.gradeCode,
				available: true,
				reasonOfUnavailability: null,
			};
		}

		setTimeout(() => {
			this.dataChanged.emit(this.timeTableData);
		}, 500);

	}

	ngOnDestroy(): void { }
}
