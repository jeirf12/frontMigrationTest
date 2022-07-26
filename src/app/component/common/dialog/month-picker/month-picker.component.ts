import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IconDefinition, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NgbDatepickerI18n, NgbDatepickerConfig, NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { DateUtil } from 'src/app/util/date-util';
import { TwoObjects } from 'src/app/model/two-objects';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class MonthPickerComponent implements OnInit {

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;

  @Input()
  date: NgbDateStruct;

  @Output()
  responseEvent: EventEmitter<TwoObjects<number, number>> = new EventEmitter<TwoObjects<number, number>>();

  year: number;
  month: number;
  isShowYears: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  
  ngOnInit(): void {
    this.year = this.date.year;
    this.month = this.date.month;
  }

  sendResponse() {
    const response = new TwoObjects<number, number>();
    response.first = this.year;
    response.second = this.month;
    this.responseEvent.emit(response);
    this.activeModal.dismiss();
  }

  selectMonth(month: number) {
    if (this.month != month) this.month = month;
  }

  selectYear(year: number) {
    if (this.year != year) this.year = year;
  }

  toggleShowYears() {
    this.isShowYears = !this.isShowYears;
  }

  getMonthFullName(month: number): string {
    return DateUtil.getMonthFullName(month);
  }

  get years(): number[] {
    const min = this.year - 4;
    const max = this.year + 4;
    const result: number[] = [];
    for (var i = min; i <= max; i++) {
      result.push(i);
    }
    return result;
  }

}
