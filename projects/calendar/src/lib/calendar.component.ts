import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';
import {
  TIMETABLE_CHANGE_DIRECTIONS,
  weekDayLabels,
} from './constants';
import { CalendarType } from './typings';
import { TadaNgxCalendarHelper } from './calendar.helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tada-ngx-calendar',
  templateUrl: `calendar.component.html`,
  styleUrls: [
    'calendar.component.scss'
  ]
})
export class CalendarComponent implements OnChanges, DoCheck {

  lessionNumOfDay = [...Array(5).keys()];

  @Input() startRowTitles: string[] = this.buildRowTitles();
  @Input() month: number = this.tadaNgxCalendarHelper.getCurrentMonth();
  @Input() year: number = this.tadaNgxCalendarHelper.getActiveYear();
  @Output() updated = new EventEmitter();
  @Input() data: any = null;
  @Input() hideHeader: any = null;
  @Input() timeShift: any = null;
  @Input() lessionUnit: any;
  @Input() userType: any;
  @Output() onChangeOnOffSwitch = new EventEmitter<any>();
  @Output() scheduleOpened = new EventEmitter<any>();

  daynamesOfWeek = [...weekDayLabels];
  timeTableData: any = {};
  objectKeys = Object.keys;
  weekdays: any[] = [];
  schedules: any = {};
  timeTableUIData: CalendarType = {};
  activeWeek: number = 0;
  totalWeekOfYear = 0;
  startDayOfWeek: any = null;

  constructor(
    private tadaNgxCalendarHelper: TadaNgxCalendarHelper,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('vn');
    this.buildRowTitles();
  }

  ngDoCheck(): void { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data']?.currentValue && changes['data']?.currentValue.length) {
      this.onChangeSchedules();
    }

    if (
      changes['month']?.firstChange &&
      changes['month'].currentValue &&
      changes['year']?.firstChange &&
      changes['year'].currentValue
    ) {
      this.activeWeek = this.tadaNgxCalendarHelper.currentWeekNumber();
      this.totalWeekOfYear = this.tadaNgxCalendarHelper.isoWeeksInYear(this.year);
      this.onChangeDirection(TIMETABLE_CHANGE_DIRECTIONS.MOVE_TODAY);
    } else if (changes['month']?.currentValue || changes['year']?.currentValue) {
      this.changeMonthYear();
    }

  }

  buildRowTitles() {
    return this.lessionNumOfDay.map(
      (_, index: number) => `Tiết ${index + 1}`
    );
  }

  onChangeDirection(action: string) {
    switch (action) {
      case TIMETABLE_CHANGE_DIRECTIONS.MOVE_PREV:
        this.goPrevious();
        break;
      case TIMETABLE_CHANGE_DIRECTIONS.MOVE_NEXT:
        this.goNext();
        break;
      case TIMETABLE_CHANGE_DIRECTIONS.MOVE_TODAY:
        this.today();
        break;
      default:
        return;
    }

    this.handleDatetime(this.startDayOfWeek);
  }

  canGoPrevious() {
    return this.activeWeek < this.totalWeekOfYear;
  }

  canGoNext() {
    return this.activeWeek < this.totalWeekOfYear;
  }

  goPrevious() {
    this.startDayOfWeek = this.tadaNgxCalendarHelper.subtract(
      this.startDayOfWeek
    );
  }

  goNext() {
    this.startDayOfWeek = this.tadaNgxCalendarHelper.add(this.startDayOfWeek);
  }

  today() {
    const currentWeek = this.tadaNgxCalendarHelper.currentWeekNumber();
    this.startDayOfWeek = this.tadaNgxCalendarHelper.dayStartOfWeek(
      currentWeek,
      this.tadaNgxCalendarHelper.getCurrentYear()
    );
  }

  handleDatetime(fromDate: string) {
    this.weekdays = this.tadaNgxCalendarHelper.getWeekDaysByDay(fromDate);
    this.activeWeek = this.tadaNgxCalendarHelper.getWeekNumberByDate(
      this.weekdays[0]
    );
    const [year, month] = fromDate.split('-');

    this.month = +month;
    this.year = +year;

    this.startDayOfWeek = this.tadaNgxCalendarHelper.dayStartOfWeek(
      this.activeWeek,
      this.year
    );
    this.timeTableUIData = {
      startDate: this.tadaNgxCalendarHelper.getTimeRange(this.weekdays[0])
        .timeStampUtc.startOfDay,
      endDate: this.tadaNgxCalendarHelper.getTimeRange(
        this.weekdays[this.weekdays.length - 1]
      ).timeStampUtc.endOfDay,
      weekNumber: this.activeWeek,
    };

    this.updated.emit(this.timeTableUIData);
    this.renderDayOfWeek();
  }

  changeMonthYear() {
    const newDate = `${this.year}-${this.month}-01`;
    this.handleDatetime(newDate);
  }

  generateBasicDate() {
    this.daynamesOfWeek.forEach((day: string) => {
      this.timeTableData[day] = {
        items: [],
      };
    });
  }

  renderDayOfWeek() {
    this.schedules = this.weekdays.reduce(
      (prev: any, current: any) => ({ ...prev, [current]: current }),
      {}
    );
  }

  onChangeSchedules() {
    this.weekdays.forEach((day) => {
      const slotsOfDay = this.data.filter((slot: any) =>
        this.tadaNgxCalendarHelper.inDay(slot.startTime, day)
      );
      this.timeTableData[day] = {
        items: _.orderBy(slotsOfDay, ['order']),
      };
			console.log(' this.timeTableData:',  this.timeTableData);
    });
  }

  getLessonByOrder(day: string, index: number) {
    const found = this.timeTableData[day]?.items.filter(
      (item: any) => item.order === index && item.timeShift == this.timeShift);
    return found;
  }
}
