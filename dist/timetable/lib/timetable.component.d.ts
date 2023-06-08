import { EventEmitter, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export interface ITimetableSlot {
    id: string;
    enabled: boolean;
    dayOfWeek: string;
    timeslot: any;
    timeShift: string;
    startTime: number;
    endTime: number;
    order: number;
    available: boolean;
    details?: IAvailability | null;
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
export declare class TimetableComponent implements OnDestroy, OnChanges {
    private fb;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    SEMESTERS: {
        FIRST: string;
        SECOND: string;
        ALL: string;
    };
    semesters: string[];
    solverStatusMessage: any;
    private readonly destroyed$;
    MODE: {
        EDIT: string;
        NEW: string;
    };
    filterForm: any;
    timeShift: any;
    schoolYear: any;
    type: string;
    grades: any[];
    lessions: any[];
    timetableProblemId: any;
    majorsTranscript: any[];
    classes: any[];
    timeslots: any[];
    isEnableAdjustMode: boolean;
    onRemoveAction: EventEmitter<any>;
    onDropAcion: EventEmitter<any>;
    onCellClickAction: EventEmitter<any>;
    popUpContent: TemplateRef<any>;
    onCreateNewLession: EventEmitter<any>;
    activeLessions: any[];
    activeTeachManagement: any;
    private daysOfWeek;
    mode: any;
    draggable: {
        data: null;
        effectAllowed: string;
        disable: boolean;
        handle: boolean;
    };
    form: UntypedFormGroup;
    timeTableData: any;
    isAutoUpdateClassIds: boolean;
    isInProgress: EventEmitter<boolean>;
    selectedClasses: any[];
    classListSelectedDefault: any[];
    teachManagements: any[];
    dayLessionSlots: number[];
    CALLBACK_TIME: number;
    checkingGenerateProgresser: any;
    isDisabledPlanning: boolean;
    slotNumOfDay: any[];
    showProgressLoading: boolean;
    TIMETABLE_EDIT_MODE: {
        ON: string;
        OFF: string;
    };
    activeSlot: any;
    activeFormDialog: any;
    FORM_FIELDS: {
        MAJOR: string;
        TUTOR: string;
        CLASS_ID: string;
        SEMESTER: string;
    };
    constructor(fb: UntypedFormBuilder);
    ngOnChanges(changes: SimpleChanges): void;
    initTimetableSlot(): void;
    getMaxlessionOrder(timeSlot: any[]): any;
    buildTimeTableBasic(): void;
    mappingDataToTable(): void;
    getLessonByOrder(day: string, index: number, timeShift: string): any;
    resetTimeTable(): void;
    onClickTutorName(tutor: any): void;
    getActiveGradeName(): any;
    onDrop(event: DndDropEvent, day: string, slotNum: number, timeShift: string): void;
    changeOnOffSwitch($event: any): void;
    getSlot(day: string, order: number): any;
    getSlotByOrder(day: string, index: number): any;
    onCellClick(p: any, day: string, slotNum: number, timeShift: string): void;
    onSelectTeachManagement($event: any): void;
    getMajor(): {
        code: any;
        name: any;
    };
    getTutor(): {
        uuid: any;
        name: any;
    };
    getClazz(): {
        code: any;
        name: any;
        gradeCode: any;
    };
    createNewLession(): void;
    get isAssignedTutor(): any;
    get isUnAssignedTutor(): any;
    closeForm(): void;
    removeLessionFromCell(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimetableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimetableComponent, "tada-ngx-timetable", never, { "filterForm": "filterForm"; "timeShift": "timeShift"; "schoolYear": "schoolYear"; "type": "type"; "grades": "grades"; "lessions": "lessions"; "timetableProblemId": "timetableProblemId"; "majorsTranscript": "majorsTranscript"; "classes": "classes"; "timeslots": "timeslots"; "isEnableAdjustMode": "isEnableAdjustMode"; "popUpContent": "popUpContent"; }, { "onRemoveAction": "onRemoveAction"; "onDropAcion": "onDropAcion"; "onCellClickAction": "onCellClickAction"; "onCreateNewLession": "onCreateNewLession"; "isInProgress": "isInProgress"; }, never, never, false, never>;
}
