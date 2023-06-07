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
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export class TimetableModule {
}
TimetableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TimetableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, declarations: [TimetableComponent], imports: [HttpClientModule,
        CommonModule,
        DndModule,
        NgSelect2Module,
        ReactiveFormsModule,
        NgbPopoverModule, i1.TranslateModule], exports: [TimetableComponent] });
TimetableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, imports: [HttpClientModule,
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
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TimetableModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWV0YWJsZS9zcmMvbGliL3RpbWV0YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFckQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBQWdCO0lBQ3BELE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQTBCRCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQXRCeEIsa0JBQWtCLGFBR2xCLGdCQUFnQjtRQUVoQixZQUFZO1FBQ1osU0FBUztRQUNULGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsZ0JBQWdCLGlDQVVoQixrQkFBa0I7NkdBR1QsZUFBZSxZQW5CeEIsZ0JBQWdCO1FBRWhCLFlBQVk7UUFDWixTQUFTO1FBQ1QsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsZUFBZSxDQUFDLE9BQU8sQ0FBQztZQUN0QixNQUFNLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUNuQjtTQUNGLENBQUM7MkZBTU8sZUFBZTtrQkF4QjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjt3QkFFaEIsWUFBWTt3QkFDWixTQUFTO3dCQUNULGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGVBQWUsQ0FBQyxPQUFPLENBQUM7NEJBQ3RCLE1BQU0sRUFBRTtnQ0FDTixPQUFPLEVBQUUsZUFBZTtnQ0FDeEIsVUFBVSxFQUFFLHFCQUFxQjtnQ0FDakMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDOzZCQUNuQjt5QkFDRixDQUFDO3FCQUNIO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQkFBa0I7cUJBQ25CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWV0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vdGltZXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nYlBvcG92ZXJNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlSHR0cExvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2h0dHAtbG9hZGVyJztcbmltcG9ydCB7IERuZE1vZHVsZSB9IGZyb20gJ25neC1kcmFnLWRyb3AnO1xuaW1wb3J0IHsgTmdTZWxlY3QyTW9kdWxlIH0gZnJvbSAnbmctc2VsZWN0Mic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVHJhbnNsYXRlTG9hZGVyKGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgcmV0dXJuIG5ldyBUcmFuc2xhdGVIdHRwTG9hZGVyKGh0dHAsICcuL2Fzc2V0cy9pMThuLycsICcuanNvbicpO1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUaW1ldGFibGVDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIERuZE1vZHVsZSxcbiAgICBOZ1NlbGVjdDJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ2JQb3BvdmVyTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxvYWRlcjoge1xuICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgIHVzZUZhY3Rvcnk6IGNyZWF0ZVRyYW5zbGF0ZUxvYWRlcixcbiAgICAgICAgZGVwczogW0h0dHBDbGllbnRdXG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRpbWV0YWJsZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWV0YWJsZU1vZHVsZSB7IH1cbiJdfQ==