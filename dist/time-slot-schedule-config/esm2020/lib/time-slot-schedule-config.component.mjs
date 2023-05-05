import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getActiveYear } from '../shared/helper';
import { Constants } from '../shared/constant';
import * as _ from "lodash";
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
import * as i2 from "@angular/common";
export class TimeSlotScheduleConfigComponent {
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
        console.log(changes);
        if (changes?.timeslots?.currentValue) {
            this.initTimetableSlot();
        }
        if (changes && changes?.availabilities?.currentValue) {
            Object.values(this.timeTableData).forEach((weekday) => {
                weekday.items = weekday.items.map((slot) => ({
                    ...slot,
                    details: this.getAvailabilities(slot),
                }));
            });
            this.dataChanged.emit(this.timeTableData);
        }
    }
    getMaxlessionOrder(timeSlot) {
        return _.maxBy(timeSlot, (o) => { return o.order; })?.order || 10;
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
        if (!!timeslot?.id && timeslot.details) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7OztBQVE1QixNQUFNLE9BQU8sK0JBQStCO0lBb0IzQyxZQUNTLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBcEJwQyxlQUFVLEdBQVcsYUFBYSxFQUFFLENBQUM7UUFDckMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFVLEVBQUUsQ0FBQztRQUN0QixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixjQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsZUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDaEMsYUFBUSxHQUFXLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzNDLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLDZCQUF3QixHQUFVLEVBQUUsQ0FBQztRQUNyQyxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ2IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZCxjQUFTLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFLbEQsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBWTtRQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRTtZQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzVELEdBQUcsSUFBSTtvQkFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztpQkFDckMsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxQztJQUVGLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxRQUFlO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQW9CO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QyxDQUFDLElBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FDcEQsQ0FBQztRQUNGLElBQUksYUFBYSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdEIsQ0FBQztJQUVELG1CQUFtQjtRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHO2dCQUN6QixLQUFLLEVBQUUsRUFBRTthQUNULENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsTUFBTSxXQUFXLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUNwQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUMxRSxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRztnQkFDekIsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkMsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRXRELENBQUM7SUFFRCxjQUFjLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDeEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQzFDLENBQUMsSUFBb0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQzlDLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBd0I7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUM5QixJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDdkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUN6RDthQUFNO1lBQ04sUUFBUSxDQUFDLE9BQU8sR0FBRztnQkFDbEIsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUN2QixVQUFVLEVBQUUsYUFBYSxFQUFFO2dCQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsU0FBUyxFQUFFLElBQUk7Z0JBQ2Ysc0JBQXNCLEVBQUUsSUFBSTthQUM1QixDQUFDO1NBQ0Y7UUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVULENBQUM7SUFFRCxXQUFXLEtBQVcsQ0FBQzs7NEhBdEhYLCtCQUErQjtnSEFBL0IsK0JBQStCLDhQQ1o1QyxvbURBa0RBOzJGRHRDYSwrQkFBK0I7a0JBTDNDLFNBQVM7K0JBQ0Usb0NBQW9DO3VHQWtCdEMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNJLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0UsY0FBYztzQkFBdEIsS0FBSztnQkFDSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRBY3RpdmVZZWFyIH0gZnJvbSAnLi4vc2hhcmVkL2hlbHBlcic7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9zaGFyZWQvY29uc3RhbnQnO1xuaW1wb3J0IHsgSUF2YWlsYWJpbGl0eSwgSVRpbWV0YWJsZVNsb3QgfSBmcm9tICcuL21vZHVsZS90eXBlJztcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWRhLW5neC10aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnJyxcbiAgdGVtcGxhdGVVcmw6ICd0aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lU2xvdFNjaGVkdWxlQ29uZmlnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXHRzY2hvb2xZZWFyOiBudW1iZXIgPSBnZXRBY3RpdmVZZWFyKCk7XG5cdG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblx0YWxsdGltZXNsb3Q6IGFueVtdID0gW107XG5cdGNsYXNzTGlzdDogYW55W10gPSBbXTtcblx0bWFqb3JzOiBhbnlbXSA9IFtdO1xuXHRhY3RpdmVDbGFzc0luZGV4OiBudW1iZXIgPSAwO1xuXHRzZW1lc3RlcnMgPSBPYmplY3Qua2V5cyhDb25zdGFudHMuU0VNRVNURVJTKTtcblx0ZGF5c09mV2VlayA9IENvbnN0YW50cy5XRUVLREFZUztcblx0c2VtZXN0ZXI6IHN0cmluZyA9IENvbnN0YW50cy5TRU1FU1RFUlMuQUxMO1xuXHR0aW1lVGFibGVEYXRhOiBhbnkgPSB7fTtcblx0Y2xhc3NMaXN0U2VsZWN0ZWREZWZhdWx0OiBhbnlbXSA9IFtdO1xuXHRzbG90TnVtT2ZEYXk6IGFueVtdID0gW107XG5cdHR1dG9yVXVpZDogYW55ID0gbnVsbDtcblx0QElucHV0KCkgZ3JhZGVDb2RlID0gJyc7XG5cdEBJbnB1dCgpIHRpbWVTaGlmdCA9ICcnO1xuICBASW5wdXQoKSB0aW1lc2xvdHM6IGFueVtdID0gW107XG5cdEBJbnB1dCgpIGF2YWlsYWJpbGl0aWVzOiBJQXZhaWxhYmlsaXR5W10gPSBbXTtcblx0QE91dHB1dCgpIGRhdGFDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIFxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZVxuXHQpIHtcblx0XHR0cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcoJ3ZpJyk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmJ1aWxkVGltZVRhYmxlQmFzaWMoKTtcblx0fVxuXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSk6IHZvaWQge1xuXG4gICAgY29uc29sZS5sb2coY2hhbmdlcyk7XG4gICAgaWYgKGNoYW5nZXM/LnRpbWVzbG90cz8uY3VycmVudFZhbHVlKSB7XG5cdFx0XHR0aGlzLmluaXRUaW1ldGFibGVTbG90KCk7XG5cdFx0fVxuXG5cdFx0aWYgKGNoYW5nZXMgJiYgY2hhbmdlcz8uYXZhaWxhYmlsaXRpZXM/LmN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0T2JqZWN0LnZhbHVlcyh0aGlzLnRpbWVUYWJsZURhdGEpLmZvckVhY2goKHdlZWtkYXk6IGFueSkgPT4ge1xuXHRcdFx0XHR3ZWVrZGF5Lml0ZW1zID0gd2Vla2RheS5pdGVtcy5tYXAoKHNsb3Q6IElUaW1ldGFibGVTbG90KSA9PiAoe1xuXHRcdFx0XHRcdC4uLnNsb3QsXG5cdFx0XHRcdFx0ZGV0YWlsczogdGhpcy5nZXRBdmFpbGFiaWxpdGllcyhzbG90KSxcblx0XHRcdFx0fSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLmRhdGFDaGFuZ2VkLmVtaXQodGhpcy50aW1lVGFibGVEYXRhKTtcblx0XHR9XG5cblx0fVxuXG5cdGdldE1heGxlc3Npb25PcmRlcih0aW1lU2xvdDogYW55W10pIHtcblx0XHRyZXR1cm4gXy5tYXhCeSh0aW1lU2xvdCwgKG86IGFueSkgPT4geyByZXR1cm4gby5vcmRlcjsgfSk/Lm9yZGVyIHx8IDEwO1xuXHR9XG5cblx0Z2V0QXZhaWxhYmlsaXRpZXMoc2xvdDogSVRpbWV0YWJsZVNsb3QpIHtcblx0XHRjb25zdCBmb3VuZFNjaGVkdWxlID0gdGhpcy5hdmFpbGFiaWxpdGllcy5maW5kKFxuXHRcdFx0KGl0ZW06IElBdmFpbGFiaWxpdHkpID0+IGl0ZW0udGltZXNsb3RJZCA9PT0gc2xvdC5pZFxuXHRcdCk7XG5cdFx0aWYgKGZvdW5kU2NoZWR1bGUpIHtcblx0XHRcdHNsb3QuZW5hYmxlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZvdW5kU2NoZWR1bGU7XG5cdH1cblxuXHRidWlsZFRpbWVUYWJsZUJhc2ljKCkge1xuICAgIGNvbnNvbGUubG9nKCdidWlsZFRpbWVUYWJsZUJhc2ljLi4uLicpO1xuXHRcdHRoaXMuZGF5c09mV2Vlay5mb3JFYWNoKChkYXk6IHN0cmluZykgPT4ge1xuXHRcdFx0dGhpcy50aW1lVGFibGVEYXRhW2RheV0gPSB7XG5cdFx0XHRcdGl0ZW1zOiBbXSxcblx0XHRcdH07XG5cdFx0fSk7XG5cdH1cblxuXHRpbml0VGltZXRhYmxlU2xvdCgpIHtcblx0XHRjb25zdCBhbGx0aW1lc2xvdDogSVRpbWV0YWJsZVNsb3RbXSA9IHRoaXMudGltZXNsb3RzO1xuXHRcdHRoaXMuZGF5c09mV2Vlay5mb3JFYWNoKChkYXkpID0+IHtcblx0XHRcdGNvbnN0IHNsb3RzT2ZEYXkgPSBhbGx0aW1lc2xvdC5maWx0ZXIoXG5cdFx0XHRcdChzbG90OiBhbnkpID0+IHNsb3QuZGF5T2ZXZWVrID09PSBkYXkgJiYgc2xvdC50aW1lU2hpZnQgPT09IHRoaXMudGltZVNoaWZ0XG5cdFx0XHQpO1xuXHRcdFx0dGhpcy50aW1lVGFibGVEYXRhW2RheV0gPSB7XG5cdFx0XHRcdGl0ZW1zOiBfLm9yZGVyQnkoc2xvdHNPZkRheSwgW1wib3JkZXJcIl0pLFxuXHRcdFx0fTtcblx0XHRcdGNvbnN0IG1heExlc3Npb24gPSB0aGlzLmdldE1heGxlc3Npb25PcmRlcihzbG90c09mRGF5KTtcblx0XHRcdHRoaXMuc2xvdE51bU9mRGF5ID0gWy4uLkFycmF5KG1heExlc3Npb24pLmtleXMoKV07XG5cdFx0fSk7XG4gICAgY29uc29sZS5sb2coXCJ0aGlzLnRpbWVUYWJsZURhdGE6XCIsdGhpcy50aW1lVGFibGVEYXRhKTtcbiAgICBjb25zb2xlLmxvZyhcInRoaXMuc2xvdE51bU9mRGF5OlwiLHRoaXMuc2xvdE51bU9mRGF5KVxuXG5cdH1cblxuXHRnZXRTbG90QnlPcmRlcihkYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnRpbWVUYWJsZURhdGFbZGF5XS5pdGVtcy5maWx0ZXIoXG5cdFx0XHQoaXRlbTogSVRpbWV0YWJsZVNsb3QpID0+IGl0ZW0ub3JkZXIgPT09IGluZGV4XG5cdFx0KTtcblx0fVxuXG5cdG9uU2VsZWN0VGltZVNsb3QodGltZXNsb3Q6IElUaW1ldGFibGVTbG90KSB7XG5cdFx0aWYgKCF0aW1lc2xvdC5lbmFibGVkKSByZXR1cm47XG5cdFx0aWYgKCEhdGltZXNsb3Q/LmlkICYmIHRpbWVzbG90LmRldGFpbHMpIHtcblx0XHRcdHRpbWVzbG90LmRldGFpbHMuYXZhaWxhYmxlID0gIXRpbWVzbG90LmRldGFpbHMuYXZhaWxhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aW1lc2xvdC5kZXRhaWxzID0ge1xuXHRcdFx0XHRpZDogbnVsbCxcblx0XHRcdFx0dGltZXNsb3RJZDogdGltZXNsb3QuaWQsXG5cdFx0XHRcdHNjaG9vbFllYXI6IGdldEFjdGl2ZVllYXIoKSxcblx0XHRcdFx0c2VtZXN0ZXI6IHRoaXMuc2VtZXN0ZXIsXG5cdFx0XHRcdGdyYWRlQ29kZTogdGhpcy5ncmFkZUNvZGUsXG5cdFx0XHRcdGF2YWlsYWJsZTogdHJ1ZSxcblx0XHRcdFx0cmVhc29uT2ZVbmF2YWlsYWJpbGl0eTogbnVsbCxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmRhdGFDaGFuZ2VkLmVtaXQodGhpcy50aW1lVGFibGVEYXRhKTtcblx0XHR9LCA1MDApO1xuXG5cdH1cblxuXHRuZ09uRGVzdHJveSgpOiB2b2lkIHsgfVxufVxuIiwiPGRpdiBjbGFzcz1cInRpbWV0YWJsZS11aVwiPlxuICA8ZGl2IGNsYXNzPVwidGltZXRhYmxlLXVpLXByZWZpeC1jb2x1bW4gdGltZXRhYmxlLXVpLWRheS1jb2x1bW5cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1jb2x1bW4tbGVzc29uXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1sZXNzb24taXRlbVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBvcmRlciBvZiBzbG90TnVtT2ZEYXk7IGluZGV4IGFzIGlcIlxuICAgICAgPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuPlRp4bq/dCB7eyBvcmRlciArIDEgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IGRheSBvZiBvYmplY3RLZXlzKHRpbWVUYWJsZURhdGEpXCJcbiAgICBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktY29sdW1uXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWNvbHVtbi1sZXNzb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LW5hbWVcIj5cbiAgICAgICAge3sgZGF5IHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHNsb3ROdW0gb2Ygc2xvdE51bU9mRGF5XCJcbiAgICAgID5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGltZXNsb3Qgb2YgZ2V0U2xvdEJ5T3JkZXIoZGF5LCBzbG90TnVtICsgMSlcIlxuICAgICAgICAgICAgW2F0dHIudGltZXRhYmxlX3Nsb3RfX2lkXT1cInRpbWVzbG90LmlkXCJcbiAgICAgICAgICAgIFthdHRyLnRpbWV0YWJsZV9zbG90X190aW1lX3NoaWZ0XT1cInRpbWVzbG90LnRpbWVTaGlmdFwiXG4gICAgICAgICAgICBbYXR0ci50aW1ldGFibGVfc2xvdF9fb3JkZXJdPVwidGltZXNsb3Qub3JkZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtX19pdGVtXCJcbiAgICAgICAgICAgIFtjbGFzcy5zbG90X2lzX2Rpc2FibGVkXT1cIiF0aW1lc2xvdC5lbmFibGVkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblNlbGVjdFRpbWVTbG90KHRpbWVzbG90KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInRpbWVzbG90Py5kZXRhaWxzPy5hdmFpbGFibGVcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGVkX3RpbWVfc2xvdFwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktbGVzc29uLWl0ZW1fX2l0ZW0gc2xvdF9pc19kaXNhYmxlZFwiXG4gICAgICAgICAgICAqbmdJZj1cIiFnZXRTbG90QnlPcmRlcihkYXksIHNsb3ROdW0gKyAxKT8ubGVuZ3RoXCJcbiAgICAgICAgICA+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=