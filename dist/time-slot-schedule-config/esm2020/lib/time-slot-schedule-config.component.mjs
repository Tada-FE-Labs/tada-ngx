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
        this.translate.setDefaultLang('vn');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7OztBQVE1QixNQUFNLE9BQU8sK0JBQStCO0lBb0IzQyxZQUNTLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBcEJwQyxlQUFVLEdBQVcsYUFBYSxFQUFFLENBQUM7UUFDckMsZUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDekIsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFVLEVBQUUsQ0FBQztRQUN0QixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBQ25CLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixjQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsZUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDaEMsYUFBUSxHQUFXLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQzNDLGtCQUFh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QUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLHNCQUFzQixFQUFFLElBQUk7YUFDNUIsQ0FBQztTQUNGO1FBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFVCxDQUFDO0lBRUQsV0FBVyxLQUFXLENBQUM7OzRIQXRIWCwrQkFBK0I7Z0hBQS9CLCtCQUErQiw4UENaNUMsb21EQWtEQTsyRkR0Q2EsK0JBQStCO2tCQUwzQyxTQUFTOytCQUNDLG9DQUFvQzt1R0FrQnJDLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0ksV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0QWN0aXZlWWVhciB9IGZyb20gJy4uL3NoYXJlZC9oZWxwZXInO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vc2hhcmVkL2NvbnN0YW50JztcbmltcG9ydCB7IElBdmFpbGFiaWxpdHksIElUaW1ldGFibGVTbG90IH0gZnJvbSAnLi9tb2R1bGUvdHlwZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAndGFkYS1uZ3gtdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZycsXG5cdHRlbXBsYXRlVXJsOiAndGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgVGltZVNsb3RTY2hlZHVsZUNvbmZpZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblx0c2Nob29sWWVhcjogbnVtYmVyID0gZ2V0QWN0aXZlWWVhcigpO1xuXHRvYmplY3RLZXlzID0gT2JqZWN0LmtleXM7XG5cdGFsbHRpbWVzbG90OiBhbnlbXSA9IFtdO1xuXHRjbGFzc0xpc3Q6IGFueVtdID0gW107XG5cdG1ham9yczogYW55W10gPSBbXTtcblx0YWN0aXZlQ2xhc3NJbmRleDogbnVtYmVyID0gMDtcblx0c2VtZXN0ZXJzID0gT2JqZWN0LmtleXMoQ29uc3RhbnRzLlNFTUVTVEVSUyk7XG5cdGRheXNPZldlZWsgPSBDb25zdGFudHMuV0VFS0RBWVM7XG5cdHNlbWVzdGVyOiBzdHJpbmcgPSBDb25zdGFudHMuU0VNRVNURVJTLkFMTDtcblx0dGltZVRhYmxlRGF0YTogYW55ID0ge307XG5cdGNsYXNzTGlzdFNlbGVjdGVkRGVmYXVsdDogYW55W10gPSBbXTtcblx0c2xvdE51bU9mRGF5OiBhbnlbXSA9IFtdO1xuXHR0dXRvclV1aWQ6IGFueSA9IG51bGw7XG5cdEBJbnB1dCgpIGdyYWRlQ29kZSA9ICcnO1xuXHRASW5wdXQoKSB0aW1lU2hpZnQgPSAnJztcblx0QElucHV0KCkgdGltZXNsb3RzOiBhbnlbXSA9IFtdO1xuXHRASW5wdXQoKSBhdmFpbGFiaWxpdGllczogSUF2YWlsYWJpbGl0eVtdID0gW107XG5cdEBPdXRwdXQoKSBkYXRhQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlXG5cdCkge1xuXHRcdHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKCd2bicpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5idWlsZFRpbWVUYWJsZUJhc2ljKCk7XG5cdH1cblxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcblxuXHRcdGNvbnNvbGUubG9nKGNoYW5nZXMpO1xuXHRcdGlmIChjaGFuZ2VzPy50aW1lc2xvdHM/LmN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0dGhpcy5pbml0VGltZXRhYmxlU2xvdCgpO1xuXHRcdH1cblxuXHRcdGlmIChjaGFuZ2VzICYmIGNoYW5nZXM/LmF2YWlsYWJpbGl0aWVzPy5jdXJyZW50VmFsdWUpIHtcblx0XHRcdE9iamVjdC52YWx1ZXModGhpcy50aW1lVGFibGVEYXRhKS5mb3JFYWNoKCh3ZWVrZGF5OiBhbnkpID0+IHtcblx0XHRcdFx0d2Vla2RheS5pdGVtcyA9IHdlZWtkYXkuaXRlbXMubWFwKChzbG90OiBJVGltZXRhYmxlU2xvdCkgPT4gKHtcblx0XHRcdFx0XHQuLi5zbG90LFxuXHRcdFx0XHRcdGRldGFpbHM6IHRoaXMuZ2V0QXZhaWxhYmlsaXRpZXMoc2xvdCksXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5kYXRhQ2hhbmdlZC5lbWl0KHRoaXMudGltZVRhYmxlRGF0YSk7XG5cdFx0fVxuXG5cdH1cblxuXHRnZXRNYXhsZXNzaW9uT3JkZXIodGltZVNsb3Q6IGFueVtdKSB7XG5cdFx0cmV0dXJuIF8ubWF4QnkodGltZVNsb3QsIChvOiBhbnkpID0+IHsgcmV0dXJuIG8ub3JkZXI7IH0pPy5vcmRlciB8fCAxMDtcblx0fVxuXG5cdGdldEF2YWlsYWJpbGl0aWVzKHNsb3Q6IElUaW1ldGFibGVTbG90KSB7XG5cdFx0Y29uc3QgZm91bmRTY2hlZHVsZSA9IHRoaXMuYXZhaWxhYmlsaXRpZXMuZmluZChcblx0XHRcdChpdGVtOiBJQXZhaWxhYmlsaXR5KSA9PiBpdGVtLnRpbWVzbG90SWQgPT09IHNsb3QuaWRcblx0XHQpO1xuXHRcdGlmIChmb3VuZFNjaGVkdWxlKSB7XG5cdFx0XHRzbG90LmVuYWJsZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmb3VuZFNjaGVkdWxlO1xuXHR9XG5cblx0YnVpbGRUaW1lVGFibGVCYXNpYygpIHtcblx0XHRjb25zb2xlLmxvZygnYnVpbGRUaW1lVGFibGVCYXNpYy4uLi4nKTtcblx0XHR0aGlzLmRheXNPZldlZWsuZm9yRWFjaCgoZGF5OiBzdHJpbmcpID0+IHtcblx0XHRcdHRoaXMudGltZVRhYmxlRGF0YVtkYXldID0ge1xuXHRcdFx0XHRpdGVtczogW10sXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0aW5pdFRpbWV0YWJsZVNsb3QoKSB7XG5cdFx0Y29uc3QgYWxsdGltZXNsb3Q6IElUaW1ldGFibGVTbG90W10gPSB0aGlzLnRpbWVzbG90cztcblx0XHR0aGlzLmRheXNPZldlZWsuZm9yRWFjaCgoZGF5KSA9PiB7XG5cdFx0XHRjb25zdCBzbG90c09mRGF5ID0gYWxsdGltZXNsb3QuZmlsdGVyKFxuXHRcdFx0XHQoc2xvdDogYW55KSA9PiBzbG90LmRheU9mV2VlayA9PT0gZGF5ICYmIHNsb3QudGltZVNoaWZ0ID09PSB0aGlzLnRpbWVTaGlmdFxuXHRcdFx0KTtcblx0XHRcdHRoaXMudGltZVRhYmxlRGF0YVtkYXldID0ge1xuXHRcdFx0XHRpdGVtczogXy5vcmRlckJ5KHNsb3RzT2ZEYXksIFtcIm9yZGVyXCJdKSxcblx0XHRcdH07XG5cdFx0XHRjb25zdCBtYXhMZXNzaW9uID0gdGhpcy5nZXRNYXhsZXNzaW9uT3JkZXIoc2xvdHNPZkRheSk7XG5cdFx0XHR0aGlzLnNsb3ROdW1PZkRheSA9IFsuLi5BcnJheShtYXhMZXNzaW9uKS5rZXlzKCldO1xuXHRcdH0pO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcy50aW1lVGFibGVEYXRhOlwiLCB0aGlzLnRpbWVUYWJsZURhdGEpO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcy5zbG90TnVtT2ZEYXk6XCIsIHRoaXMuc2xvdE51bU9mRGF5KVxuXG5cdH1cblxuXHRnZXRTbG90QnlPcmRlcihkYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnRpbWVUYWJsZURhdGFbZGF5XS5pdGVtcy5maWx0ZXIoXG5cdFx0XHQoaXRlbTogSVRpbWV0YWJsZVNsb3QpID0+IGl0ZW0ub3JkZXIgPT09IGluZGV4XG5cdFx0KTtcblx0fVxuXG5cdG9uU2VsZWN0VGltZVNsb3QodGltZXNsb3Q6IElUaW1ldGFibGVTbG90KSB7XG5cdFx0aWYgKCF0aW1lc2xvdC5lbmFibGVkKSByZXR1cm47XG5cdFx0aWYgKCEhdGltZXNsb3Q/LmlkICYmIHRpbWVzbG90LmRldGFpbHMpIHtcblx0XHRcdHRpbWVzbG90LmRldGFpbHMuYXZhaWxhYmxlID0gIXRpbWVzbG90LmRldGFpbHMuYXZhaWxhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aW1lc2xvdC5kZXRhaWxzID0ge1xuXHRcdFx0XHRpZDogbnVsbCxcblx0XHRcdFx0dGltZXNsb3RJZDogdGltZXNsb3QuaWQsXG5cdFx0XHRcdHNjaG9vbFllYXI6IGdldEFjdGl2ZVllYXIoKSxcblx0XHRcdFx0c2VtZXN0ZXI6IHRoaXMuc2VtZXN0ZXIsXG5cdFx0XHRcdGdyYWRlQ29kZTogdGhpcy5ncmFkZUNvZGUsXG5cdFx0XHRcdGF2YWlsYWJsZTogdHJ1ZSxcblx0XHRcdFx0cmVhc29uT2ZVbmF2YWlsYWJpbGl0eTogbnVsbCxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmRhdGFDaGFuZ2VkLmVtaXQodGhpcy50aW1lVGFibGVEYXRhKTtcblx0XHR9LCA1MDApO1xuXG5cdH1cblxuXHRuZ09uRGVzdHJveSgpOiB2b2lkIHsgfVxufVxuIiwiPGRpdiBjbGFzcz1cInRpbWV0YWJsZS11aVwiPlxuICA8ZGl2IGNsYXNzPVwidGltZXRhYmxlLXVpLXByZWZpeC1jb2x1bW4gdGltZXRhYmxlLXVpLWRheS1jb2x1bW5cIj5cbiAgICA8ZGl2IGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1jb2x1bW4tbGVzc29uXCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1sZXNzb24taXRlbVwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBvcmRlciBvZiBzbG90TnVtT2ZEYXk7IGluZGV4IGFzIGlcIlxuICAgICAgPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuPlRp4bq/dCB7eyBvcmRlciArIDEgfX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IGRheSBvZiBvYmplY3RLZXlzKHRpbWVUYWJsZURhdGEpXCJcbiAgICBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktY29sdW1uXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWNvbHVtbi1sZXNzb25cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LW5hbWVcIj5cbiAgICAgICAge3sgZGF5IHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHNsb3ROdW0gb2Ygc2xvdE51bU9mRGF5XCJcbiAgICAgID5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGltZXNsb3Qgb2YgZ2V0U2xvdEJ5T3JkZXIoZGF5LCBzbG90TnVtICsgMSlcIlxuICAgICAgICAgICAgW2F0dHIudGltZXRhYmxlX3Nsb3RfX2lkXT1cInRpbWVzbG90LmlkXCJcbiAgICAgICAgICAgIFthdHRyLnRpbWV0YWJsZV9zbG90X190aW1lX3NoaWZ0XT1cInRpbWVzbG90LnRpbWVTaGlmdFwiXG4gICAgICAgICAgICBbYXR0ci50aW1ldGFibGVfc2xvdF9fb3JkZXJdPVwidGltZXNsb3Qub3JkZXJcIlxuICAgICAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtX19pdGVtXCJcbiAgICAgICAgICAgIFtjbGFzcy5zbG90X2lzX2Rpc2FibGVkXT1cIiF0aW1lc2xvdC5lbmFibGVkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvblNlbGVjdFRpbWVTbG90KHRpbWVzbG90KVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInRpbWVzbG90Py5kZXRhaWxzPy5hdmFpbGFibGVcIlxuICAgICAgICAgICAgICBjbGFzcz1cInNlbGVjdGVkX3RpbWVfc2xvdFwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktbGVzc29uLWl0ZW1fX2l0ZW0gc2xvdF9pc19kaXNhYmxlZFwiXG4gICAgICAgICAgICAqbmdJZj1cIiFnZXRTbG90QnlPcmRlcihkYXksIHNsb3ROdW0gKyAxKT8ubGVuZ3RoXCJcbiAgICAgICAgICA+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=