import { NgModule } from '@angular/core';
import { TimeSlotScheduleConfigComponent } from './time-slot-schedule-config.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class TimeSlotScheduleConfigModule {
}
TimeSlotScheduleConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimeSlotScheduleConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, declarations: [TimeSlotScheduleConfigComponent], imports: [HttpClientModule,
        BrowserModule,
        CommonModule, i1.TranslateModule], exports: [TimeSlotScheduleConfigComponent] });
TimeSlotScheduleConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, imports: [HttpClientModule,
        BrowserModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TimeSlotScheduleConfigComponent
                    ],
                    imports: [
                        HttpClientModule,
                        BrowserModule,
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQy9ELE9BQU8sRUFBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFDckUsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQWdCO0lBQ3BELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQXFCRCxNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBbEJyQywrQkFBK0IsYUFHL0IsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixZQUFZLGlDQVVaLCtCQUErQjswSEFHdEIsNEJBQTRCLFlBZnJDLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsWUFBWTtRQUNaLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDdEIsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixVQUFVLEVBQUUscUJBQXFCO2dCQUNqQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDckI7U0FDSixDQUFDOzJGQU1TLDRCQUE0QjtrQkFwQnhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLCtCQUErQjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGVBQWUsQ0FBQyxPQUFPLENBQUM7NEJBQ3RCLE1BQU0sRUFBRTtnQ0FDSixPQUFPLEVBQUUsZUFBZTtnQ0FDeEIsVUFBVSxFQUFFLHFCQUFxQjtnQ0FDakMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDOzZCQUNyQjt5QkFDSixDQUFDO3FCQUNEO29CQUNELE9BQU8sRUFBRTt3QkFDUCwrQkFBK0I7cUJBQ2hDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVTbG90U2NoZWR1bGVDb25maWdDb21wb25lbnQgfSBmcm9tICcuL3RpbWUtc2xvdC1zY2hlZHVsZS1jb25maWcuY29tcG9uZW50JztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1RyYW5zbGF0ZUh0dHBMb2FkZXJ9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyJztcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVHJhbnNsYXRlTG9hZGVyKGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuL2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVGltZVNsb3RTY2hlZHVsZUNvbmZpZ0NvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICBsb2FkZXI6IHtcbiAgICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICAgIGRlcHM6IFtIdHRwQ2xpZW50XVxuICAgICAgfVxuICB9KVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVGltZVNsb3RTY2hlZHVsZUNvbmZpZ0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVTbG90U2NoZWR1bGVDb25maWdNb2R1bGUgeyB9XG4iXX0=