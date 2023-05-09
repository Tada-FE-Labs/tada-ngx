import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TadaNgxCalendarCellComponent } from './components/timetable-cell/timetable-cell.component';
import { TadaNgxCalendarUICalendarNaviComponent } from './components/calendar-navi/calendar-navi.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from './truncate.pipe';
import { TadaNgxCalendarHelper } from './calendar.helper';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class CalendarModule {
}
CalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, declarations: [CalendarComponent,
        TadaNgxCalendarCellComponent,
        TadaNgxCalendarUICalendarNaviComponent,
        TruncatePipe], imports: [HttpClientModule,
        CommonModule,
        NgbPopoverModule, i1.TranslateModule], exports: [CalendarComponent,
        TadaNgxCalendarCellComponent,
        TadaNgxCalendarUICalendarNaviComponent] });
CalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, providers: [TadaNgxCalendarHelper], imports: [HttpClientModule,
        CommonModule,
        NgbPopoverModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CalendarModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2FsZW5kYXIvc3JjL2xpYi9jYWxlbmRhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDcEcsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDNUcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFFMUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQWdCO0lBQ3BELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQTRCRCxNQUFNLE9BQU8sY0FBYzs7MkdBQWQsY0FBYzs0R0FBZCxjQUFjLGlCQXhCdkIsaUJBQWlCO1FBQ2pCLDRCQUE0QjtRQUM1QixzQ0FBc0M7UUFDdEMsWUFBWSxhQUdaLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osZ0JBQWdCLGlDQVVoQixpQkFBaUI7UUFDakIsNEJBQTRCO1FBQzVCLHNDQUFzQzs0R0FJN0IsY0FBYyxhQUZkLENBQUMscUJBQXFCLENBQUMsWUFoQmhDLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDdEIsTUFBTSxFQUFFO2dCQUNOLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixVQUFVLEVBQUUscUJBQXFCO2dCQUNqQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDbkI7U0FDRixDQUFDOzJGQVNPLGNBQWM7a0JBMUIxQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixpQkFBaUI7d0JBQ2pCLDRCQUE0Qjt3QkFDNUIsc0NBQXNDO3dCQUN0QyxZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixlQUFlLENBQUMsT0FBTyxDQUFDOzRCQUN0QixNQUFNLEVBQUU7Z0NBQ04sT0FBTyxFQUFFLGVBQWU7Z0NBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7Z0NBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQzs2QkFDbkI7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQiw0QkFBNEI7d0JBQzVCLHNDQUFzQztxQkFDdkM7b0JBQ0QsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7aUJBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZUh0dHBMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9odHRwLWxvYWRlcic7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IFRhZGFOZ3hDYWxlbmRhckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZXRhYmxlLWNlbGwvdGltZXRhYmxlLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFRhZGFOZ3hDYWxlbmRhclVJQ2FsZW5kYXJOYXZpQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLW5hdmkvY2FsZW5kYXItbmF2aS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdiUG9wb3Zlck1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCB7IFRydW5jYXRlUGlwZSB9IGZyb20gJy4vdHJ1bmNhdGUucGlwZSc7XG5pbXBvcnQgeyBUYWRhTmd4Q2FsZW5kYXJIZWxwZXIgfSBmcm9tICcuL2NhbGVuZGFyLmhlbHBlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2xhdGVMb2FkZXIoaHR0cDogSHR0cENsaWVudCkge1xuICByZXR1cm4gbmV3IFRyYW5zbGF0ZUh0dHBMb2FkZXIoaHR0cCwgJy4vYXNzZXRzL2kxOG4vJywgJy5qc29uJyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIFRhZGFOZ3hDYWxlbmRhckNlbGxDb21wb25lbnQsXG4gICAgVGFkYU5neENhbGVuZGFyVUlDYWxlbmRhck5hdmlDb21wb25lbnQsXG4gICAgVHJ1bmNhdGVQaXBlXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ2JQb3BvdmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGVuZGFyQ29tcG9uZW50LFxuICAgIFRhZGFOZ3hDYWxlbmRhckNlbGxDb21wb25lbnQsXG4gICAgVGFkYU5neENhbGVuZGFyVUlDYWxlbmRhck5hdmlDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbVGFkYU5neENhbGVuZGFySGVscGVyXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vZHVsZSB7IH1cbiJdfQ==