import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { UserType } from '../../constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../calendar.helper";
import * as i3 from "@angular/common";
import * as i4 from "@ng-bootstrap/ng-bootstrap";
import * as i5 from "@ngx-translate/core";
import * as i6 from "../../truncate.pipe";
export class TadaNgxCalendarCellComponent {
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
TadaNgxCalendarCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarCellComponent, deps: [{ token: i1.Router }, { token: i2.TadaNgxCalendarHelper }], target: i0.ɵɵFactoryTarget.Component });
TadaNgxCalendarCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TadaNgxCalendarCellComponent, selector: "timetable-cell", inputs: { schedule: "schedule", lessionUnit: "lessionUnit", assignments: "assignments", userType: "userType", isBOSide: "isBOSide" }, outputs: { onChangeOnOffSwitch: "onChangeOnOffSwitch", scheduleOpened: "scheduleOpened" }, viewQueries: [{ propertyName: "switchOffline", first: true, predicate: ["switchOffline"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"schedule-item-title\"\n  [ngbPopover]=\"popContent\"\n  [autoClose]=\"'outside'\"\n  triggers=\"manual\"\n  #p=\"ngbPopover\"\n  (click)=\"p.open()\"\n  (click)=\"onTitleClick()\"\n  placement=\"bottom-left\"\n>\n  <span *ngIf=\"!!schedule?.details?.online\">\n    <svg width=\"13\" height=\"10\" viewBox=\"0 0 13 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M11.8625 1.75625L9.5 3.0875V1.25C9.5 1.05109 9.42098 0.860322 9.28033 0.71967C9.13968 0.579018 8.94891 0.5 8.75 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V8C0.5 8.39782 0.658035 8.77936 0.93934 9.06066C1.22064 9.34196 1.60218 9.5 2 9.5H8.75C8.94891 9.5 9.13968 9.42098 9.28033 9.28033C9.42098 9.13968 9.5 8.94891 9.5 8.75V6.905L11.8625 8.23625C11.9231 8.27585 11.9931 8.29881 12.0654 8.3028C12.1377 8.3068 12.2097 8.29169 12.2743 8.25901C12.3389 8.22633 12.3938 8.17722 12.4334 8.11661C12.473 8.05601 12.496 7.98604 12.5 7.91375V2.075C12.4954 2.00303 12.472 1.93353 12.4321 1.87343C12.3922 1.81333 12.3373 1.76473 12.2728 1.73248C12.2083 1.70023 12.1365 1.68545 12.0645 1.68962C11.9925 1.69379 11.9228 1.71677 11.8625 1.75625Z\" fill=\"#0E77D2\"/>\n      </svg>\n  </span>\n  <span  class=\"schedule-title\">\n    {{ schedule?.title + (schedule?.details?.unitOrder ? \": \" + (\"streamingLession\" | translate: {unitNo: schedule?.details?.unitOrder }) : \"\") | truncate: [50] }}\n  </span>\n</div>\n\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\">\n    <div class=\"d-block\" *ngIf=\"userType === userTypeEnum.TUTOR\">\n      <div class=\"mb-1\">\n\n        <div class=\"schedule-pop-content-header\" *ngIf=\"lessionUnit?.unitNo && lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: lessionUnit.unitNo || \"\", unitName: lessionUnit.name}  }}</span>\n        </div>\n        <div class=\"schedule-pop-content-header\" *ngIf=\"!lessionUnit?.unitNo || !lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: schedule?.details?.unitOrder || \"\", unitName: schedule?.details?.majorName} }}</span>\n        </div>\n\n        <div class=\"schedule-pop-content-line\"></div>\n        <div class=\"d-flex mb-0 justify-content-between align-items-center\">\n          <span\n            class=\"class-online-label\"\n            [class.is-on]=\"\n              !!schedule?.details?.online || !!switchOffline.checked\n            \"\n            (click)=\"onClickToJoinClassOnline()\"\n          >\n            {{ 'joinClassOnlineNow' | translate }}\n          </span>\n          <span class=\"ml-2\" [hidden]=\"isBOSide\">\n            <span class=\"custom-control custom-switch\">\n              <input\n                #switchOffline\n                ngModel\n                [checked]=\"!!schedule?.details?.online ? true : null\"\n                type=\"checkbox\"\n                class=\"custom-control-input\"\n                id=\"switchOffline\"\n                (change)=\"changeOnOffSwitch($event)\"\n              />\n              <label class=\"custom-control-label\" for=\"switchOffline\"></label>\n            </span>\n          </span>\n        </div>\n      </div>\n\n      <div class=\"schedule-pop-content-links\" *ngIf=\"!isBOSide\">\n        <span (click)=\"createAssignment()\">T\u1EA1o b\u00E0i t\u1EADp</span>\n        <span>S\u1ED5 \u0111\u1EA7u b\u00E0i</span>\n      </div>\n    </div>\n\n    <div\n      class=\"d-flex mb-0 justify-content-between align-items-center\"\n      *ngIf=\"userType === userTypeEnum.STUDENT && !isBOSide\"\n    >\n      <span\n        class=\"class-online-label\"\n        [class.is-on]=\"!!schedule?.details?.online\"\n        (click)=\"onClickToJoinClassOnline()\"\n      >\n        {{ 'studentJoinClassOnlineNow' | translate }}\n      </span>\n    </div>\n\n\n    <ul class=\"list-assignments\" *ngIf=\"assignments?.length && !isBOSide\" >\n        <li *ngFor=\"let item of assignments\" (click)=\"onClickAssignment(item)\">\n            <h4>{{item.title}}</h4>\n        </li>\n    </ul>\n\n  </div>\n</ng-template>\n", styles: [".schedule-item-title{background:#e3f2ff;border-radius:4px;padding:9px 20px;font-weight:600;font-size:12px;line-height:22px;cursor:pointer;color:#4e4852;display:flex;width:100%;gap:5px;border:1px solid transparent}.schedule-item-title mat-icon{width:14px}.schedule-item-title span{display:block;white-space:nowrap}.schedule-item-title:hover{border:1px solid #1e88e5;background:#e3f2ff}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #EAEAEA;margin-bottom:5px;padding-bottom:3px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:12px;line-height:14px;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px}.list-assignments{padding:0;margin:0;margin-top:1.5rem}.list-assignments li{padding:10px 8px;border:1px solid #b4b7c6;list-style:none;margin-bottom:10px;cursor:pointer}.list-assignments li:hover{border:1px solid #000000}.list-assignments li:hover h4{color:#000}.list-assignments li h4{font-weight:700;font-size:12px;line-height:16px;color:#26292c;margin:0;padding-bottom:0;border:none}\n"], dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgbPopover, selector: "[ngbPopover]", inputs: ["animation", "autoClose", "ngbPopover", "popoverTitle", "placement", "popperOptions", "triggers", "positionTarget", "container", "disablePopover", "popoverClass", "openDelay", "closeDelay"], outputs: ["shown", "hidden"], exportAs: ["ngbPopover"] }, { kind: "pipe", type: i5.TranslatePipe, name: "translate" }, { kind: "pipe", type: i6.TruncatePipe, name: "truncate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TadaNgxCalendarCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'timetable-cell', template: "<div\n  class=\"schedule-item-title\"\n  [ngbPopover]=\"popContent\"\n  [autoClose]=\"'outside'\"\n  triggers=\"manual\"\n  #p=\"ngbPopover\"\n  (click)=\"p.open()\"\n  (click)=\"onTitleClick()\"\n  placement=\"bottom-left\"\n>\n  <span *ngIf=\"!!schedule?.details?.online\">\n    <svg width=\"13\" height=\"10\" viewBox=\"0 0 13 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M11.8625 1.75625L9.5 3.0875V1.25C9.5 1.05109 9.42098 0.860322 9.28033 0.71967C9.13968 0.579018 8.94891 0.5 8.75 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V8C0.5 8.39782 0.658035 8.77936 0.93934 9.06066C1.22064 9.34196 1.60218 9.5 2 9.5H8.75C8.94891 9.5 9.13968 9.42098 9.28033 9.28033C9.42098 9.13968 9.5 8.94891 9.5 8.75V6.905L11.8625 8.23625C11.9231 8.27585 11.9931 8.29881 12.0654 8.3028C12.1377 8.3068 12.2097 8.29169 12.2743 8.25901C12.3389 8.22633 12.3938 8.17722 12.4334 8.11661C12.473 8.05601 12.496 7.98604 12.5 7.91375V2.075C12.4954 2.00303 12.472 1.93353 12.4321 1.87343C12.3922 1.81333 12.3373 1.76473 12.2728 1.73248C12.2083 1.70023 12.1365 1.68545 12.0645 1.68962C11.9925 1.69379 11.9228 1.71677 11.8625 1.75625Z\" fill=\"#0E77D2\"/>\n      </svg>\n  </span>\n  <span  class=\"schedule-title\">\n    {{ schedule?.title + (schedule?.details?.unitOrder ? \": \" + (\"streamingLession\" | translate: {unitNo: schedule?.details?.unitOrder }) : \"\") | truncate: [50] }}\n  </span>\n</div>\n\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\">\n    <div class=\"d-block\" *ngIf=\"userType === userTypeEnum.TUTOR\">\n      <div class=\"mb-1\">\n\n        <div class=\"schedule-pop-content-header\" *ngIf=\"lessionUnit?.unitNo && lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: lessionUnit.unitNo || \"\", unitName: lessionUnit.name}  }}</span>\n        </div>\n        <div class=\"schedule-pop-content-header\" *ngIf=\"!lessionUnit?.unitNo || !lessionUnit?.name\">\n          <span>{{ \"streamingTimeTable\" | translate: {unitNo: schedule?.details?.unitOrder || \"\", unitName: schedule?.details?.majorName} }}</span>\n        </div>\n\n        <div class=\"schedule-pop-content-line\"></div>\n        <div class=\"d-flex mb-0 justify-content-between align-items-center\">\n          <span\n            class=\"class-online-label\"\n            [class.is-on]=\"\n              !!schedule?.details?.online || !!switchOffline.checked\n            \"\n            (click)=\"onClickToJoinClassOnline()\"\n          >\n            {{ 'joinClassOnlineNow' | translate }}\n          </span>\n          <span class=\"ml-2\" [hidden]=\"isBOSide\">\n            <span class=\"custom-control custom-switch\">\n              <input\n                #switchOffline\n                ngModel\n                [checked]=\"!!schedule?.details?.online ? true : null\"\n                type=\"checkbox\"\n                class=\"custom-control-input\"\n                id=\"switchOffline\"\n                (change)=\"changeOnOffSwitch($event)\"\n              />\n              <label class=\"custom-control-label\" for=\"switchOffline\"></label>\n            </span>\n          </span>\n        </div>\n      </div>\n\n      <div class=\"schedule-pop-content-links\" *ngIf=\"!isBOSide\">\n        <span (click)=\"createAssignment()\">T\u1EA1o b\u00E0i t\u1EADp</span>\n        <span>S\u1ED5 \u0111\u1EA7u b\u00E0i</span>\n      </div>\n    </div>\n\n    <div\n      class=\"d-flex mb-0 justify-content-between align-items-center\"\n      *ngIf=\"userType === userTypeEnum.STUDENT && !isBOSide\"\n    >\n      <span\n        class=\"class-online-label\"\n        [class.is-on]=\"!!schedule?.details?.online\"\n        (click)=\"onClickToJoinClassOnline()\"\n      >\n        {{ 'studentJoinClassOnlineNow' | translate }}\n      </span>\n    </div>\n\n\n    <ul class=\"list-assignments\" *ngIf=\"assignments?.length && !isBOSide\" >\n        <li *ngFor=\"let item of assignments\" (click)=\"onClickAssignment(item)\">\n            <h4>{{item.title}}</h4>\n        </li>\n    </ul>\n\n  </div>\n</ng-template>\n", styles: [".schedule-item-title{background:#e3f2ff;border-radius:4px;padding:9px 20px;font-weight:600;font-size:12px;line-height:22px;cursor:pointer;color:#4e4852;display:flex;width:100%;gap:5px;border:1px solid transparent}.schedule-item-title mat-icon{width:14px}.schedule-item-title span{display:block;white-space:nowrap}.schedule-item-title:hover{border:1px solid #1e88e5;background:#e3f2ff}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #EAEAEA;margin-bottom:5px;padding-bottom:3px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:12px;line-height:14px;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px}.list-assignments{padding:0;margin:0;margin-top:1.5rem}.list-assignments li{padding:10px 8px;border:1px solid #b4b7c6;list-style:none;margin-bottom:10px;cursor:pointer}.list-assignments li:hover{border:1px solid #000000}.list-assignments li:hover h4{color:#000}.list-assignments li h4{font-weight:700;font-size:12px;line-height:16px;color:#26292c;margin:0;padding-bottom:0;border:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.TadaNgxCalendarHelper }]; }, propDecorators: { schedule: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXRhYmxlLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2FsZW5kYXIvc3JjL2xpYi9jb21wb25lbnRzL3RpbWV0YWJsZS1jZWxsL3RpbWV0YWJsZS1jZWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NhbGVuZGFyL3NyYy9saWIvY29tcG9uZW50cy90aW1ldGFibGUtY2VsbC90aW1ldGFibGUtY2VsbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBTzNDLE1BQU0sT0FBTyw0QkFBNEI7SUFVdkMsWUFDVSxNQUFjLEVBQ2QscUJBQTRDO1FBRDVDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBVHRELGlCQUFZLEdBQUcsUUFBUSxDQUFDO1FBRWYsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFHdkIsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM5QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFLbkQsQ0FBQztJQUVELFFBQVEsS0FBVyxDQUFDO0lBRXBCLFdBQVcsQ0FBQyxPQUFzQixJQUFVLENBQUM7SUFFN0MsWUFBWTtRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FDVCx1Q0FBdUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUMxRyxRQUFRLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUN2QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCx3QkFBd0I7UUFDdEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQVc7UUFDakMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBUztRQUN6QixNQUFNLENBQUMsSUFBSSxDQUNULHNCQUFzQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQy9CLFFBQVEsQ0FDVCxDQUFDO0lBQ0osQ0FBQzs7eUhBdkRVLDRCQUE0Qjs2R0FBNUIsNEJBQTRCLDRaQ3ZCekMsdWdJQXdGQTsyRkRqRWEsNEJBQTRCO2tCQUx4QyxTQUFTOytCQUNFLGdCQUFnQjtpSUFLakIsUUFBUTtzQkFBaEIsS0FBSztnQkFDc0IsYUFBYTtzQkFBeEMsU0FBUzt1QkFBQyxlQUFlO2dCQUVqQixXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNJLG1CQUFtQjtzQkFBNUIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFRhZGFOZ3hDYWxlbmRhckhlbHBlciB9IGZyb20gJy4uLy4uL2NhbGVuZGFyLmhlbHBlcic7XG5pbXBvcnQgeyBVc2VyVHlwZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbWV0YWJsZS1jZWxsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWV0YWJsZS1jZWxsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZXRhYmxlLWNlbGwuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVGFkYU5neENhbGVuZGFyQ2VsbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgc2NoZWR1bGU6IGFueTtcbiAgQFZpZXdDaGlsZCgnc3dpdGNoT2ZmbGluZScpIHN3aXRjaE9mZmxpbmUhOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICB1c2VyVHlwZUVudW0gPSBVc2VyVHlwZTtcbiAgQElucHV0KCkgbGVzc2lvblVuaXQ6IGFueTtcbiAgQElucHV0KCkgYXNzaWdubWVudHM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHVzZXJUeXBlOiBhbnk7XG4gIEBJbnB1dCgpIGlzQk9TaWRlOiBhbnk7XG4gIEBPdXRwdXQoKSBvbkNoYW5nZU9uT2ZmU3dpdGNoID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzY2hlZHVsZU9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgdGFkYU5neENhbGVuZGFySGVscGVyOiBUYWRhTmd4Q2FsZW5kYXJIZWxwZXJcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHsgfVxuXG4gIG9uVGl0bGVDbGljaygpIHtcbiAgICB0aGlzLmFzc2lnbm1lbnRzID0gW107XG4gICAgdGhpcy5zY2hlZHVsZU9wZW5lZC5lbWl0KHRoaXMuc2NoZWR1bGUpO1xuICB9XG5cbiAgY3JlYXRlQXNzaWdubWVudCgpIHtcbiAgICB3aW5kb3cub3BlbihcbiAgICAgIGAvdHV0b3IvY3JlYXRlLWFzc2lnbm1lbnQ/c2NoZWR1bGVJZD0ke3RoaXMuc2NoZWR1bGUuZGV0YWlscy5pZH0mY2xhc3NJZD0ke3RoaXMuc2NoZWR1bGUuZGV0YWlscy5jbGFzc0lkfWAsXG4gICAgICAnX2JsYW5rJ1xuICAgICk7XG4gIH1cblxuICBnZXRTaG9ydERlc2MoZGF0YTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMudGFkYU5neENhbGVuZGFySGVscGVyLnRydW5jYXRlV29yZHMoZGF0YSwgMTUpO1xuICB9XG5cbiAgZ2V0U2hvcnRUaXRsZShkYXRhOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy50YWRhTmd4Q2FsZW5kYXJIZWxwZXIudHJ1bmNhdGVXb3JkcyhkYXRhLCAxMCk7XG4gIH1cblxuICBvbkNsaWNrVG9Kb2luQ2xhc3NPbmxpbmUoKSB7XG4gICAgaWYgKCEhdGhpcy5zY2hlZHVsZT8uZGV0YWlscz8ub25saW5lICYmICEhdGhpcy5zY2hlZHVsZT8uZGV0YWlscz8uam9pblVybCkge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5zY2hlZHVsZT8uZGV0YWlscz8uam9pblVybCwgJ19ibGFuaycpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoYW5nZU9uT2ZmU3dpdGNoKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZU9uT2ZmU3dpdGNoLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIG9uQ2xpY2tBc3NpZ25tZW50KGl0ZW06IGFueSkge1xuICAgIHdpbmRvdy5vcGVuKFxuICAgICAgYC9hc3NpZ25tZW50LWRldGFpbC8ke2l0ZW0uaWR9YCxcbiAgICAgICdfYmxhbmsnXG4gICAgKTtcbiAgfVxufVxuIiwiPGRpdlxuICBjbGFzcz1cInNjaGVkdWxlLWl0ZW0tdGl0bGVcIlxuICBbbmdiUG9wb3Zlcl09XCJwb3BDb250ZW50XCJcbiAgW2F1dG9DbG9zZV09XCInb3V0c2lkZSdcIlxuICB0cmlnZ2Vycz1cIm1hbnVhbFwiXG4gICNwPVwibmdiUG9wb3ZlclwiXG4gIChjbGljayk9XCJwLm9wZW4oKVwiXG4gIChjbGljayk9XCJvblRpdGxlQ2xpY2soKVwiXG4gIHBsYWNlbWVudD1cImJvdHRvbS1sZWZ0XCJcbj5cbiAgPHNwYW4gKm5nSWY9XCIhIXNjaGVkdWxlPy5kZXRhaWxzPy5vbmxpbmVcIj5cbiAgICA8c3ZnIHdpZHRoPVwiMTNcIiBoZWlnaHQ9XCIxMFwiIHZpZXdCb3g9XCIwIDAgMTMgMTBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgIDxwYXRoIGQ9XCJNMTEuODYyNSAxLjc1NjI1TDkuNSAzLjA4NzVWMS4yNUM5LjUgMS4wNTEwOSA5LjQyMDk4IDAuODYwMzIyIDkuMjgwMzMgMC43MTk2N0M5LjEzOTY4IDAuNTc5MDE4IDguOTQ4OTEgMC41IDguNzUgMC41SDJDMS42MDIxOCAwLjUgMS4yMjA2NCAwLjY1ODAzNSAwLjkzOTM0IDAuOTM5MzRDMC42NTgwMzUgMS4yMjA2NCAwLjUgMS42MDIxOCAwLjUgMlY4QzAuNSA4LjM5NzgyIDAuNjU4MDM1IDguNzc5MzYgMC45MzkzNCA5LjA2MDY2QzEuMjIwNjQgOS4zNDE5NiAxLjYwMjE4IDkuNSAyIDkuNUg4Ljc1QzguOTQ4OTEgOS41IDkuMTM5NjggOS40MjA5OCA5LjI4MDMzIDkuMjgwMzNDOS40MjA5OCA5LjEzOTY4IDkuNSA4Ljk0ODkxIDkuNSA4Ljc1VjYuOTA1TDExLjg2MjUgOC4yMzYyNUMxMS45MjMxIDguMjc1ODUgMTEuOTkzMSA4LjI5ODgxIDEyLjA2NTQgOC4zMDI4QzEyLjEzNzcgOC4zMDY4IDEyLjIwOTcgOC4yOTE2OSAxMi4yNzQzIDguMjU5MDFDMTIuMzM4OSA4LjIyNjMzIDEyLjM5MzggOC4xNzcyMiAxMi40MzM0IDguMTE2NjFDMTIuNDczIDguMDU2MDEgMTIuNDk2IDcuOTg2MDQgMTIuNSA3LjkxMzc1VjIuMDc1QzEyLjQ5NTQgMi4wMDMwMyAxMi40NzIgMS45MzM1MyAxMi40MzIxIDEuODczNDNDMTIuMzkyMiAxLjgxMzMzIDEyLjMzNzMgMS43NjQ3MyAxMi4yNzI4IDEuNzMyNDhDMTIuMjA4MyAxLjcwMDIzIDEyLjEzNjUgMS42ODU0NSAxMi4wNjQ1IDEuNjg5NjJDMTEuOTkyNSAxLjY5Mzc5IDExLjkyMjggMS43MTY3NyAxMS44NjI1IDEuNzU2MjVaXCIgZmlsbD1cIiMwRTc3RDJcIi8+XG4gICAgICA8L3N2Zz5cbiAgPC9zcGFuPlxuICA8c3BhbiAgY2xhc3M9XCJzY2hlZHVsZS10aXRsZVwiPlxuICAgIHt7IHNjaGVkdWxlPy50aXRsZSArIChzY2hlZHVsZT8uZGV0YWlscz8udW5pdE9yZGVyID8gXCI6IFwiICsgKFwic3RyZWFtaW5nTGVzc2lvblwiIHwgdHJhbnNsYXRlOiB7dW5pdE5vOiBzY2hlZHVsZT8uZGV0YWlscz8udW5pdE9yZGVyIH0pIDogXCJcIikgfCB0cnVuY2F0ZTogWzUwXSB9fVxuICA8L3NwYW4+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNwb3BDb250ZW50PlxuICA8ZGl2IGNsYXNzPVwic2NoZWR1bGUtcG9wLWNvbnRlbnRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZC1ibG9ja1wiICpuZ0lmPVwidXNlclR5cGUgPT09IHVzZXJUeXBlRW51bS5UVVRPUlwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1iLTFcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic2NoZWR1bGUtcG9wLWNvbnRlbnQtaGVhZGVyXCIgKm5nSWY9XCJsZXNzaW9uVW5pdD8udW5pdE5vICYmIGxlc3Npb25Vbml0Py5uYW1lXCI+XG4gICAgICAgICAgPHNwYW4+e3sgXCJzdHJlYW1pbmdUaW1lVGFibGVcIiB8IHRyYW5zbGF0ZToge3VuaXRObzogbGVzc2lvblVuaXQudW5pdE5vIHx8IFwiXCIsIHVuaXROYW1lOiBsZXNzaW9uVW5pdC5uYW1lfSAgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2NoZWR1bGUtcG9wLWNvbnRlbnQtaGVhZGVyXCIgKm5nSWY9XCIhbGVzc2lvblVuaXQ/LnVuaXRObyB8fCAhbGVzc2lvblVuaXQ/Lm5hbWVcIj5cbiAgICAgICAgICA8c3Bhbj57eyBcInN0cmVhbWluZ1RpbWVUYWJsZVwiIHwgdHJhbnNsYXRlOiB7dW5pdE5vOiBzY2hlZHVsZT8uZGV0YWlscz8udW5pdE9yZGVyIHx8IFwiXCIsIHVuaXROYW1lOiBzY2hlZHVsZT8uZGV0YWlscz8ubWFqb3JOYW1lfSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNjaGVkdWxlLXBvcC1jb250ZW50LWxpbmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBtYi0wIGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzcz1cImNsYXNzLW9ubGluZS1sYWJlbFwiXG4gICAgICAgICAgICBbY2xhc3MuaXMtb25dPVwiXG4gICAgICAgICAgICAgICEhc2NoZWR1bGU/LmRldGFpbHM/Lm9ubGluZSB8fCAhIXN3aXRjaE9mZmxpbmUuY2hlY2tlZFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrVG9Kb2luQ2xhc3NPbmxpbmUoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgJ2pvaW5DbGFzc09ubGluZU5vdycgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtbC0yXCIgW2hpZGRlbl09XCJpc0JPU2lkZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbCBjdXN0b20tc3dpdGNoXCI+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICNzd2l0Y2hPZmZsaW5lXG4gICAgICAgICAgICAgICAgbmdNb2RlbFxuICAgICAgICAgICAgICAgIFtjaGVja2VkXT1cIiEhc2NoZWR1bGU/LmRldGFpbHM/Lm9ubGluZSA/IHRydWUgOiBudWxsXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXRcIlxuICAgICAgICAgICAgICAgIGlkPVwic3dpdGNoT2ZmbGluZVwiXG4gICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VPbk9mZlN3aXRjaCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtbGFiZWxcIiBmb3I9XCJzd2l0Y2hPZmZsaW5lXCI+PC9sYWJlbD5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2hlZHVsZS1wb3AtY29udGVudC1saW5rc1wiICpuZ0lmPVwiIWlzQk9TaWRlXCI+XG4gICAgICAgIDxzcGFuIChjbGljayk9XCJjcmVhdGVBc3NpZ25tZW50KClcIj5U4bqhbyBiw6BpIHThuq1wPC9zcGFuPlxuICAgICAgICA8c3Bhbj5T4buVIMSR4bqndSBiw6BpPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImQtZmxleCBtYi0wIGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiXG4gICAgICAqbmdJZj1cInVzZXJUeXBlID09PSB1c2VyVHlwZUVudW0uU1RVREVOVCAmJiAhaXNCT1NpZGVcIlxuICAgID5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiY2xhc3Mtb25saW5lLWxhYmVsXCJcbiAgICAgICAgW2NsYXNzLmlzLW9uXT1cIiEhc2NoZWR1bGU/LmRldGFpbHM/Lm9ubGluZVwiXG4gICAgICAgIChjbGljayk9XCJvbkNsaWNrVG9Kb2luQ2xhc3NPbmxpbmUoKVwiXG4gICAgICA+XG4gICAgICAgIHt7ICdzdHVkZW50Sm9pbkNsYXNzT25saW5lTm93JyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuXG5cbiAgICA8dWwgY2xhc3M9XCJsaXN0LWFzc2lnbm1lbnRzXCIgKm5nSWY9XCJhc3NpZ25tZW50cz8ubGVuZ3RoICYmICFpc0JPU2lkZVwiID5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIGFzc2lnbm1lbnRzXCIgKGNsaWNrKT1cIm9uQ2xpY2tBc3NpZ25tZW50KGl0ZW0pXCI+XG4gICAgICAgICAgICA8aDQ+e3tpdGVtLnRpdGxlfX08L2g0PlxuICAgICAgICA8L2xpPlxuICAgIDwvdWw+XG5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19