import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TadaNgxCalendarCellComponent } from './components/timetable-cell/timetable-cell.component';
import { TadaNgxCalendarUICalendarNaviComponent } from './components/calendar-navi/calendar-navi.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from './truncate.pipe';
import { TadaNgxCalendarHelper } from './calendar.helper';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
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
})
export class CalendarModule { }
