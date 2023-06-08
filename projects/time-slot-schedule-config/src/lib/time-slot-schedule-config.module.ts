import { NgModule } from '@angular/core';
import { TimeSlotScheduleConfigComponent } from './time-slot-schedule-config.component';
import { CommonModule } from '@angular/common';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    TimeSlotScheduleConfigComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  exports: [
    TimeSlotScheduleConfigComponent
  ]
})
export class TimeSlotScheduleConfigModule { }
