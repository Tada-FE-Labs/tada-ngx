import { TranslateService } from '@ngx-translate/core';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TadaNgxCalendarHelper } from '../../calendar.helper';
import { UserType } from '../../constants';

@Component({
  selector: 'timetable-cell',
  templateUrl: './timetable-cell.component.html',
  styleUrls: ['./timetable-cell.component.scss'],
})
export class TadaNgxCalendarCellComponent implements OnInit, OnChanges {
  @Input() schedule: any;
  @ViewChild('switchOffline') switchOffline!: ElementRef<HTMLInputElement>;
  userTypeEnum = UserType;
  @Input() lessionUnit: any;
  @Input() assignments: any[] = [];
  @Input() userType: any;
  @Input() isBOSide: any;
  @Output() onChangeOnOffSwitch = new EventEmitter<any>();
  @Output() scheduleOpened = new EventEmitter<any>();
  constructor(
    private router: Router,
    private tadaNgxCalendarHelper: TadaNgxCalendarHelper
  ) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void { }

  onTitleClick() {
    this.assignments = [];
    this.scheduleOpened.emit(this.schedule);
  }

  createAssignment() {
    window.open(
      `/tutor/create-assignment?scheduleId=${this.schedule.details.id}&classId=${this.schedule.details.classId}`,
      '_blank'
    );
  }

  getShortDesc(data: string) {
    return this.tadaNgxCalendarHelper.truncateWords(data, 15);
  }

  getShortTitle(data: string) {
    return this.tadaNgxCalendarHelper.truncateWords(data, 10);
  }

  onClickToJoinClassOnline() {
    if (!!this.schedule?.details?.online && !!this.schedule?.details?.joinUrl) {
      window.open(this.schedule?.details?.joinUrl, '_blank');
    }
  }

  async changeOnOffSwitch($event: any) {
    this.onChangeOnOffSwitch.emit($event);
  }

  onClickAssignment(item: any) {
    window.open(
      `/assignment-detail/${item.id}`,
      '_blank'
    );
  }
}
