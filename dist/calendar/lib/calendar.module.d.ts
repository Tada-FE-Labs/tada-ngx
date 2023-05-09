import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as i0 from "@angular/core";
import * as i1 from "./calendar.component";
import * as i2 from "./components/timetable-cell/timetable-cell.component";
import * as i3 from "./components/calendar-navi/calendar-navi.component";
import * as i4 from "./truncate.pipe";
import * as i5 from "@angular/common/http";
import * as i6 from "@angular/common";
import * as i7 from "@ng-bootstrap/ng-bootstrap";
import * as i8 from "@ngx-translate/core";
export declare function createTranslateLoader(http: HttpClient): TranslateHttpLoader;
export declare class CalendarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CalendarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CalendarModule, [typeof i1.CalendarComponent, typeof i2.TadaNgxCalendarCellComponent, typeof i3.TadaNgxCalendarUICalendarNaviComponent, typeof i4.TruncatePipe], [typeof i5.HttpClientModule, typeof i6.CommonModule, typeof i7.NgbPopoverModule, typeof i8.TranslateModule], [typeof i1.CalendarComponent, typeof i2.TadaNgxCalendarCellComponent, typeof i3.TadaNgxCalendarUICalendarNaviComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CalendarModule>;
}
