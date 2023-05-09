import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tada-ngx-calendar-navigation',
  templateUrl: './calendar-navi.component.html',
  styleUrls: ['./calendar-navi.component.scss'],
})
export class TadaNgxCalendarUICalendarNaviComponent implements OnInit {
  @Output() naviChange = new EventEmitter();
  public _viewName = 'week';
  @Input('viewName') set viewName(value: any) {
    this._viewName = value;
  }
  constructor() {}

  ngOnInit(): void {}
  onClickNavi(action: string) {
    this.naviChange.emit(action);
  }

  getViewType() {
    return `scheduleWorking.${this._viewName}`;
  }
}
