import { ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TadaNgxCalendarHelper } from '../../calendar.helper';
import { UserType } from '../../constants';
import * as i0 from "@angular/core";
export declare class TadaNgxCalendarCellComponent implements OnInit, OnChanges {
    private router;
    private tadaNgxCalendarHelper;
    schedule: any;
    switchOffline: ElementRef<HTMLInputElement>;
    userType: UserType;
    userTypeEnum: typeof UserType;
    assignments: any[];
    constructor(router: Router, tadaNgxCalendarHelper: TadaNgxCalendarHelper);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onTitleClick(): void;
    createAssignment(): void;
    getShortDesc(data: string): string;
    getShortTitle(data: string): string;
    onClickToJoinClassOnline(): void;
    changeOnOffSwitch($event: any): Promise<void>;
    onClickAssignment(item: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TadaNgxCalendarCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TadaNgxCalendarCellComponent, "timetable-cell", never, { "schedule": "schedule"; }, {}, never, never, false, never>;
}
