import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getActiveYear } from '../shared/helper';
import { Constants } from '../shared/constant';
import * as _ from "lodash";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TimeSlotScheduleConfigComponent {
    constructor() {
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
        this.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' }
        ];
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
TimeSlotScheduleConfigComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TimeSlotScheduleConfigComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TimeSlotScheduleConfigComponent, selector: "tada-ngx-time-slot-schedule-config", inputs: { gradeCode: "gradeCode", timeShift: "timeShift", timeslots: "timeslots", availabilities: "availabilities" }, outputs: { dataChanged: "dataChanged" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"timetable-ui\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let order of slotNumOfDay; index as i\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ order + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let slotNum of slotNumOfDay\"\n      >\n        <div>\n            \n          <div\n            *ngFor=\"let timeslot of getSlotByOrder(day, slotNum + 1)\"\n            [attr.timetable_slot__id]=\"timeslot.id\"\n            [attr.timetable_slot__time_shift]=\"timeslot.timeShift\"\n            [attr.timetable_slot__order]=\"timeslot.order\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [class.slot_is_disabled]=\"!timeslot.enabled\"\n            (click)=\"onSelectTimeSlot(timeslot)\"\n          >\n            <div\n              [class.active]=\"timeslot?.details?.available\"\n              class=\"selected_time_slot\"\n            ></div>\n          </div>\n\n          <div\n            class=\"timetable-ui-day-lesson-item__item slot_is_disabled\"\n            *ngIf=\"!getSlotByOrder(day, slotNum + 1)?.length\"\n          ></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tada-ngx-time-slot-schedule-config', template: "<div class=\"timetable-ui\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let order of slotNumOfDay; index as i\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ order + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let slotNum of slotNumOfDay\"\n      >\n        <div>\n            \n          <div\n            *ngFor=\"let timeslot of getSlotByOrder(day, slotNum + 1)\"\n            [attr.timetable_slot__id]=\"timeslot.id\"\n            [attr.timetable_slot__time_shift]=\"timeslot.timeShift\"\n            [attr.timetable_slot__order]=\"timeslot.order\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [class.slot_is_disabled]=\"!timeslot.enabled\"\n            (click)=\"onSelectTimeSlot(timeslot)\"\n          >\n            <div\n              [class.active]=\"timeslot?.details?.available\"\n              class=\"selected_time_slot\"\n            ></div>\n          </div>\n\n          <div\n            class=\"timetable-ui-day-lesson-item__item slot_is_disabled\"\n            *ngIf=\"!getSlotByOrder(day, slotNum + 1)?.length\"\n          ></div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { gradeCode: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7O0FBTzVCLE1BQU0sT0FBTywrQkFBK0I7SUEwQjNDO1FBekJPLGVBQVUsR0FBVyxhQUFhLEVBQUUsQ0FBQztRQUM1QyxlQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQVUsRUFBRSxDQUFDO1FBQ3RCLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFDbkIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLGNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxlQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxhQUFRLEdBQVcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDM0Msa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsNkJBQXdCLEdBQVUsRUFBRSxD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LEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLFVBQVUsRUFBRSxhQUFhLEVBQUU7Z0JBQzNCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixTQUFTLEVBQUUsSUFBSTtnQkFDZixzQkFBc0IsRUFBRSxJQUFJO2FBQzVCLENBQUM7U0FDRjtRQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVQsQ0FBQztJQUVELFdBQVcsS0FBVyxDQUFDOzs0SEF4SFgsK0JBQStCO2dIQUEvQiwrQkFBK0IsOFBDWDVDLHNtREFtREE7MkZEeENhLCtCQUErQjtrQkFMM0MsU0FBUzsrQkFDRSxvQ0FBb0M7MEVBa0J0QyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0ksU0FBUztzQkFBakIsS0FBSztnQkFDRSxjQUFjO3NCQUF0QixLQUFLO2dCQUNJLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldEFjdGl2ZVllYXIgfSBmcm9tICcuLi9zaGFyZWQvaGVscGVyJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL3NoYXJlZC9jb25zdGFudCc7XG5pbXBvcnQgeyBJQXZhaWxhYmlsaXR5LCBJVGltZXRhYmxlU2xvdCB9IGZyb20gJy4vbW9kdWxlL3R5cGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhZGEtbmd4LXRpbWUtc2xvdC1zY2hlZHVsZS1jb25maWcnLFxuICB0ZW1wbGF0ZVVybDogJ3RpbWUtc2xvdC1zY2hlZHVsZS1jb25maWcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTbG90U2NoZWR1bGVDb25maWdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cdHB1YmxpYyBzY2hvb2xZZWFyOiBudW1iZXIgPSBnZXRBY3RpdmVZZWFyKCk7XG5cdG9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblx0YWxsdGltZXNsb3Q6IGFueVtdID0gW107XG5cdGNsYXNzTGlzdDogYW55W10gPSBbXTtcblx0bWFqb3JzOiBhbnlbXSA9IFtdO1xuXHRhY3RpdmVDbGFzc0luZGV4OiBudW1iZXIgPSAwO1xuXHRzZW1lc3RlcnMgPSBPYmplY3Qua2V5cyhDb25zdGFudHMuU0VNRVNURVJTKTtcblx0cHJpdmF0ZSBkYXlzT2ZXZWVrID0gQ29uc3RhbnRzLldFRUtEQVlTO1xuXHRzZW1lc3Rlcjogc3RyaW5nID0gQ29uc3RhbnRzLlNFTUVTVEVSUy5BTEw7XG5cdHRpbWVUYWJsZURhdGE6IGFueSA9IHt9O1xuXHRjbGFzc0xpc3RTZWxlY3RlZERlZmF1bHQ6IGFueVtdID0gW107XG5cdHNsb3ROdW1PZkRheTogYW55W10gPSBbXTtcblx0dHV0b3JVdWlkOiBhbnkgPSBudWxsO1xuXHRASW5wdXQoKSBncmFkZUNvZGUgPSAnJztcblx0QElucHV0KCkgdGltZVNoaWZ0ID0gJyc7XG4gIEBJbnB1dCgpIHRpbWVzbG90czogYW55W10gPSBbXTtcblx0QElucHV0KCkgYXZhaWxhYmlsaXRpZXM6IElBdmFpbGFiaWxpdHlbXSA9IFtdO1xuXHRAT3V0cHV0KCkgZGF0YUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBpdGVtcyA9IFtcbiAgICB7IGlkOiAxLCBuYW1lOiAnSXRlbSAxJyB9LFxuICAgIHsgaWQ6IDIsIG5hbWU6ICdJdGVtIDInIH0sXG4gICAgeyBpZDogMywgbmFtZTogJ0l0ZW0gMycgfVxuICBdO1xuICBcblx0Y29uc3RydWN0b3IoKSB7fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuYnVpbGRUaW1lVGFibGVCYXNpYygpO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgICBpZiAoY2hhbmdlcz8udGltZXNsb3RzPy5jdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMuaW5pdFRpbWV0YWJsZVNsb3QoKTtcblx0XHR9XG5cblx0XHRpZiAoY2hhbmdlcyAmJiBjaGFuZ2VzPy5hdmFpbGFiaWxpdGllcz8uY3VycmVudFZhbHVlKSB7XG5cdFx0XHRPYmplY3QudmFsdWVzKHRoaXMudGltZVRhYmxlRGF0YSkuZm9yRWFjaCgod2Vla2RheTogYW55KSA9PiB7XG5cdFx0XHRcdHdlZWtkYXkuaXRlbXMgPSB3ZWVrZGF5Lml0ZW1zLm1hcCgoc2xvdDogSVRpbWV0YWJsZVNsb3QpID0+ICh7XG5cdFx0XHRcdFx0Li4uc2xvdCxcblx0XHRcdFx0XHRkZXRhaWxzOiB0aGlzLmdldEF2YWlsYWJpbGl0aWVzKHNsb3QpLFxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuZGF0YUNoYW5nZWQuZW1pdCh0aGlzLnRpbWVUYWJsZURhdGEpO1xuXHRcdH1cblxuXHR9XG5cblx0Z2V0TWF4bGVzc2lvbk9yZGVyKHRpbWVTbG90OiBhbnlbXSkge1xuXHRcdHJldHVybiBfLm1heEJ5KHRpbWVTbG90LCAobzogYW55KSA9PiB7IHJldHVybiBvLm9yZGVyOyB9KT8ub3JkZXIgfHwgMTA7XG5cdH1cblxuXHRnZXRBdmFpbGFiaWxpdGllcyhzbG90OiBJVGltZXRhYmxlU2xvdCkge1xuXHRcdGNvbnN0IGZvdW5kU2NoZWR1bGUgPSB0aGlzLmF2YWlsYWJpbGl0aWVzLmZpbmQoXG5cdFx0XHQoaXRlbTogSUF2YWlsYWJpbGl0eSkgPT4gaXRlbS50aW1lc2xvdElkID09PSBzbG90LmlkXG5cdFx0KTtcblx0XHRpZiAoZm91bmRTY2hlZHVsZSkge1xuXHRcdFx0c2xvdC5lbmFibGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm91bmRTY2hlZHVsZTtcblx0fVxuXG5cdGJ1aWxkVGltZVRhYmxlQmFzaWMoKSB7XG4gICAgY29uc29sZS5sb2coJ2J1aWxkVGltZVRhYmxlQmFzaWMuLi4uJyk7XG5cdFx0dGhpcy5kYXlzT2ZXZWVrLmZvckVhY2goKGRheTogc3RyaW5nKSA9PiB7XG5cdFx0XHR0aGlzLnRpbWVUYWJsZURhdGFbZGF5XSA9IHtcblx0XHRcdFx0aXRlbXM6IFtdLFxuXHRcdFx0fTtcblx0XHR9KTtcblx0fVxuXG5cdGluaXRUaW1ldGFibGVTbG90KCkge1xuXHRcdGNvbnN0IGFsbHRpbWVzbG90OiBJVGltZXRhYmxlU2xvdFtdID0gdGhpcy50aW1lc2xvdHM7XG5cdFx0dGhpcy5kYXlzT2ZXZWVrLmZvckVhY2goKGRheSkgPT4ge1xuXHRcdFx0Y29uc3Qgc2xvdHNPZkRheSA9IGFsbHRpbWVzbG90LmZpbHRlcihcblx0XHRcdFx0KHNsb3Q6IGFueSkgPT4gc2xvdC5kYXlPZldlZWsgPT09IGRheSAmJiBzbG90LnRpbWVTaGlmdCA9PT0gdGhpcy50aW1lU2hpZnRcblx0XHRcdCk7XG5cdFx0XHR0aGlzLnRpbWVUYWJsZURhdGFbZGF5XSA9IHtcblx0XHRcdFx0aXRlbXM6IF8ub3JkZXJCeShzbG90c09mRGF5LCBbXCJvcmRlclwiXSksXG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgbWF4TGVzc2lvbiA9IHRoaXMuZ2V0TWF4bGVzc2lvbk9yZGVyKHNsb3RzT2ZEYXkpO1xuXHRcdFx0dGhpcy5zbG90TnVtT2ZEYXkgPSBbLi4uQXJyYXkobWF4TGVzc2lvbikua2V5cygpXTtcblx0XHR9KTtcbiAgICBjb25zb2xlLmxvZyhcInRoaXMudGltZVRhYmxlRGF0YTpcIix0aGlzLnRpbWVUYWJsZURhdGEpO1xuICAgIGNvbnNvbGUubG9nKFwidGhpcy5zbG90TnVtT2ZEYXk6XCIsdGhpcy5zbG90TnVtT2ZEYXkpXG5cblx0fVxuXG5cdGdldFNsb3RCeU9yZGVyKGRheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMudGltZVRhYmxlRGF0YVtkYXldLml0ZW1zLmZpbHRlcihcblx0XHRcdChpdGVtOiBJVGltZXRhYmxlU2xvdCkgPT4gaXRlbS5vcmRlciA9PT0gaW5kZXhcblx0XHQpO1xuXHR9XG5cblx0b25TZWxlY3RUaW1lU2xvdCh0aW1lc2xvdDogSVRpbWV0YWJsZVNsb3QpIHtcblx0XHRpZiAoIXRpbWVzbG90LmVuYWJsZWQpIHJldHVybjtcblx0XHRpZiAoISF0aW1lc2xvdD8uaWQgJiYgdGltZXNsb3QuZGV0YWlscykge1xuXHRcdFx0dGltZXNsb3QuZGV0YWlscy5hdmFpbGFibGUgPSAhdGltZXNsb3QuZGV0YWlscy5hdmFpbGFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRpbWVzbG90LmRldGFpbHMgPSB7XG5cdFx0XHRcdGlkOiBudWxsLFxuXHRcdFx0XHR0aW1lc2xvdElkOiB0aW1lc2xvdC5pZCxcblx0XHRcdFx0c2Nob29sWWVhcjogZ2V0QWN0aXZlWWVhcigpLFxuXHRcdFx0XHRzZW1lc3RlcjogdGhpcy5zZW1lc3Rlcixcblx0XHRcdFx0Z3JhZGVDb2RlOiB0aGlzLmdyYWRlQ29kZSxcblx0XHRcdFx0YXZhaWxhYmxlOiB0cnVlLFxuXHRcdFx0XHRyZWFzb25PZlVuYXZhaWxhYmlsaXR5OiBudWxsLFxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuZGF0YUNoYW5nZWQuZW1pdCh0aGlzLnRpbWVUYWJsZURhdGEpO1xuXHRcdH0sIDUwMCk7XG5cblx0fVxuXG5cdG5nT25EZXN0cm95KCk6IHZvaWQgeyB9XG59XG4iLCI8ZGl2IGNsYXNzPVwidGltZXRhYmxlLXVpXCI+XG4gIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktcHJlZml4LWNvbHVtbiB0aW1ldGFibGUtdWktZGF5LWNvbHVtblwiPlxuICAgIDxkaXYgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWNvbHVtbi1sZXNzb25cIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IG9yZGVyIG9mIHNsb3ROdW1PZkRheTsgaW5kZXggYXMgaVwiXG4gICAgICA+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4+VGnhur90IHt7IG9yZGVyICsgMSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXZcbiAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIG9iamVjdEtleXModGltZVRhYmxlRGF0YSlcIlxuICAgIGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1jb2x1bW5cIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktY29sdW1uLWxlc3NvblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktbmFtZVwiPlxuICAgICAgICB7eyBkYXkgfX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cInRpbWV0YWJsZS11aS1kYXktbGVzc29uLWl0ZW1cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgc2xvdE51bSBvZiBzbG90TnVtT2ZEYXlcIlxuICAgICAgPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRpbWVzbG90IG9mIGdldFNsb3RCeU9yZGVyKGRheSwgc2xvdE51bSArIDEpXCJcbiAgICAgICAgICAgIFthdHRyLnRpbWV0YWJsZV9zbG90X19pZF09XCJ0aW1lc2xvdC5pZFwiXG4gICAgICAgICAgICBbYXR0ci50aW1ldGFibGVfc2xvdF9fdGltZV9zaGlmdF09XCJ0aW1lc2xvdC50aW1lU2hpZnRcIlxuICAgICAgICAgICAgW2F0dHIudGltZXRhYmxlX3Nsb3RfX29yZGVyXT1cInRpbWVzbG90Lm9yZGVyXCJcbiAgICAgICAgICAgIGNsYXNzPVwidGltZXRhYmxlLXVpLWRheS1sZXNzb24taXRlbV9faXRlbVwiXG4gICAgICAgICAgICBbY2xhc3Muc2xvdF9pc19kaXNhYmxlZF09XCIhdGltZXNsb3QuZW5hYmxlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25TZWxlY3RUaW1lU2xvdCh0aW1lc2xvdClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJ0aW1lc2xvdD8uZGV0YWlscz8uYXZhaWxhYmxlXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3RlZF90aW1lX3Nsb3RcIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJ0aW1ldGFibGUtdWktZGF5LWxlc3Nvbi1pdGVtX19pdGVtIHNsb3RfaXNfZGlzYWJsZWRcIlxuICAgICAgICAgICAgKm5nSWY9XCIhZ2V0U2xvdEJ5T3JkZXIoZGF5LCBzbG90TnVtICsgMSk/Lmxlbmd0aFwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19