import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import * as i1 from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ngx-drag-drop';
import { DndModule } from 'ngx-drag-drop';
import * as i4 from 'ng-select2';
import { NgSelect2Module } from 'ng-select2';
import * as i5 from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import * as i6 from '@ngx-translate/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

class TimetableService {
    constructor() { }
}
TimetableService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TimetableService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

const TimetableConstants = {
    TIMETABLE_EDIT_MODE: {
        ON: 'ON',
        OFF: 'OFF'
    }
};

class TimetableComponent {
    constructor(fb) {
        this.fb = fb;
        this.objectKeys = Object.keys;
        this.SEMESTERS = {
            FIRST: 'FIRST',
            SECOND: 'SECOND',
            ALL: 'ALL'
        };
        this.semesters = Object.keys(this.SEMESTERS);
        this.solverStatusMessage = null;
        this.destroyed$ = new Subject();
        this.MODE = {
            EDIT: 'edit',
            NEW: 'new'
        };
        this.isEnableAdjustMode = false;
        this.onRemoveAction = new EventEmitter();
        this.onDropAcion = new EventEmitter();
        this.onCellClickAction = new EventEmitter();
        this.onCreateNewLession = new EventEmitter();
        this.activeLessions = [];
        this.activeTeachManagement = undefined;
        this.daysOfWeek = [
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
        ];
        this.draggable = {
            data: null,
            effectAllowed: "all",
            disable: true,
            handle: false
        };
        this.timeTableData = {};
        this.lessons = ["LOADING", "LOADING", "LOADING", "LOADING", "LOADING", "LOADING"];
        this.isAutoUpdateClassIds = false;
        this.isInProgress = new EventEmitter();
        this.selectedClasses = [];
        this.classListSelectedDefault = [];
        this.teachManagements = [];
        this.dayLessionSlots = [...Array(5).keys()];
        this.CALLBACK_TIME = 5000;
        this.checkingGenerateProgresser = null;
        this.isDisabledPlanning = false;
        this.slotNumOfDay = [];
        this.showProgressLoading = false;
        this.TIMETABLE_EDIT_MODE = TimetableConstants.TIMETABLE_EDIT_MODE;
        this.FORM_FIELDS = {
            MAJOR: 'majorCode',
            TUTOR: 'tutorUuid',
            CLASS_ID: 'classId',
            SEMESTER: 'semester'
        };
        this.form = this.fb.group({
            [this.FORM_FIELDS.MAJOR]: [{ value: -1 }],
            [this.FORM_FIELDS.TUTOR]: [{ value: '' }]
        });
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d, _e, _f;
        if ((_a = changes['timeShift']) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.buildTimeTableBasic();
        }
        if ((_b = changes['timeslots']) === null || _b === void 0 ? void 0 : _b.currentValue) {
            this.initTimetableSlot();
        }
        if ((_c = changes['isEnableAdjustMode']) === null || _c === void 0 ? void 0 : _c.currentValue) {
            this.draggable = Object.assign(Object.assign({}, this.draggable), { disable: !this.isEnableAdjustMode });
        }
        if (((_d = changes['classes']) === null || _d === void 0 ? void 0 : _d.currentValue) && !((_e = changes['timeslots']) === null || _e === void 0 ? void 0 : _e.firstChange)) {
            this.resetTimeTable();
        }
        if ((_f = changes['lessions']) === null || _f === void 0 ? void 0 : _f.currentValue) {
            this.mappingDataToTable();
        }
        console.log("changes:", changes);
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
    }
    getMaxlessionOrder(timeSlot) {
        var _a;
        return ((_a = _.maxBy(timeSlot, (o) => { return o.order; })) === null || _a === void 0 ? void 0 : _a.order) || 10;
    }
    buildTimeTableBasic() {
        this.daysOfWeek.forEach((day) => {
            this.timeTableData[day] = {
                items: [],
            };
        });
    }
    mappingDataToTable() {
        this.daysOfWeek.forEach((day) => {
            const slotsOfDay = this.lessions.filter((slot) => slot.dayOfWeek === day);
            this.timeTableData[day] = {
                items: _.orderBy(slotsOfDay, ["order"]),
            };
        });
        console.log("this.timeTableData:", this.timeTableData);
    }
    getLessonByOrder(day, index, timeShift) {
        return this.timeTableData[day].items.filter((item) => {
            const found = item.order === index && (item === null || item === void 0 ? void 0 : item.timeShift) === timeShift;
            return found;
        });
    }
    resetTimeTable() {
        this.buildTimeTableBasic();
    }
    onClickTutorName(tutor) {
        window.open(`/tutors/${tutor.uuid}`, '_blank');
    }
    getActiveGradeName() {
        var _a;
        return (_a = _.find(this.grades, (item) => item.code === this.filterForm['gradeCode'])) === null || _a === void 0 ? void 0 : _a.title;
    }
    onDrop(event, day, slotNum, timeShift) {
        const dropSlot = this.getSlot(day, slotNum);
        const dropLession = {
            "id": _.get(event, "data.details.id", 0),
            "schoolYear": _.get(event, "data.details.schoolYear", 0),
            "semester": _.get(event, "data.details.semester", 0),
            timeslotId: dropSlot.id,
            timetableProblemId: this.timetableProblemId,
            "tutor": _.get(event, "data.details.tutor", null),
            "major": _.get(event, "data.details.major", null),
            "clazz": _.get(event, "data.details.clazz", null),
        };
        const payload = [dropLession];
        let currentLession = _.get(this.getLessonByOrder(day, slotNum, timeShift), "0", null);
        if (currentLession) {
            currentLession = {
                "id": _.get(currentLession, "details.id", 0),
                "schoolYear": _.get(currentLession, "details.schoolYear", 0),
                "semester": _.get(currentLession, "details.semester", 0),
                timeslotId: _.get(event, "data.details.timeslot.id", 0),
                timetableProblemId: this.timetableProblemId,
                "tutor": _.get(currentLession, "details.tutor", null),
                "major": _.get(currentLession, "details.major", null),
                "clazz": _.get(currentLession, "details.clazz", null),
            };
            payload.push(currentLession);
        }
        this.onDropAcion.emit(payload);
    }
    changeOnOffSwitch($event) {
        this.isEnableAdjustMode = $event.target.checked;
        this.draggable = Object.assign(Object.assign({}, this.draggable), { disable: !this.isEnableAdjustMode });
    }
    getSlot(day, order) {
        const slot = this.timeslots.find((slot) => slot.dayOfWeek === day && slot.timeShift === this.timeShift && slot.order === order);
        return slot;
    }
    getSlotByOrder(day, index) {
        return this.timeTableData[day].items.filter((item) => item.order === index);
    }
    onCellClick(p, day, slotNum, timeShift) {
        var _a;
        this.activeSlot = this.getSlot(day, slotNum);
        if (!this.isEnableAdjustMode || !this.activeSlot.enabled)
            return;
        this.activeLessions = this.getLessonByOrder(day, slotNum, timeShift);
        p.open();
        if (!((_a = this.activeLessions) === null || _a === void 0 ? void 0 : _a.length)) {
            this.mode = this.MODE.NEW;
            this.activeFormDialog = p;
            this.onCellClickAction.emit(this.activeLessions);
        }
        else {
            this.mode = this.MODE.EDIT;
        }
    }
    onSelectTeachManagement($event) {
        this.activeTeachManagement = this.majorsTranscript.find((item) => item.code === $event);
    }
    getMajor() {
        return {
            "code": _.get(this.activeTeachManagement, 'teachManagement.majorCode', 0),
            "name": _.get(this.activeTeachManagement, 'teachManagement.majorName', 0),
        };
    }
    getTutor() {
        return {
            "uuid": _.get(this.activeTeachManagement, 'teachManagement.tutorUuid', 0),
            "name": _.get(this.activeTeachManagement, 'teachManagement.tutorName', 0)
        };
    }
    getClazz() {
        return {
            "code": _.get(this.activeTeachManagement, 'teachManagement.classId', 0),
            "name": _.get(this.activeTeachManagement, 'teachManagement.className', 0),
            "gradeCode": _.get(this.activeTeachManagement, 'teachManagement.gradeCode', 0),
        };
    }
    createNewLession() {
        var _a;
        if (!this.form.valid)
            return;
        const payload = {
            "schoolYear": this.schoolYear,
            "semester": this.filterForm.semester,
            "timeslotId": (_a = this.activeSlot) === null || _a === void 0 ? void 0 : _a.id,
            "timetableProblemId": this.timetableProblemId,
            "tutor": this.getTutor(),
            "major": this.getMajor(),
            "clazz": this.getClazz()
        };
        this.onCreateNewLession.emit(payload);
    }
    get isAssignedTutor() {
        var _a, _b;
        return this.activeTeachManagement && ((_b = (_a = this.activeTeachManagement) === null || _a === void 0 ? void 0 : _a.teachManagement) === null || _b === void 0 ? void 0 : _b.tutorName);
    }
    get isUnAssignedTutor() {
        var _a, _b;
        return this.activeTeachManagement && !((_b = (_a = this.activeTeachManagement) === null || _a === void 0 ? void 0 : _a.teachManagement) === null || _b === void 0 ? void 0 : _b.tutorName);
    }
    closeForm() {
        this.activeFormDialog.close();
    }
    removeLessionFromCell() {
        const activeLession = this.activeLessions[0];
        this.onRemoveAction.emit(activeLession);
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.resetTimeTable();
    }
}
TimetableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableComponent, deps: [{ token: i1.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
TimetableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TimetableComponent, selector: "tada-ngx-timetable", inputs: { filterForm: "filterForm", timeShift: "timeShift", schoolYear: "schoolYear", type: "type", grades: "grades", lessions: "lessions", timetableProblemId: "timetableProblemId", majorsTranscript: "majorsTranscript", classes: "classes", timeslots: "timeslots", isEnableAdjustMode: "isEnableAdjustMode", popUpContent: "popUpContent" }, outputs: { onRemoveAction: "onRemoveAction", onDropAcion: "onDropAcion", onCellClickAction: "onCellClickAction", onCreateNewLession: "onCreateNewLession", isInProgress: "isInProgress" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"timetable-ui\" [class.in-processing]=\"showProgressLoading\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let lessonNum of dayLessionSlots\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ lessonNum + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day | translate }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item timetable-ui-day-lesson-item-value\"\n        *ngFor=\"let slotNum of dayLessionSlots\"\n      >\n        <div\n          dndDropzone\n          [class.tbl-editing-mode]=\"isEnableAdjustMode\"\n          (dndDrop)=\"onDrop($event, day, slotNum + 1, timeShift)\"\n          [ngbPopover]=\"popContent\"\n          [autoClose]=\"'outside'\"\n          triggers=\"manual\"\n          #p=\"ngbPopover\"\n          placement=\"auto\"\n          class=\"timetable-ui-cell-container\"\n          [class.empty-lession]=\"\n            !getLessonByOrder(day, slotNum + 1, timeShift)?.length\n          \"\n          [class.is-disabled]=\"!getSlot(day, slotNum + 1)?.enabled\"\n          (click)=\"onCellClick(p, day, slotNum + 1, timeShift)\"\n        >\n          <div class=\"dnd-dropzone-slot\" dndPlaceholderRef></div>\n          <div\n            *ngFor=\"let lesson of getLessonByOrder(day, slotNum + 1, timeShift)\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [dndDraggable]=\"lesson\"\n            [dndDisableIf]=\"draggable.disable\"\n          >\n            <div>\n              <h4>{{ lesson?.details?.major.name }}</h4>\n              <p\n                class=\"sub-text-one\"\n                (click)=\"onClickTutorName(lesson.details.tutor)\"\n              >\n                <ng-container *ngIf=\"type === 'TUTOR'\">{{\n                  lesson?.details?.clazz.name\n                }}</ng-container>\n                <ng-container *ngIf=\"type === 'CLASS'\">{{\n                  lesson?.details?.tutor.name\n                }}</ng-container>\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\" *ngIf=\"mode == MODE.NEW\">\n    <div class=\"mb-1\">\n      <div class=\"schedule-pop-content-header\">\n        <span>Th\u00EAm ti\u1EBFt m\u1EDBi</span>\n      </div>\n      <div class=\"schedule-pop-content-line mb-2\"></div>\n      <form [formGroup]=\"form\" class=\"form\" (ngSubmit)=\"createNewLession()\">\n        <div class=\"form-group\">\n          <label class=\"required\">{{ \"major.major\" | translate }}</label>\n\n          <div class=\"d-block\">\n            <ng-select2\n              formControlName=\"majorCode\"\n              class=\"w-100\"\n              width=\"100%\"\n              (valueChanged)=\"onSelectTeachManagement($event)\"\n            >\n              <option value=\"-1\">{{ \"pleaseSelect\" | translate }}</option>\n              <option\n                *ngFor=\"let item of majorsTranscript\"\n                value=\"{{ item.code }}\"\n              >\n                {{ item.title }}\n              </option>\n            </ng-select2>\n          </div>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"isAssignedTutor\">\n          <p class=\"sub-text-one\">\n            Gi\u00E1o vi\u00EAn: {{ activeTeachManagement?.teachManagement?.tutorName }}\n          </p>\n        </div>\n\n        <p class=\"unassigned_tutor\" *ngIf=\"isUnAssignedTutor\">\n          Gi\u00E1o vi\u00EAn: Ch\u01B0a \u0111\u01B0\u1EE3c ph\u00E2n c\u00F4ng.\n        </p>\n\n        <div class=\"buttons\">\n          <button\n            type=\"submit\"\n            [disabled]=\"!isAssignedTutor\"\n            color=\"primary\"\n            class=\"edit-button\"\n          >\n            {{ \"saveChange\" | translate }}\n          </button>\n          <button\n            color=\"primary\"\n            type=\"button\"\n            (click)=\"closeForm()\"\n            class=\"action-btn\"\n          >\n            {{ \"cancel\" | translate }}\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"mode == MODE.EDIT\">\n    <button\n      type=\"button\"\n      (click)=\"removeLessionFromCell()\"\n      color=\"danger\"\n      class=\"edit-button\"\n    >\n      Xo\u00E1 ti\u1EBFt\n    </button>\n  </ng-container>\n</ng-template>\n\n", styles: [".timetable-ui-prefix-column{width:65px!important}.timetable-ui-prefix-column span{display:block;width:60px}.timetable-ui-prefix-column .timetable-ui-day-lesson-item{font-weight:600;font-size:12px;line-height:12px;position:relative;text-align:center;color:#737579}.timetable-ui-prefix-column .timetable-ui-day-lesson-item:first-child{border-top:none;margin-top:40px}.timetable-ui-prefix-column .timetable-ui-day-lesson-item:first-child>div{border-top:none}.timetable-ui{flex:1;display:flex;flex-direction:row;justify-content:space-between;border:1px solid #e2e8f0;overflow:inherit!important}.timetable-ui .timetable-ui-day-name{text-align:center;padding:10px 8px;width:100%;border:1px solid #e2e8f0}.timetable-ui .timetable-ui-day-column{width:100%}.timetable-ui.in-processing .timetable-ui-day-lesson-item-value .timetable-ui-day-lesson-item__item{opacity:.5}.timetable-ui .timetable-ui-day-column-lesson{display:flex;flex-direction:column}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item{position:relative}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div{padding:10px;height:58px;display:block;line-height:20px;width:100%;text-align:center;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div:hover{border-color:#999}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div.is-disabled{cursor:not-allowed!important}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div div.timetable-ui-day-lesson-item__item h4{width:100%;overflow:hidden;text-overflow:ellipsis;margin:0;color:#000;font-weight:700;font-size:12px}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div div.timetable-ui-day-lesson-item__item .sub-text-one{font-weight:400;font-size:12px;cursor:pointer;line-height:20px;margin:0;text-align:center;font-style:normal;color:#737579}.timetable__academic-year .mat-select{width:200px!important;margin:0 10px}.timetable__grade .mat-select{width:120px!important;margin:0 10px}.timetable__class .multi-select{margin:0 10px;width:200px!important}.timetable__semester--options{width:120px!important}.timetable__semester .mat-select{width:120px!important;margin:0 10px}h4.timeshift_title{font-size:14px;color:#2c2c2c;font-weight:600;text-align:center;margin:0;display:block}.timetable-timeshift-section-heading{padding:16px 8px;color:#737579;margin:0;display:block;align-items:center;background:#f5f5f5;display:flex;flex-direction:row;justify-content:space-between}.timetable-timeshift-section-heading .custom-control-label{font-weight:500;font-size:14px;letter-spacing:.01em;color:#000}.dnd-dropzone-slot{border:1px orangered solid;border-radius:5px;padding:15px;position:absolute;inset:5px}.tbl-editing-mode.empty-lession{background-color:#f8f8f8}.tbl-editing-mode.empty-lession:hover{background-color:#fafafa}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #eaeaea;margin-bottom:5px;padding-bottom:16px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:14px;line-height:16px;text-align:center;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px;color:#000}::ng-deep .popover p{color:#000}::ng-deep .popover p.sub-text-one{color:#737579}::ng-deep .popover p.unassigned_tutor{font-weight:400;font-size:14px;line-height:18px;color:#d93a3a}::ng-deep .popover .remove-icon{height:auto;width:18px;line-height:0}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.DndDraggableDirective, selector: "[dndDraggable]", inputs: ["dndDraggable", "dndEffectAllowed", "dndType", "dndDraggingClass", "dndDraggingSourceClass", "dndDraggableDisabledClass", "dndDragImageOffsetFunction", "dndDisableIf", "dndDisableDragIf"], outputs: ["dndStart", "dndDrag", "dndEnd", "dndMoved", "dndCopied", "dndLinked", "dndCanceled"] }, { kind: "directive", type: i3.DndDropzoneDirective, selector: "[dndDropzone]", inputs: ["dndDropzone", "dndEffectAllowed", "dndAllowExternal", "dndHorizontal", "dndDragoverClass", "dndDropzoneDisabledClass", "dndDisableIf", "dndDisableDropIf"], outputs: ["dndDragover", "dndDrop"] }, { kind: "directive", type: i3.DndPlaceholderRefDirective, selector: "[dndPlaceholderRef]" }, { kind: "component", type: i4.NgSelect2Component, selector: "ng-select2", inputs: ["data", "placeholder", "dropdownParent", "allowClear", "value", "width", "disabled", "id", "class", "required", "options"], outputs: ["valueChanged"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i5.NgbPopover, selector: "[ngbPopover]", inputs: ["animation", "autoClose", "ngbPopover", "popoverTitle", "placement", "popperOptions", "triggers", "positionTarget", "container", "disablePopover", "popoverClass", "openDelay", "closeDelay"], outputs: ["shown", "hidden"], exportAs: ["ngbPopover"] }, { kind: "pipe", type: i6.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'tada-ngx-timetable', template: "<div class=\"timetable-ui\" [class.in-processing]=\"showProgressLoading\">\n  <div class=\"timetable-ui-prefix-column timetable-ui-day-column\">\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div\n        class=\"timetable-ui-day-lesson-item\"\n        *ngFor=\"let lessonNum of dayLessionSlots\"\n      >\n        <div>\n          <span>Ti\u1EBFt {{ lessonNum + 1 }}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div\n    *ngFor=\"let day of objectKeys(timeTableData)\"\n    class=\"timetable-ui-day-column\"\n  >\n    <div class=\"timetable-ui-day-column-lesson\">\n      <div class=\"timetable-ui-day-name\">\n        {{ day | translate }}\n      </div>\n      <div\n        class=\"timetable-ui-day-lesson-item timetable-ui-day-lesson-item-value\"\n        *ngFor=\"let slotNum of dayLessionSlots\"\n      >\n        <div\n          dndDropzone\n          [class.tbl-editing-mode]=\"isEnableAdjustMode\"\n          (dndDrop)=\"onDrop($event, day, slotNum + 1, timeShift)\"\n          [ngbPopover]=\"popContent\"\n          [autoClose]=\"'outside'\"\n          triggers=\"manual\"\n          #p=\"ngbPopover\"\n          placement=\"auto\"\n          class=\"timetable-ui-cell-container\"\n          [class.empty-lession]=\"\n            !getLessonByOrder(day, slotNum + 1, timeShift)?.length\n          \"\n          [class.is-disabled]=\"!getSlot(day, slotNum + 1)?.enabled\"\n          (click)=\"onCellClick(p, day, slotNum + 1, timeShift)\"\n        >\n          <div class=\"dnd-dropzone-slot\" dndPlaceholderRef></div>\n          <div\n            *ngFor=\"let lesson of getLessonByOrder(day, slotNum + 1, timeShift)\"\n            class=\"timetable-ui-day-lesson-item__item\"\n            [dndDraggable]=\"lesson\"\n            [dndDisableIf]=\"draggable.disable\"\n          >\n            <div>\n              <h4>{{ lesson?.details?.major.name }}</h4>\n              <p\n                class=\"sub-text-one\"\n                (click)=\"onClickTutorName(lesson.details.tutor)\"\n              >\n                <ng-container *ngIf=\"type === 'TUTOR'\">{{\n                  lesson?.details?.clazz.name\n                }}</ng-container>\n                <ng-container *ngIf=\"type === 'CLASS'\">{{\n                  lesson?.details?.tutor.name\n                }}</ng-container>\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<ng-template #popContent>\n  <div class=\"schedule-pop-content\" *ngIf=\"mode == MODE.NEW\">\n    <div class=\"mb-1\">\n      <div class=\"schedule-pop-content-header\">\n        <span>Th\u00EAm ti\u1EBFt m\u1EDBi</span>\n      </div>\n      <div class=\"schedule-pop-content-line mb-2\"></div>\n      <form [formGroup]=\"form\" class=\"form\" (ngSubmit)=\"createNewLession()\">\n        <div class=\"form-group\">\n          <label class=\"required\">{{ \"major.major\" | translate }}</label>\n\n          <div class=\"d-block\">\n            <ng-select2\n              formControlName=\"majorCode\"\n              class=\"w-100\"\n              width=\"100%\"\n              (valueChanged)=\"onSelectTeachManagement($event)\"\n            >\n              <option value=\"-1\">{{ \"pleaseSelect\" | translate }}</option>\n              <option\n                *ngFor=\"let item of majorsTranscript\"\n                value=\"{{ item.code }}\"\n              >\n                {{ item.title }}\n              </option>\n            </ng-select2>\n          </div>\n        </div>\n\n        <div class=\"form-group\" *ngIf=\"isAssignedTutor\">\n          <p class=\"sub-text-one\">\n            Gi\u00E1o vi\u00EAn: {{ activeTeachManagement?.teachManagement?.tutorName }}\n          </p>\n        </div>\n\n        <p class=\"unassigned_tutor\" *ngIf=\"isUnAssignedTutor\">\n          Gi\u00E1o vi\u00EAn: Ch\u01B0a \u0111\u01B0\u1EE3c ph\u00E2n c\u00F4ng.\n        </p>\n\n        <div class=\"buttons\">\n          <button\n            type=\"submit\"\n            [disabled]=\"!isAssignedTutor\"\n            color=\"primary\"\n            class=\"edit-button\"\n          >\n            {{ \"saveChange\" | translate }}\n          </button>\n          <button\n            color=\"primary\"\n            type=\"button\"\n            (click)=\"closeForm()\"\n            class=\"action-btn\"\n          >\n            {{ \"cancel\" | translate }}\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n\n  <ng-container *ngIf=\"mode == MODE.EDIT\">\n    <button\n      type=\"button\"\n      (click)=\"removeLessionFromCell()\"\n      color=\"danger\"\n      class=\"edit-button\"\n    >\n      Xo\u00E1 ti\u1EBFt\n    </button>\n  </ng-container>\n</ng-template>\n\n", styles: [".timetable-ui-prefix-column{width:65px!important}.timetable-ui-prefix-column span{display:block;width:60px}.timetable-ui-prefix-column .timetable-ui-day-lesson-item{font-weight:600;font-size:12px;line-height:12px;position:relative;text-align:center;color:#737579}.timetable-ui-prefix-column .timetable-ui-day-lesson-item:first-child{border-top:none;margin-top:40px}.timetable-ui-prefix-column .timetable-ui-day-lesson-item:first-child>div{border-top:none}.timetable-ui{flex:1;display:flex;flex-direction:row;justify-content:space-between;border:1px solid #e2e8f0;overflow:inherit!important}.timetable-ui .timetable-ui-day-name{text-align:center;padding:10px 8px;width:100%;border:1px solid #e2e8f0}.timetable-ui .timetable-ui-day-column{width:100%}.timetable-ui.in-processing .timetable-ui-day-lesson-item-value .timetable-ui-day-lesson-item__item{opacity:.5}.timetable-ui .timetable-ui-day-column-lesson{display:flex;flex-direction:column}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item{position:relative}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div{padding:10px;height:58px;display:block;line-height:20px;width:100%;text-align:center;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div:hover{border-color:#999}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div.is-disabled{cursor:not-allowed!important}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div div.timetable-ui-day-lesson-item__item h4{width:100%;overflow:hidden;text-overflow:ellipsis;margin:0;color:#000;font-weight:700;font-size:12px}.timetable-ui .timetable-ui-day-column-lesson>.timetable-ui-day-lesson-item>div div.timetable-ui-day-lesson-item__item .sub-text-one{font-weight:400;font-size:12px;cursor:pointer;line-height:20px;margin:0;text-align:center;font-style:normal;color:#737579}.timetable__academic-year .mat-select{width:200px!important;margin:0 10px}.timetable__grade .mat-select{width:120px!important;margin:0 10px}.timetable__class .multi-select{margin:0 10px;width:200px!important}.timetable__semester--options{width:120px!important}.timetable__semester .mat-select{width:120px!important;margin:0 10px}h4.timeshift_title{font-size:14px;color:#2c2c2c;font-weight:600;text-align:center;margin:0;display:block}.timetable-timeshift-section-heading{padding:16px 8px;color:#737579;margin:0;display:block;align-items:center;background:#f5f5f5;display:flex;flex-direction:row;justify-content:space-between}.timetable-timeshift-section-heading .custom-control-label{font-weight:500;font-size:14px;letter-spacing:.01em;color:#000}.dnd-dropzone-slot{border:1px orangered solid;border-radius:5px;padding:15px;position:absolute;inset:5px}.tbl-editing-mode.empty-lession{background-color:#f8f8f8}.tbl-editing-mode.empty-lession:hover{background-color:#fafafa}.schedule-pop-content{width:301px;padding:6px}.schedule-pop-content h4{font-weight:700;font-size:12px;margin-bottom:5px;line-height:22px;color:#000;padding-bottom:8px;border-bottom:1px solid #eaeaea}.schedule-pop-content .schedule-pop-content-header{border-bottom:1px solid #eaeaea;margin-bottom:5px;padding-bottom:16px}.schedule-pop-content .schedule-pop-content-header span{font-style:normal;font-weight:700;font-size:14px;line-height:16px;text-align:center;letter-spacing:.01em;color:#000}.schedule-pop-content .schedule-pop-content-links{display:flex;flex-direction:row;gap:16px}.schedule-pop-content .schedule-pop-content-links span{font-weight:700;white-space:nowrap;font-size:12px;cursor:pointer;line-height:22px;text-decoration-line:underline;color:#1e88e5}.schedule-pop-content .class-online-label{font-weight:700;font-size:12px;line-height:22px;color:#999;text-decoration-line:underline}.schedule-pop-content .class-online-label.is-on{cursor:pointer;color:#1e88e5!important}::ng-deep .popover{max-width:498px;background:#ffffff;border:none;box-shadow:0 8px 12px #091e4226,0 0 1px #091e424f;border-radius:5px;color:#000}::ng-deep .popover p{color:#000}::ng-deep .popover p.sub-text-one{color:#737579}::ng-deep .popover p.unassigned_tutor{font-weight:400;font-size:14px;line-height:18px;color:#d93a3a}::ng-deep .popover .remove-icon{height:auto;width:18px;line-height:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.UntypedFormBuilder }]; }, propDecorators: { filterForm: [{
                type: Input
            }], timeShift: [{
                type: Input
            }], schoolYear: [{
                type: Input
            }], type: [{
                type: Input
            }], grades: [{
                type: Input
            }], lessions: [{
                type: Input
            }], timetableProblemId: [{
                type: Input
            }], majorsTranscript: [{
                type: Input
            }], classes: [{
                type: Input
            }], timeslots: [{
                type: Input
            }], isEnableAdjustMode: [{
                type: Input
            }], onRemoveAction: [{
                type: Output
            }], onDropAcion: [{
                type: Output
            }], onCellClickAction: [{
                type: Output
            }], popUpContent: [{
                type: Input
            }], onCreateNewLession: [{
                type: Output
            }], isInProgress: [{
                type: Output
            }] } });

function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class TimetableModule {
}
TimetableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimetableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, declarations: [TimetableComponent], imports: [HttpClientModule,
        CommonModule,
        DndModule,
        NgSelect2Module,
        ReactiveFormsModule,
        NgbPopoverModule, i6.TranslateModule], exports: [TimetableComponent] });
TimetableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, imports: [HttpClientModule,
        CommonModule,
        DndModule,
        NgSelect2Module,
        ReactiveFormsModule,
        NgbPopoverModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TimetableComponent
                    ],
                    imports: [
                        HttpClientModule,
                        CommonModule,
                        DndModule,
                        NgSelect2Module,
                        ReactiveFormsModule,
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
                        TimetableComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of timetable
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TimetableComponent, TimetableModule, TimetableService, createTranslateLoader };
//# sourceMappingURL=timetable.mjs.map
