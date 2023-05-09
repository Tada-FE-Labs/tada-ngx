import { OnInit, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TadaNgxCalendarUICalendarNaviComponent implements OnInit {
    naviChange: EventEmitter<any>;
    _viewName: string;
    set viewName(value: any);
    constructor();
    ngOnInit(): void;
    onClickNavi(action: string): void;
    getViewType(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TadaNgxCalendarUICalendarNaviComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TadaNgxCalendarUICalendarNaviComponent, "tada-ngx-calendar-navigation", never, { "viewName": "viewName"; }, { "naviChange": "naviChange"; }, never, never, false, never>;
}
