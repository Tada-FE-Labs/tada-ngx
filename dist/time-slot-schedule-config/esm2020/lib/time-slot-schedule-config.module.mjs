import { NgModule } from '@angular/core';
import { TimeSlotScheduleConfigComponent } from './time-slot-schedule-config.component';
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
        CommonModule, i1.TranslateModule], exports: [TimeSlotScheduleConfigComponent] });
TimeSlotScheduleConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimeSlotScheduleConfigModule, imports: [HttpClientModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnL3NyYy9saWIvdGltZS1zbG90LXNjaGVkdWxlLWNvbmZpZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7OztBQUNyRSxNQUFNLFVBQVUscUJBQXFCLENBQUMsSUFBZ0I7SUFDcEQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBb0JELE1BQU0sT0FBTyw0QkFBNEI7O3lIQUE1Qiw0QkFBNEI7MEhBQTVCLDRCQUE0QixpQkFqQnJDLCtCQUErQixhQUcvQixnQkFBZ0I7UUFDaEIsWUFBWSxpQ0FVWiwrQkFBK0I7MEhBR3RCLDRCQUE0QixZQWRyQyxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDdEIsTUFBTSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixVQUFVLEVBQUUscUJBQXFCO2dCQUNqQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDckI7U0FDSixDQUFDOzJGQU1TLDRCQUE0QjtrQkFuQnhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLCtCQUErQjtxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixlQUFlLENBQUMsT0FBTyxDQUFDOzRCQUN0QixNQUFNLEVBQUU7Z0NBQ0osT0FBTyxFQUFFLGVBQWU7Z0NBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7Z0NBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQzs2QkFDckI7eUJBQ0osQ0FBQztxQkFDRDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsK0JBQStCO3FCQUNoQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lU2xvdFNjaGVkdWxlQ29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lLXNsb3Qtc2NoZWR1bGUtY29uZmlnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtUcmFuc2xhdGVIdHRwTG9hZGVyfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9odHRwLWxvYWRlcic7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7VHJhbnNsYXRlTG9hZGVyLCBUcmFuc2xhdGVNb2R1bGV9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcihodHRwOiBIdHRwQ2xpZW50KSB7XG4gIHJldHVybiBuZXcgVHJhbnNsYXRlSHR0cExvYWRlcihodHRwLCAnLi9hc3NldHMvaTE4bi8nLCAnLmpzb24nKTtcbn1cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRpbWVTbG90U2NoZWR1bGVDb25maWdDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICAgIHByb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXG4gICAgICB9XG4gIH0pXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUaW1lU2xvdFNjaGVkdWxlQ29uZmlnQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVNsb3RTY2hlZHVsZUNvbmZpZ01vZHVsZSB7IH1cbiJdfQ==