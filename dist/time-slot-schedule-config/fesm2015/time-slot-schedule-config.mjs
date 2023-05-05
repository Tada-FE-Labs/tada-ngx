import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as _ from 'lodash';
import * as i1 from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

class TimeSlotScheduleConfigService {
    constructor() { }
}
TimeSlotScheduleConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TimeSlotScheduleConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const getActiveYear = () => {
    let currentYear = getCurrentYear();
    const activeYear = (1 <= getCurrentMonth() && getCurrentMonth() <= 8) ? currentYear - 1 : currentYear;
    const selectedYear = localStorage.getItem('activeSchoolYear');
    if (!!selectedYear) {
        return +selectedYear;
    }
    return activeYear;
};
const getCurrentYear = () => {
    return new Date().getFullYear(); // returns the current year
};
const getCurrentMonth = () => {
    return new Date().getMonth() + 1; // returns the current year
};

class Constants {
}
Constants.SEMESTERS = {
    FIRST: 'FIRST',
    SECOND: 'SECOND',
    ALL: 'ALL'
};
Constants.WEEKDAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

class TimeSlotScheduleConfigComponent {
    constructor(translate) {
        this.translate = translate;
        this.schoolYear = getActiveYear();
        this.objectKeys = Object.keys;
        this.alltimeslot = [];
        this.classList = [];
        this.majors = [];
        this.activeClassIndex = 0;
        this.semesters = Object.keys(Constants.SEMESTERS);
        this.daysOfWeek = Constants.WEEKDAYS;
        this.semester = Constants.SEMESTERS.ALL;
        this.timeTableData = {};
        this.classListSelectedDefault = [];
        this.slotNumOfDay = [];
        this.tutorUuid = null;
        this.gradeCode = '';
        this.timeShift = '';
        this.timeslots = [];
        this.availabilities = [];
        this.dataChanged = new EventEmitter();
        translate.setDefaultLang('vi');
    }
    ngOnInit() {
        this.buildTimeTableBasic();
    }
    ngOnChanges(changes) {
        var _a, _b;
        console.log(changes);
        if ((_a = changes === null || changes === void 0 ? void 0 : changes.timeslots) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.initTimetableSlot();
        }
        if (changes && ((_b = changes === null || changes === void 0 ? void 0 : changes.availabilities) === null || _b === void 0 ? void 0 : _b.currentValue)) {
            Object.values(this.timeTableData).forEach((weekday) => {
                weekday.items = weekday.items.map((slot) => (Object.assign(Object.assign({}, slot), { details: this.getAvailabilities(slot) })));
            });
            this.dataChanged.emit(this.timeTableData);
        }
    }
    getMaxlessionOrder(timeSlot) {
        var _a;
        return ((_a = _.maxBy(timeSlot, (o) => { return o.order; })) === null || _a === void 0 ? void 0 : _a.order) || 10;
    }
    getAvailabilities(slot) {
        const foundSchedule = this.availabilities.find((item) => item.timeslotId === slot.id);
        if (foundSchedule) {
            slot.enabled = true;
        }
        return foundSchedule;
    }
    buildTimeTableBasic() {
        console.log('buildTimeTableBasic....');
        this.daysOfWeek.forEach((day) => {
            this.timeTableData[day] = {
                items: [],
            };
        });
    }
    initTimetableSlot() {
        const alltimeslot = this.timeslots;
        this.daysOfWeek.forEach((day) => {
            const slotsOfDay = alltimeslot.filter((slot) => slot.dayOfWeek === day && slot.timeShift === this.timeShift);
            this.timeTableData[day] = {
                items: _.orderBy(slotsOfDay, ["order"]),
            };
            const maxLession = this.getMaxlessionOrder(slotsOfDay);
            this.slotNumOfDay = [...Array(maxLession).keys()];
        });
        console.log("this.timeTableData:", this.timeTableData);
        console.log("this.slotNumOfDay:", this.slotNumOfDay);
    }
    getSlotByOrder(day, index) {
        return this.timeTableData[day].items.filter((item) => item.order === index);
    }
    onSelectTimeSlot(timeslot) {
        if (!timeslot.enabled)
            return;
        if (!!(timeslot === null || timeslot === void 0 ? void 0 : timeslot.id) && timeslot.details) {
            timeslot.details.available = !timeslot.details.available;
        }
        else {
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
    ngOnDestroy() { }
}
TimeSlotScheduleConfigComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigComponent, deps: [{ token: i1.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
TimeSlotScheduleConfigComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TimeSlotScheduleConfigComponent, selector: "tada-ngx-time-slot-schedule-config", inputs: { gradeCode: "gradeCode", timeShift: "timeShift", timeslots: "timeslots", availabilities: "availabilities" }, outputs: { dataChanged: "dataChanged" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"timetable-ui\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let order of slotNumOfDay; index as i\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ order + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day | translate }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let slotNum of slotNumOfDay\"\n      >\n        <div>\n          <div\n            *ngFor=\"let timeslot of getSlotByOrder(day, slotNum + 1)\"\n            [attr.timetable_slot__id]=\"timeslot.id\"\n            [attr.timetable_slot__time_shift]=\"timeslot.timeShift\"\n            [attr.timetable_slot__order]=\"timeslot.order\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [class.slot_is_disabled]=\"!timeslot.enabled\"\n            (click)=\"onSelectTimeSlot(timeslot)\"\n          >\n            <div\n              [class.active]=\"timeslot?.details?.available\"\n              class=\"selected_time_slot\"\n            ></div>\n          </div>\n\n          <div\n            class=\"timetable-ui-day-lesson-item__item slot_is_disabled\"\n            *ngIf=\"!getSlotByOrder(day, slotNum + 1)?.length\"\n          ></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tada-ngx-time-slot-schedule-config', template: "<div class=\"timetable-ui\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let order of slotNumOfDay; index as i\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ order + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day | translate }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let slotNum of slotNumOfDay\"\n      >\n        <div>\n          <div\n            *ngFor=\"let timeslot of getSlotByOrder(day, slotNum + 1)\"\n            [attr.timetable_slot__id]=\"timeslot.id\"\n            [attr.timetable_slot__time_shift]=\"timeslot.timeShift\"\n            [attr.timetable_slot__order]=\"timeslot.order\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [class.slot_is_disabled]=\"!timeslot.enabled\"\n            (click)=\"onSelectTimeSlot(timeslot)\"\n          >\n            <div\n              [class.active]=\"timeslot?.details?.available\"\n              class=\"selected_time_slot\"\n            ></div>\n          </div>\n\n          <div\n            class=\"timetable-ui-day-lesson-item__item slot_is_disabled\"\n            *ngIf=\"!getSlotByOrder(day, slotNum + 1)?.length\"\n          ></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.TranslateService }]; }, propDecorators: { gradeCode: [{
                type: Input
            }], timeShift: [{
                type: Input
            }], timeslots: [{
                type: Input
            }], availabilities: [{
                type: Input
            }], dataChanged: [{
                type: Output
            }] } });

function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class TimeSlotScheduleConfigModule {
}
TimeSlotScheduleConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeSlotScheduleConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, declarations: [TimeSlotScheduleConfigComponent], imports: [HttpClientModule,
        BrowserModule,
        CommonModule, i1.TranslateModule], exports: [TimeSlotScheduleConfigComponent] });
TimeSlotScheduleConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, imports: [HttpClientModule,
        BrowserModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TimeSlotScheduleConfigComponent
                    ],
                    imports: [
                        HttpClientModule,
                        BrowserModule,
                        CommonModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: createTranslateLoader,
                                deps: [HttpClient]
                            }
                        })
                    ],
                    exports: [
                        TimeSlotScheduleConfigComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of time-slot-schedule-config
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TimeSlotScheduleConfigComponent, TimeSlotScheduleConfigModule, TimeSlotScheduleConfigService, createTranslateLoader };
//# sourceMappingURL=time-slot-schedule-config.mjs.map
