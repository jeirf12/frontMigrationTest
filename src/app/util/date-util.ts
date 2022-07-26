import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Horario } from '../model/entity/horario';
import { TwoObjects } from '../model/two-objects';

export class DateUtil {

    public static structureToDate(value?: NgbDateStruct): Date {
        if (value) {
            return new Date(value.year, value.month - 1, value.day);
        } else {
            return null;
        }
    }

    public static dateToStructure(date?: Date): NgbDateStruct {
        if (date) {
            const value = new Date(date);
            return {
                day: value.getDate(),
                month: value.getMonth() + 1,
                year: value.getFullYear()
            };
        } else {
            return null;
        }

    }

    public static ngbToDate(value?: NgbDate): Date {
        if (value) {
            return new Date(value.year, value.month - 1, value.day);
        } else {
            return null;
        }

    }

    public static dateToNgb(date?: Date): NgbDate {
        if (date) {
            const value = new Date(date);
            return new NgbDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
        } else {
            return null;
        }
    }

    public static getEdad(date: Date): number {
        const today = new Date();
        const birthday = new Date(date);
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }
        return age;
    }

    public static getMonthFullName(month: number): string {
        switch (Number(month)) {
            case 1:
                return 'Enero';
            case 2:
                return 'Febrero';
            case 3:
                return 'Marzo';
            case 4:
                return 'Abril';
            case 5:
                return 'Mayo';
            case 6:
                return 'Junio';
            case 7:
                return 'Julio';
            case 8:
                return 'Agosto';
            case 9:
                return 'Septiembre';
            case 10:
                return 'Octubre';
            case 11:
                return 'Noviembre';
            case 12:
                return 'Diciembre';
        }
    }

    public static getMonthRange(year: number, month: number): TwoObjects<Date, Date> {
        const result = new TwoObjects<Date, Date>();
        result.first = new Date(year, month, 1);
        result.second = new Date(year, Number(month) + 1, 1);
        return result;
    }

    public static getYearRange(year: number): TwoObjects<Date, Date> {
        const result = new TwoObjects<Date, Date>();
        result.first = new Date(year, 0, 1);
        result.second = new Date(Number(year) + 1, 0, 1);
        return result;
    }

    public static getSemesterRange(semester: string): TwoObjects<Date, Date> {
        const split = semester.split("-");
        const year = Number(split[0]);
        const month = split[1] == "I" ? 0 : 6;
        const result = new TwoObjects<Date, Date>();
        result.first = new Date(year, month, 1);
        result.second = new Date(year, Number(month) + 6, 1);
        return result;
    }

}