import { DoCheck, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarType } from './typings';
import { TadaNgxCalendarHelper } from './calendar.helper';
import { TranslateService } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export declare class CalendarComponent implements OnChanges, DoCheck {
    private tadaNgxCalendarHelper;
    private translate;
    lessionNumOfDay: number[];
    startRowTitles: string[];
    month: number;
    year: number;
    updated: EventEmitter<any>;
    data: any;
    hideHeader: any;
    timeShift: any;
    lessionUnit: any;
    userType: any;
    onChangeOnOffSwitch: EventEmitter<any>;
    scheduleOpened: EventEmitter<any>;
    daynamesOfWeek: string[];
    timeTableData: any;
    objectKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    weekdays: any[];
    schedules: any;
    timeTableUIData: CalendarType;
    activeWeek: number;
    totalWeekOfYear: number;
    startDayOfWeek: any;
    constructor(tadaNgxCalendarHelper: TadaNgxCalendarHelper, translate: TranslateService);
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    buildRowTitles(): string[];
    onChangeDirection(action: string): void;
    canGoPrevious(): boolean;
    canGoNext(): boolean;
    goPrevious(): void;
    goNext(): void;
    today(): void;
    handleDatetime(fromDate: string): void;
    changeMonthYear(): void;
    generateBasicDate(): void;
    renderDayOfWeek(): void;
    onChangeSchedules(): void;
    getLessonByOrder(day: string, index: number): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CalendarComponent, "tada-ngx-calendar", never, { "startRowTitles": "startRowTitles"; "month": "month"; "year": "year"; "data": "data"; "hideHeader": "hideHeader"; "timeShift": "timeShift"; "lessionUnit": "lessionUnit"; "userType": "userType"; }, { "updated": "updated"; "onChangeOnOffSwitch": "onChangeOnOffSwitch"; "scheduleOpened": "scheduleOpened"; }, never, never, false, never>;
}
