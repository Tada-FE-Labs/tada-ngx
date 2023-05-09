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
  assignments: any[] = [];
  @Input() lessionUnit: any;
  @Input() userType: any;
  @Output() onChangeOnOffSwitch = new EventEmitter<any>();
  @Output() scheduleOpened = new EventEmitter<any>();
  constructor(
    private router: Router,
    private tadaNgxCalendarHelper: TadaNgxCalendarHelper
  ) {
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  onTitleClick() {
    this.scheduleOpened.emit(this.schedule);
  }

  createAssignment() {}

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
      
  }
}
