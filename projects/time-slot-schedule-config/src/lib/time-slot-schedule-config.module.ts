import { NgModule } from '@angular/core';
import { TimeSlotScheduleConfigComponent } from './time-slot-schedule-config.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TimeSlotScheduleConfigComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  exports: [
    TimeSlotScheduleConfigComponent
  ]
})
export class TimeSlotScheduleConfigModule { }
