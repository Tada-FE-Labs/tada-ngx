import { NgModule } from '@angular/core';
import { TimetableComponent } from './timetable.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DndModule } from 'ngx-drag-drop';
import { NgSelect2Module } from 'ng-select2';
import { ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
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
})
export class TimetableModule { }
