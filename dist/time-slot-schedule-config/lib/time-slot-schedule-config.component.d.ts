import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { IAvailability, ITimetableSlot } from './module/type';
import * as i0 from "@angular/core";
export declare class TimeSlotScheduleConfigComponent implements OnInit, OnChanges {
    schoolYear: number;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    alltimeslot: any[];
    classList: any[];
    majors: any[];
    activeClassIndex: number;
    semesters: string[];
    private daysOfWeek;
    semester: string;
    timeTableData: any;
    classListSelectedDefault: any[];
    slotNumOfDay: any[];
    tutorUuid: any;
    gradeCode: string;
    timeShift: string;
    timeslots: any[];
    availabilities: IAvailability[];
    dataChanged: EventEmitter<string>;
    items: {
        id: number;
        name: string;
    }[];
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    getMaxlessionOrder(timeSlot: any[]): any;
    getAvailabilities(slot: ITimetableSlot): IAvailability | undefined;
    buildTimeTableBasic(): void;
    initTimetableSlot(): void;
    getSlotByOrder(day: string, index: number): any;
    onSelectTimeSlot(timeslot: ITimetableSlot): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimeSlotScheduleConfigComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimeSlotScheduleConfigComponent, "tada-ngx-time-slot-schedule-config", never, { "gradeCode": "gradeCode"; "timeShift": "timeShift"; "timeslots": "timeslots"; "availabilities": "availabilities"; }, { "dataChanged": "dataChanged"; }, never, never, false, never>;
}
