import * as i0 from '@angular/core';
import { EventEmitter, Component, Output, Input, Pipe, ViewChild, NgModule } from '@angular/core';
import * as i2 from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import * as i1 from '@angular/router';
import moment from 'moment';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

class TadaNgxCalendarUICalendarNaviComponent {
    set viewName(value) {
        this._viewName = value;
    }
    constructor() {
        this.naviChange = new EventEmitter();
        this._viewName = 'week';
    }
    ngOnInit() { }
    onClickNavi(action) {
        this.naviChange.emit(action);
    }
    getViewType() {
        return `scheduleWorking.${this._viewName}`;
    }
}
TadaNgxCalendarUICalendarNaviComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarUICalendarNaviComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TadaNgxCalendarUICalendarNaviComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TadaNgxCalendarUICalendarNaviComponent, selector: "tada-ngx-calendar-navigation", inputs: { viewName: "viewName" }, outputs: { naviChange: "naviChange" }, ngImport: i0, template: "<div class=\"calendar-control-time-ranges\">\n  <span (click)=\"onClickNavi('move-prev')\" class=\"prev\"></span>\n  <span class=\"movetoday\">\n    <span role=\"button\" (click)=\"onClickNavi('move-today')\"\n      >{{ getViewType() | translate }}\n      {{ 'scheduleWorking.moment' | translate }}</span\n    >\n  </span>\n  <span (click)=\"onClickNavi('move-next')\" class=\"next\"></span>\n</div>\n", styles: [".calendar-control-time-ranges{margin-top:.2rem;display:flex;align-items:center}.calendar-control-time-ranges .movetoday{display:inline-block;padding:0 15px;font-weight:400;font-size:15px}.calendar-control-time-ranges .prev,.calendar-control-time-ranges .next{display:inline-block;width:9.39px;height:16px;cursor:pointer;background-repeat:no-repeat;background-position:center center;background-size:contain}.calendar-control-time-ranges .prev{background-image:url(/assets/images/icons/prev-calendar.svg)}.calendar-control-time-ranges .next{background-image:url(/assets/images/icons/next-calendar.svg)}\n"], dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarUICalendarNaviComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tada-ngx-calendar-navigation', template: "<div class=\"calendar-control-time-ranges\">\n  <span (click)=\"onClickNavi('move-prev')\" class=\"prev\"></span>\n  <span class=\"movetoday\">\n    <span role=\"button\" (click)=\"onClickNavi('move-today')\"\n      >{{ getViewType() | translate }}\n      {{ 'scheduleWorking.moment' | translate }}</span\n    >\n  </span>\n  <span (click)=\"onClickNavi('move-next')\" class=\"next\"></span>\n</div>\n", styles: [".calendar-control-time-ranges{margin-top:.2rem;display:flex;align-items:center}.calendar-control-time-ranges .movetoday{display:inline-block;padding:0 15px;font-weight:400;font-size:15px}.calendar-control-time-ranges .prev,.calendar-control-time-ranges .next{display:inline-block;width:9.39px;height:16px;cursor:pointer;background-repeat:no-repeat;background-position:center center;background-size:contain}.calendar-control-time-ranges .prev{background-image:url(/assets/images/icons/prev-calendar.svg)}.calendar-control-time-ranges .next{background-image:url(/assets/images/icons/next-calendar.svg)}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { naviChange: [{
                type: Output
            }], viewName: [{
                type: Input,
                args: ['viewName']
            }] } });

const dateFormat = 'YYYY-MM-DD';
const weekDayLabels = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];
var TIMETABLE_CHANGE_DIRECTIONS;
(function (TIMETABLE_CHANGE_DIRECTIONS) {
    TIMETABLE_CHANGE_DIRECTIONS["MOVE_PREV"] = "move-prev";
    TIMETABLE_CHANGE_DIRECTIONS["MOVE_NEXT"] = "move-next";
    TIMETABLE_CHANGE_DIRECTIONS["MOVE_TODAY"] = "move-today";
})(TIMETABLE_CHANGE_DIRECTIONS || (TIMETABLE_CHANGE_DIRECTIONS = {}));
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "STUDENT";
    UserType["TUTOR"] = "TUTOR";
})(UserType || (UserType = {}));

class TadaNgxCalendarHelper {
    constructor() {
        this.dateFormat = 'YYYY-MM-DD';
        this.getCurrentYear = () => {
            return new Date().getFullYear(); // returns the current year
        };
        this.getCurrentMonth = () => {
            return new Date().getMonth() + 1; // returns the current year
        };
        this.getActiveYear = () => {
            let currentYear = this.getCurrentYear();
            const activeYear = (1 <= this.getCurrentMonth() && this.getCurrentMonth() <= 8) ? currentYear - 1 : currentYear;
            const selectedYear = localStorage.getItem('activeSchoolYear');
            if (!!selectedYear) {
                return +selectedYear;
            }
            return activeYear;
        };
    }
    getThisWeekDates(fromDate) {
        const weekDates = [];
        for (let i = 1; i <= 7; i++) {
            weekDates.push(moment(fromDate, this.dateFormat).day(i).format(this.dateFormat));
        }
        return weekDates;
    }
    truncateWords(sentence, amount, tail = "...") {
        if (amount >= sentence.length) {
            return sentence;
        }
        const truncated = sentence.slice(0, amount);
        return `${truncated}${tail}`;
    }
    getWeekDaysByDay(fromDate) {
        const thisWeekDates = this.getThisWeekDates(fromDate);
        return thisWeekDates;
    }
    currentWeekNumber() {
        return +moment().format('W');
    }
    subtract(date) {
        return moment(date, this.dateFormat).subtract(7, 'days').isoWeekday(1).format(dateFormat);
    }
    add(date) {
        return moment(date, this.dateFormat).add(7, 'days').isoWeekday(1).format(dateFormat);
    }
    getWeekNumberByDate(date) {
        return +moment(date, this.dateFormat).format('W');
    }
    formatDate(date, format) {
        return moment(date, this.dateFormat).format(format);
    }
    getFirstMondayOfMonth(month, year) {
        let date = moment().set('year', year).set('month', month).set('date', 1).isoWeekday(8);
        if (date.date() > 7) {
            date = date.isoWeekday(-6);
        }
        return date.format(dateFormat);
    }
    dayStartOfWeek(weekNumber, year) {
        return moment(year, 'YYYY').add(weekNumber, 'weeks').isoWeekday(1).format(dateFormat);
    }
    isoWeeksInYear(year) {
        return moment(year, 'YYYY').isoWeeksInYear();
    }
    getTimeRange(date, format = 'YYYY-MM-DD') {
        const timezone = moment().format('Z');
        // start of day
        const startOfDay = `${moment(date, format).format(this.dateFormat)}T00:00:00${timezone}`;
        const endOfDay = `${moment(date, format).format(this.dateFormat)}T23:59:59${timezone}`;
        const range = {
            timeZone: timezone,
            curentTime: {
                guess: moment(date, format).format(),
                utc: moment(date, format).utc().format(),
            },
            timeStampUtc: {
                startOfDay: moment.utc(startOfDay).format('x'),
                endOfDay: moment.utc(endOfDay).format('x'),
                dateFormat: moment.utc(startOfDay).format(this.dateFormat),
            },
        };
        return range;
    }
    inDay(day1, day2) {
        const equal = day2 === moment(day1, 'x').format(this.dateFormat);
        return equal;
    }
}

class TruncatePipe {
    transform(value, args) {
        const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        const trail = args.length > 1 ? args[1] : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
TruncatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TruncatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, name: "truncate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'truncate',
                }]
        }] });

class TadaNgxCalendarCellComponent {
    constructor(router, tadaNgxCalendarHelper) {
        this.router = router;
        this.tadaNgxCalendarHelper = tadaNgxCalendarHelper;
        this.userTypeEnum = UserType;
        this.assignments = [];
        this.onChangeOnOffSwitch = new EventEmitter();
        this.scheduleOpened = new EventEmitter();
    }
    ngOnInit() { }
    ngOnChanges(changes) { }
    onTitleClick() {
        this.assignments = [];
        this.scheduleOpened.emit(this.schedule);
    }
    createAssignment() {
        window.open(`/tutor/create-assignment?scheduleId=${this.schedule.details.id}&classId=${this.schedule.details.classId}`, '_blank');
    }
    getShortDesc(data) {
        return this.tadaNgxCalendarHelper.truncateWords(data, 15);
    }
    getShortTitle(data) {
        return this.tadaNgxCalendarHelper.truncateWords(data, 10);
    }
    onClickToJoinClassOnline() {
        if (!!this.schedule?.details?.online && !!this.schedule?.details?.joinUrl) {
            window.open(this.schedule?.details?.joinUrl, '_blank');
        }
    }
    async changeOnOffSwitch($event) {
        this.onChangeOnOffSwitch.emit($event);
    }
    onClickAssignment(item) {
        window.open(`/assignment-detail/${item.id}`, '_blank');
    }
}
TadaNgxCalendarCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarCellComponent, deps: [{ token: i1.Router }, { token: TadaNgxCalendarHelper }], target: i0.ɵɵFactoryTarget.Component });
TadaNgxCalendarCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TadaNgxCalendarCellComponent, selector: "timetable-cell", inputs: { schedule: "schedule", lessionUnit: "lessionUnit", assignments: "assignments", userType: "userType", isBOSide: "isBOSide" }, outputs: { onChangeOnOffSwitch: "onChangeOnOffSwitch", scheduleOpened: "scheduleOpened" }, viewQueries: [{ propertyName: "switchOffline", first: true, predicate: ["switchOffline"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"schedule-item-title\"\n  [ngbPopover]=\"popContent\"\n  [autoClose]=\"'outside'\"\n  triggers=\"manual\"\n  #p=\"ngbPopover\"\n  (click)=\"p.open()\"\n  (click)=\"onTitleClick()\"\n  placement=\"bottom-left\"\n>\n  <span *ngIf=\"!!schedule?.details?.online\">\n    <svg width=\"13\" height=\"10\" viewBox=\"0 0 13 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M11.8625 1.75625L9.5 3.0875V1.25C9.5 1.05109 9.42098 0.860322 9.28033 0.71967C9.13968 0.579018 8.94891 0.5 8.75 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V8C0.5 8.39782 0.658035 8.77936 0.93934 9.06066C1.22064 9.34196 1.60218 9.5 2 9.5H8.75C8.94891 9.5 9.13968 9.42098 9.28033 9.28033C9.42098 9.13968 9.5 8.94891 9.5 8.75V6.905L11.8625 8.23625C11.9231 8.27585 11.9931 8.29881 12.0654 8.3028C12.1377 8.3068 12.2097 8.29169 12.2743 8.25901C12.3389 8.22633 12.3938 8.17722 12.4334 8.11661C12.473 8.05601 12.496 7.98604 12.5 7.91375V2.075C12.4954 2.00303 12.472 1.93353 12.4321 1.87343C12.3922 1.81333 12.3373 1.76473 12.2728 1.73248C12.2083 1.70023 12.1365 1.68545 12.0645 1.68962C11.9925 1.69379 11.9228 1.71677 11.8625 1.75625Z\" fill=\"#0E77D2\"/>\n      </svg>\n  </span>\n  <span  class=\"schedule-title\">\n    {{ schedule?.title + (schedule?.details?.unitOrder ? \": \" + (\"streamingLession\" | translate: {unitNo: schedule?.details?.unitOrder }) : \"\") | truncate: [50] }}\n  </span>\n</div>\n\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\">\n    <div class=\"d-block\" *ngIf=\"userType === userTypeEnum.TUTOR\">\n      <div class=\"mb-1\">\n\n        <div class=\"schedule-pop-content-header\" *ngIf=\"lessionUnit?.order && lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: lessionUnit.order || \"\", unitName: lessionUnit.name}  }}</span>\n        </div>\n        <div class=\"schedule-pop-content-header\" *ngIf=\"!lessionUnit?.order || !lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: schedule?.details?.unitOrder || \"\", unitName: schedule?.details?.majorName} }}</span>\n        </div>\n\n        <div class=\"schedule-pop-content-line\"></div>\n        <div class=\"d-flex mb-0 justify-content-between align-items-center\">\n          <span\n            class=\"class-online-label\"\n            [class.is-on]=\"\n              !!schedule?.details?.online || !!switchOffline.checked\n            \"\n            (click)=\"onClickToJoinClassOnline()\"\n          >\n            {{ 'joinClassOnlineNow' | translate }}\n          </span>\n          <span class=\"ml-2\" [hidden]=\"isBOSide\">\n            <span class=\"custom-control custom-switch\">\n              <input\n                #switchOffline\n                ngModel\n                [checked]=\"!!schedule?.details?.online ? true : null\"\n                type=\"checkbox\"\n                class=\"custom-control-input\"\n                id=\"switchOffline\"\n                (change)=\"changeOnOffSwitch($event)\"\n              />\n              <label class=\"custom-control-label\" for=\"switchOffline\"></label>\n            </span>\n          </span>\n        </div>\n      </div>\n\n      <div class=\"schedule-pop-content-links\" *ngIf=\"!isBOSide\">\n        <span (click)=\"createAssignment()\">T\u1EA1o b\u00E0i t\u1EADp</span>\n        <span>S\u1ED5 \u0111\u1EA7u b\u00E0i</span>\n      </div>\n    </div>\n\n    <div\n      class=\"d-flex mb-0 justify-content-between align-items-center\"\n      *ngIf=\"userType === userTypeEnum.STUDENT && !isBOSide\"\n    >\n      <span\n        class=\"class-online-label\"\n        [class.is-on]=\"!!schedule?.details?.online\"\n        (click)=\"onClickToJoinClassOnline()\"\n      >\n        {{ 'studentJoinClassOnlineNow' | translate }}\n      </span>\n    </div>\n\n\n    <ul class=\"list-assignments\" *ngIf=\"assignments?.length && !isBOSide\" >\n        <li *ngFor=\"let item of assignments\" (click)=\"onClickAssignment(item)\">\n            <h4>{{item.title}}</h4>\n        </li>\n    </ul>\n\n  </div>\n</ng-template>\n", styles: [".schedule-item-title{background:#e3f2ff;border-radius:4px;padding:9px 20px;font-weight:600;font-size:12px;line-height:22px;cursor:pointer;color:#4e4852;display:flex;width:100%;gap:5px;border:1px solid transparent}.schedule-item-title mat-icon{width:14px}.schedule-item-title span{display:block;white-space:nowrap}.schedule-item-title:hover{border:1px solid #1e88e5;background:#e3f2ff}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #EAEAEA;margin-bottom:5px;padding-bottom:3px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:12px;line-height:14px;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px}.list-assignments{padding:0;margin:0;margin-top:1.5rem}.list-assignments li{padding:10px 8px;border:1px solid #b4b7c6;list-style:none;margin-bottom:10px;cursor:pointer}.list-assignments li:hover{border:1px solid #000000}.list-assignments li:hover h4{color:#000}.list-assignments li h4{font-weight:700;font-size:12px;line-height:16px;color:#26292c;margin:0;padding-bottom:0;border:none}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgbPopover, selector: "[ngbPopover]", inputs: ["animation", "autoClose", "ngbPopover", "popoverTitle", "placement", "popperOptions", "triggers", "positionTarget", "container", "disablePopover", "popoverClass", "openDelay", "closeDelay"], outputs: ["shown", "hidden"], exportAs: ["ngbPopover"] }, { kind: "pipe", type: i2.TranslatePipe, name: "translate" }, { kind: "pipe", type: TruncatePipe, name: "truncate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'timetable-cell', template: "<div\n  class=\"schedule-item-title\"\n  [ngbPopover]=\"popContent\"\n  [autoClose]=\"'outside'\"\n  triggers=\"manual\"\n  #p=\"ngbPopover\"\n  (click)=\"p.open()\"\n  (click)=\"onTitleClick()\"\n  placement=\"bottom-left\"\n>\n  <span *ngIf=\"!!schedule?.details?.online\">\n    <svg width=\"13\" height=\"10\" viewBox=\"0 0 13 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M11.8625 1.75625L9.5 3.0875V1.25C9.5 1.05109 9.42098 0.860322 9.28033 0.71967C9.13968 0.579018 8.94891 0.5 8.75 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V8C0.5 8.39782 0.658035 8.77936 0.93934 9.06066C1.22064 9.34196 1.60218 9.5 2 9.5H8.75C8.94891 9.5 9.13968 9.42098 9.28033 9.28033C9.42098 9.13968 9.5 8.94891 9.5 8.75V6.905L11.8625 8.23625C11.9231 8.27585 11.9931 8.29881 12.0654 8.3028C12.1377 8.3068 12.2097 8.29169 12.2743 8.25901C12.3389 8.22633 12.3938 8.17722 12.4334 8.11661C12.473 8.05601 12.496 7.98604 12.5 7.91375V2.075C12.4954 2.00303 12.472 1.93353 12.4321 1.87343C12.3922 1.81333 12.3373 1.76473 12.2728 1.73248C12.2083 1.70023 12.1365 1.68545 12.0645 1.68962C11.9925 1.69379 11.9228 1.71677 11.8625 1.75625Z\" fill=\"#0E77D2\"/>\n      </svg>\n  </span>\n  <span  class=\"schedule-title\">\n    {{ schedule?.title + (schedule?.details?.unitOrder ? \": \" + (\"streamingLession\" | translate: {unitNo: schedule?.details?.unitOrder }) : \"\") | truncate: [50] }}\n  </span>\n</div>\n\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\">\n    <div class=\"d-block\" *ngIf=\"userType === userTypeEnum.TUTOR\">\n      <div class=\"mb-1\">\n\n        <div class=\"schedule-pop-content-header\" *ngIf=\"lessionUnit?.order && lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: lessionUnit.order || \"\", unitName: lessionUnit.name}  }}</span>\n        </div>\n        <div class=\"schedule-pop-content-header\" *ngIf=\"!lessionUnit?.order || !lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: schedule?.details?.unitOrder || \"\", unitName: schedule?.details?.majorName} }}</span>\n        </div>\n\n        <div class=\"schedule-pop-content-line\"></div>\n        <div class=\"d-flex mb-0 justify-content-between align-items-center\">\n          <span\n            class=\"class-online-label\"\n            [class.is-on]=\"\n              !!schedule?.details?.online || !!switchOffline.checked\n            \"\n            (click)=\"onClickToJoinClassOnline()\"\n          >\n            {{ 'joinClassOnlineNow' | translate }}\n          </span>\n          <span class=\"ml-2\" [hidden]=\"isBOSide\">\n            <span class=\"custom-control custom-switch\">\n              <input\n                #switchOffline\n                ngModel\n                [checked]=\"!!schedule?.details?.online ? true : null\"\n                type=\"checkbox\"\n                class=\"custom-control-input\"\n                id=\"switchOffline\"\n                (change)=\"changeOnOffSwitch($event)\"\n              />\n              <label class=\"custom-control-label\" for=\"switchOffline\"></label>\n            </span>\n          </span>\n        </div>\n      </div>\n\n      <div class=\"schedule-pop-content-links\" *ngIf=\"!isBOSide\">\n        <span (click)=\"createAssignment()\">T\u1EA1o b\u00E0i t\u1EADp</span>\n        <span>S\u1ED5 \u0111\u1EA7u b\u00E0i</span>\n      </div>\n    </div>\n\n    <div\n      class=\"d-flex mb-0 justify-content-between align-items-center\"\n      *ngIf=\"userType === userTypeEnum.STUDENT && !isBOSide\"\n    >\n      <span\n        class=\"class-online-label\"\n        [class.is-on]=\"!!schedule?.details?.online\"\n        (click)=\"onClickToJoinClassOnline()\"\n      >\n        {{ 'studentJoinClassOnlineNow' | translate }}\n      </span>\n    </div>\n\n\n    <ul class=\"list-assignments\" *ngIf=\"assignments?.length && !isBOSide\" >\n        <li *ngFor=\"let item of assignments\" (click)=\"onClickAssignment(item)\">\n            <h4>{{item.title}}</h4>\n        </li>\n    </ul>\n\n  </div>\n</ng-template>\n", styles: [".schedule-item-title{background:#e3f2ff;border-radius:4px;padding:9px 20px;font-weight:600;font-size:12px;line-height:22px;cursor:pointer;color:#4e4852;display:flex;width:100%;gap:5px;border:1px solid transparent}.schedule-item-title mat-icon{width:14px}.schedule-item-title span{display:block;white-space:nowrap}.schedule-item-title:hover{border:1px solid #1e88e5;background:#e3f2ff}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #EAEAEA;margin-bottom:5px;padding-bottom:3px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:12px;line-height:14px;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px}.list-assignments{padding:0;margin:0;margin-top:1.5rem}.list-assignments li{padding:10px 8px;border:1px solid #b4b7c6;list-style:none;margin-bottom:10px;cursor:pointer}.list-assignments li:hover{border:1px solid #000000}.list-assignments li:hover h4{color:#000}.list-assignments li h4{font-weight:700;font-size:12px;line-height:16px;color:#26292c;margin:0;padding-bottom:0;border:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: TadaNgxCalendarHelper }]; }, propDecorators: { schedule: [{
                type: Input
            }], switchOffline: [{
                type: ViewChild,
                args: ['switchOffline']
            }], lessionUnit: [{
                type: Input
            }], assignments: [{
                type: Input
            }], userType: [{
                type: Input
            }], isBOSide: [{
                type: Input
            }], onChangeOnOffSwitch: [{
                type: Output
            }], scheduleOpened: [{
                type: Output
            }] } });

class CalendarComponent {
    constructor(tadaNgxCalendarHelper, translate) {
        this.tadaNgxCalendarHelper = tadaNgxCalendarHelper;
        this.translate = translate;
        this.lessionNumOfDay = [...Array(5).keys()];
        this.startRowTitles = this.buildRowTitles();
        this.month = this.tadaNgxCalendarHelper.getCurrentMonth();
        this.year = this.tadaNgxCalendarHelper.getActiveYear();
        this.updated = new EventEmitter();
        this.data = null;
        this.timeShifts = [];
        this.onChangeOnOffSwitch = new EventEmitter();
        this.scheduleOpened = new EventEmitter();
        this.daynamesOfWeek = [...weekDayLabels];
        this.timeTableData = {};
        this.objectKeys = Object.keys;
        this.weekdays = [];
        this.schedules = {};
        this.timeTableUIData = {};
        this.activeWeek = 0;
        this.totalWeekOfYear = 0;
        this.startDayOfWeek = null;
        this.assignments = [];
        this.translate.setDefaultLang('vn');
        this.buildRowTitles();
    }
    ngDoCheck() { }
    ngOnChanges(changes) {
        if (changes['data']?.currentValue && changes['data']?.currentValue.length) {
            this.onChangeSchedules();
        }
        if (changes['month']?.firstChange &&
            changes['month'].currentValue &&
            changes['year']?.firstChange &&
            changes['year'].currentValue) {
            this.activeWeek = this.tadaNgxCalendarHelper.currentWeekNumber();
            this.totalWeekOfYear = this.tadaNgxCalendarHelper.isoWeeksInYear(this.year);
            this.onChangeDirection(TIMETABLE_CHANGE_DIRECTIONS.MOVE_TODAY);
        }
        else if (changes['month']?.currentValue || changes['year']?.currentValue) {
            this.changeMonthYear();
        }
    }
    buildRowTitles() {
        return this.lessionNumOfDay.map((_, index) => `Tiết ${index + 1}`);
    }
    onChangeDirection(action) {
        switch (action) {
            case TIMETABLE_CHANGE_DIRECTIONS.MOVE_PREV:
                this.goPrevious();
                break;
            case TIMETABLE_CHANGE_DIRECTIONS.MOVE_NEXT:
                this.goNext();
                break;
            case TIMETABLE_CHANGE_DIRECTIONS.MOVE_TODAY:
                this.today();
                break;
            default:
                return;
        }
        this.handleDatetime(this.startDayOfWeek);
    }
    canGoPrevious() {
        return this.activeWeek < this.totalWeekOfYear;
    }
    canGoNext() {
        return this.activeWeek < this.totalWeekOfYear;
    }
    goPrevious() {
        this.startDayOfWeek = this.tadaNgxCalendarHelper.subtract(this.startDayOfWeek);
    }
    goNext() {
        this.startDayOfWeek = this.tadaNgxCalendarHelper.add(this.startDayOfWeek);
    }
    today() {
        const currentWeek = this.tadaNgxCalendarHelper.currentWeekNumber();
        this.startDayOfWeek = this.tadaNgxCalendarHelper.dayStartOfWeek(currentWeek, this.tadaNgxCalendarHelper.getCurrentYear());
    }
    handleDatetime(fromDate) {
        this.weekdays = this.tadaNgxCalendarHelper.getWeekDaysByDay(fromDate);
        this.activeWeek = this.tadaNgxCalendarHelper.getWeekNumberByDate(this.weekdays[0]);
        const [year, month] = fromDate.split('-');
        this.month = +month;
        this.year = +year;
        this.startDayOfWeek = this.tadaNgxCalendarHelper.dayStartOfWeek(this.activeWeek, this.year);
        this.timeTableUIData = {
            startDate: this.tadaNgxCalendarHelper.getTimeRange(this.weekdays[0])
                .timeStampUtc.startOfDay,
            endDate: this.tadaNgxCalendarHelper.getTimeRange(this.weekdays[this.weekdays.length - 1]).timeStampUtc.endOfDay,
            weekNumber: this.activeWeek,
        };
        this.updated.emit(this.timeTableUIData);
        this.renderDayOfWeek();
    }
    changeMonthYear() {
        const newDate = `${this.year}-${this.month}-01`;
        this.handleDatetime(newDate);
    }
    generateBasicDate() {
        this.daynamesOfWeek.forEach((day) => {
            this.timeTableData[day] = {
                items: [],
            };
        });
    }
    renderDayOfWeek() {
        this.schedules = this.weekdays.reduce((prev, current) => ({ ...prev, [current]: current }), {});
    }
    onChangeSchedules() {
        this.weekdays.forEach((day) => {
            const slotsOfDay = this.data.filter((slot) => this.tadaNgxCalendarHelper.inDay(slot.startTime, day));
            this.timeTableData[day] = {
                items: _.orderBy(slotsOfDay, ['order']),
            };
        });
    }
    getLessonByOrder(day, index, timeShift) {
        const found = this.timeTableData[day]?.items.find((item) => item.order === index && item.timeShift == timeShift);
        return found;
    }
}
CalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarComponent, deps: [{ token: TadaNgxCalendarHelper }, { token: i2.TranslateService }], target: i0.ɵɵFactoryTarget.Component });
CalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CalendarComponent, selector: "tada-ngx-calendar", inputs: { startRowTitles: "startRowTitles", month: "month", year: "year", data: "data", timeShifts: "timeShifts", lessionUnit: "lessionUnit", userType: "userType", isBOSide: "isBOSide", assignments: "assignments" }, outputs: { updated: "updated", onChangeOnOffSwitch: "onChangeOnOffSwitch", scheduleOpened: "scheduleOpened" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"header-timetable-working v0.03\">\n    <div class=\"d-flex justify-content-between\">\n        <div class=\"timetableui-active-weeknum\">\n          Tu\u1EA7n {{ timeTableUIData?.weekNumber }} th\u00E1ng {{month}} n\u0103m {{ startDayOfWeek | date: 'yyyy' }}\n        </div>\n        <div>\n          <tada-ngx-calendar-navigation\n            (naviChange)=\"onChangeDirection($event)\"\n          ></tada-ngx-calendar-navigation>\n        </div>\n    </div>\n  </div>\n  \n  <div *ngFor=\"let timeShift of timeShifts; index as timeShiftIndex\">\n\n  <h4 class=\"timeshift_title\">{{ timeShift | translate }}</h4>\n  \n  <div class=\"tada-ngx-calendar mb-3\">\n    <div class=\"tada-ngx-calendar-wrap-scroll\">\n      <div id=\"tada-ngx-calendar-calendar\">\n        <div class=\"tada-ngx-calendar-prefix-column tada-ngx-calendar-day-column\">\n          <div class=\"tada-ngx-calendar-day-column-lession\">\n            <div class=\"tada-ngx-calendar-day-name\" *ngIf=\"timeShiftIndex == 0\">\n              <div>\n                <span></span>\n              </div>\n            </div>\n            <div\n              class=\"tada-ngx-calendar-day-lession-item pre-label-column-value\"\n              *ngFor=\"let title of startRowTitles\"\n            >\n              <div>\n                <span>{{ title }}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div\n          *ngFor=\"let day of objectKeys(schedules); index as i\"\n          class=\"tada-ngx-calendar-day-column\"\n        >\n          <div class=\"tada-ngx-calendar-day-column-lession\">\n            <div class=\"tada-ngx-calendar-day-name\" *ngIf=\"timeShiftIndex == 0\">\n              <p>{{ daynamesOfWeek[i] | translate }}</p>\n              <h4>{{ day | date: 'd' }}</h4>\n            </div>\n            <div\n              class=\"tada-ngx-calendar-day-lession-item\"\n              *ngFor=\"let lessonNum of lessionNumOfDay\"\n            >\n              <div class=\"timetable-cell-block\">\n                <div\n                  *ngIf=\"getLessonByOrder(day, lessonNum+1, timeShift) as lession\"\n                  class=\"tada-ngx-calendar-day-schedule-item__item\"\n                >\n                  <timetable-cell\n                  [userType]=\"userType\"\n                  [isBOSide]=\"isBOSide\"\n                  [lessionUnit]=\"lessionUnit\"\n                  [assignments]=\"assignments\"\n                  (scheduleOpened)=\"scheduleOpened.emit($event)\"\n                  (onChangeOnOffSwitch)=\"onChangeOnOffSwitch.emit($event)\"\n                  [schedule]=\"lession\"></timetable-cell>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  </div>", styles: [".tada-ngx-calendar-prefix-column{width:100px!important}.tada-ngx-calendar-prefix-column span{display:block;width:100px!important}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-name{height:91px}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-lession-item span{font-weight:600;font-size:12px;line-height:12px;text-align:center;color:#b4b7c6}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-lession-item:first-child:not(.pre-label-column-value)>div{border-top:none;height:87px}.tada-ngx-calendar-wrap-scroll{overflow:auto;display:flex}#tada-ngx-calendar-calendar{display:flex;flex-direction:row;flex:1;justify-content:space-between;border:1px solid #e2e8f0}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name{text-align:center;padding:16px 8px;width:100%;border:1px solid #e2e8f0}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name p{font-weight:600;font-size:12px;line-height:12px;color:#b4b7c6}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name h4{font-style:normal;font-weight:600;font-size:24px;line-height:29px;margin:0;color:#000}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column{width:100%}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession{display:flex;flex-direction:column}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div{padding:5px 10px;font-weight:600;font-size:14px;display:block;line-height:20px;width:100%;text-align:center;color:#000;border:1px solid #e2e8f0;align-items:center;justify-content:center;display:flex;height:60px;flex-direction:column;gap:5px}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div div.tada-ngx-calendar-day-lession-item__item h4{width:100%;overflow:hidden;text-overflow:ellipsis;margin:0;font-size:.85rem}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div div.tada-ngx-calendar-day-lession-item__item .timetable_tutor_name{font-weight:400;font-size:14px;line-height:20px;text-align:center;font-style:normal;color:#737579}.timetable-cell-block{min-width:160px}.tada-ngx-calendar-day-schedule-item__item{display:block;width:100%}.tada-ngx-calendar-direction-controls{display:flex;flex-direction:row;font-weight:700;font-size:16px;line-height:18px;text-align:center;color:#000;gap:35px;align-items:center;margin-bottom:10px}.tada-ngx-calendar-direction-controls .tada-ngx-calendar-direction-control{cursor:pointer}.tada-ngx-calendar-direction-controls .tada-ngx-calendar-direction-control:not(.can_navigate_to){cursor:not-allowed;opacity:.57}.tada-ngx-calendar-direction-controls .active_class_name{font-weight:700;font-size:16px;white-space:nowrap;max-width:300px;overflow:hidden;text-overflow:ellipsis;line-height:18px;text-align:center;color:#000}timetable-cell{display:block;width:100%}h4.timeshift_title{font-style:normal;font-weight:400;font-size:14px;line-height:18px;color:#000;margin-bottom:5px}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: TadaNgxCalendarCellComponent, selector: "timetable-cell", inputs: ["schedule", "lessionUnit", "assignments", "userType", "isBOSide"], outputs: ["onChangeOnOffSwitch", "scheduleOpened"] }, { kind: "component", type: TadaNgxCalendarUICalendarNaviComponent, selector: "tada-ngx-calendar-navigation", inputs: ["viewName"], outputs: ["naviChange"] }, { kind: "pipe", type: i3.DatePipe, name: "date" }, { kind: "pipe", type: i2.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tada-ngx-calendar', template: "<div class=\"header-timetable-working v0.03\">\n    <div class=\"d-flex justify-content-between\">\n        <div class=\"timetableui-active-weeknum\">\n          Tu\u1EA7n {{ timeTableUIData?.weekNumber }} th\u00E1ng {{month}} n\u0103m {{ startDayOfWeek | date: 'yyyy' }}\n        </div>\n        <div>\n          <tada-ngx-calendar-navigation\n            (naviChange)=\"onChangeDirection($event)\"\n          ></tada-ngx-calendar-navigation>\n        </div>\n    </div>\n  </div>\n  \n  <div *ngFor=\"let timeShift of timeShifts; index as timeShiftIndex\">\n\n  <h4 class=\"timeshift_title\">{{ timeShift | translate }}</h4>\n  \n  <div class=\"tada-ngx-calendar mb-3\">\n    <div class=\"tada-ngx-calendar-wrap-scroll\">\n      <div id=\"tada-ngx-calendar-calendar\">\n        <div class=\"tada-ngx-calendar-prefix-column tada-ngx-calendar-day-column\">\n          <div class=\"tada-ngx-calendar-day-column-lession\">\n            <div class=\"tada-ngx-calendar-day-name\" *ngIf=\"timeShiftIndex == 0\">\n              <div>\n                <span></span>\n              </div>\n            </div>\n            <div\n              class=\"tada-ngx-calendar-day-lession-item pre-label-column-value\"\n              *ngFor=\"let title of startRowTitles\"\n            >\n              <div>\n                <span>{{ title }}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div\n          *ngFor=\"let day of objectKeys(schedules); index as i\"\n          class=\"tada-ngx-calendar-day-column\"\n        >\n          <div class=\"tada-ngx-calendar-day-column-lession\">\n            <div class=\"tada-ngx-calendar-day-name\" *ngIf=\"timeShiftIndex == 0\">\n              <p>{{ daynamesOfWeek[i] | translate }}</p>\n              <h4>{{ day | date: 'd' }}</h4>\n            </div>\n            <div\n              class=\"tada-ngx-calendar-day-lession-item\"\n              *ngFor=\"let lessonNum of lessionNumOfDay\"\n            >\n              <div class=\"timetable-cell-block\">\n                <div\n                  *ngIf=\"getLessonByOrder(day, lessonNum+1, timeShift) as lession\"\n                  class=\"tada-ngx-calendar-day-schedule-item__item\"\n                >\n                  <timetable-cell\n                  [userType]=\"userType\"\n                  [isBOSide]=\"isBOSide\"\n                  [lessionUnit]=\"lessionUnit\"\n                  [assignments]=\"assignments\"\n                  (scheduleOpened)=\"scheduleOpened.emit($event)\"\n                  (onChangeOnOffSwitch)=\"onChangeOnOffSwitch.emit($event)\"\n                  [schedule]=\"lession\"></timetable-cell>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  \n  </div>", styles: [".tada-ngx-calendar-prefix-column{width:100px!important}.tada-ngx-calendar-prefix-column span{display:block;width:100px!important}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-name{height:91px}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-lession-item span{font-weight:600;font-size:12px;line-height:12px;text-align:center;color:#b4b7c6}.tada-ngx-calendar-prefix-column .tada-ngx-calendar-day-lession-item:first-child:not(.pre-label-column-value)>div{border-top:none;height:87px}.tada-ngx-calendar-wrap-scroll{overflow:auto;display:flex}#tada-ngx-calendar-calendar{display:flex;flex-direction:row;flex:1;justify-content:space-between;border:1px solid #e2e8f0}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name{text-align:center;padding:16px 8px;width:100%;border:1px solid #e2e8f0}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name p{font-weight:600;font-size:12px;line-height:12px;color:#b4b7c6}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-name h4{font-style:normal;font-weight:600;font-size:24px;line-height:29px;margin:0;color:#000}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column{width:100%}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession{display:flex;flex-direction:column}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div{padding:5px 10px;font-weight:600;font-size:14px;display:block;line-height:20px;width:100%;text-align:center;color:#000;border:1px solid #e2e8f0;align-items:center;justify-content:center;display:flex;height:60px;flex-direction:column;gap:5px}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div div.tada-ngx-calendar-day-lession-item__item h4{width:100%;overflow:hidden;text-overflow:ellipsis;margin:0;font-size:.85rem}#tada-ngx-calendar-calendar .tada-ngx-calendar-day-column-lession>.tada-ngx-calendar-day-lession-item>div div.tada-ngx-calendar-day-lession-item__item .timetable_tutor_name{font-weight:400;font-size:14px;line-height:20px;text-align:center;font-style:normal;color:#737579}.timetable-cell-block{min-width:160px}.tada-ngx-calendar-day-schedule-item__item{display:block;width:100%}.tada-ngx-calendar-direction-controls{display:flex;flex-direction:row;font-weight:700;font-size:16px;line-height:18px;text-align:center;color:#000;gap:35px;align-items:center;margin-bottom:10px}.tada-ngx-calendar-direction-controls .tada-ngx-calendar-direction-control{cursor:pointer}.tada-ngx-calendar-direction-controls .tada-ngx-calendar-direction-control:not(.can_navigate_to){cursor:not-allowed;opacity:.57}.tada-ngx-calendar-direction-controls .active_class_name{font-weight:700;font-size:16px;white-space:nowrap;max-width:300px;overflow:hidden;text-overflow:ellipsis;line-height:18px;text-align:center;color:#000}timetable-cell{display:block;width:100%}h4.timeshift_title{font-style:normal;font-weight:400;font-size:14px;line-height:18px;color:#000;margin-bottom:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: TadaNgxCalendarHelper }, { type: i2.TranslateService }]; }, propDecorators: { startRowTitles: [{
                type: Input
            }], month: [{
                type: Input
            }], year: [{
                type: Input
            }], updated: [{
                type: Output
            }], data: [{
                type: Input
            }], timeShifts: [{
                type: Input
            }], lessionUnit: [{
                type: Input
            }], userType: [{
                type: Input
            }], onChangeOnOffSwitch: [{
                type: Output
            }], scheduleOpened: [{
                type: Output
            }], isBOSide: [{
                type: Input
            }], assignments: [{
                type: Input
            }] } });

function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class CalendarModule {
}
CalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, declarations: [CalendarComponent,
        TadaNgxCalendarCellComponent,
        TadaNgxCalendarUICalendarNaviComponent,
        TruncatePipe], imports: [HttpClientModule,
        CommonModule,
        NgbPopoverModule, i2.TranslateModule], exports: [CalendarComponent,
        TadaNgxCalendarCellComponent,
        TadaNgxCalendarUICalendarNaviComponent] });
CalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, providers: [TadaNgxCalendarHelper], imports: [HttpClientModule,
        CommonModule,
        NgbPopoverModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CalendarComponent,
                        TadaNgxCalendarCellComponent,
                        TadaNgxCalendarUICalendarNaviComponent,
                        TruncatePipe
                    ],
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        NgbPopoverModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: createTranslateLoader,
                                deps: [HttpClient]
                            }
                        })
                    ],
                    exports: [
                        CalendarComponent,
                        TadaNgxCalendarCellComponent,
                        TadaNgxCalendarUICalendarNaviComponent
                    ],
                    providers: [TadaNgxCalendarHelper]
                }]
        }] });

/*
 * Public API Surface of calendar
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CalendarComponent, CalendarModule, TadaNgxCalendarCellComponent, TadaNgxCalendarUICalendarNaviComponent, createTranslateLoader };
//# sourceMappingURL=calendar.mjs.map
