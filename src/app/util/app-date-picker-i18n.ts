import {TranslationWidth} from '@angular/common';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from './date-util';

export class AppDatePickerI18n implements NgbDatepickerI18n {

    getWeekLabel(): string {
        return "";
    }
    getMonthLabel(date: NgbDateStruct): string {
        return date.month.toString();
    }
    getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
        return weekday.toString() + " " + width.toString();
    }
    getWeekdayShortName(weekday: number): string {
        switch (weekday) {
            case 1:
                return 'Lun';
            case 2:
                return 'Mar';
            case 3:
                return 'Mie';
            case 4:
                return 'Jue';
            case 5:
                return 'Vie';
            case 6:
                return 'Sab';
            case 7:
                return 'Dom';
        }
    }

    getMonthShortName(month: number, year?: number): string {
        return this.getMonthFullName(month, year).substring(0, 3);
    }

    getMonthFullName(month: number, year?: number): string {
        return DateUtil.getMonthFullName(month);
    }

    getDayAriaLabel(date: import("@ng-bootstrap/ng-bootstrap").NgbDateStruct): string {
        return date.day.toString();
    }

    getDayNumerals(date: import("@ng-bootstrap/ng-bootstrap").NgbDateStruct): string {
        return date.day.toString();
    }

    getWeekNumerals(weekNumber: number): string {
        return weekNumber.toString();
    }

    getYearNumerals(year: number): string {
        return year.toString();
    }

}
