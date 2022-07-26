import { Horario } from '../model/entity/horario';
import { CurrentHorario } from '../model/entity/current-horario';

export class HorarioUtil {

    public static getWeekDays(): string[] {
        return ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    }

    public static getHours(init: number, end: number): number[] {
        const result: number[] = [];
        for (var i = init; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    public static getStringHour(hour: number): string {
        switch (true) {
            case hour < 10:
                return "0" + hour + ":00 a.m."
            case hour < 12:
                return hour + ":00 a.m."
            case hour == 12:
                return "12:00 p.m."
            default:
                return "0" + (hour - 12) + ":00 p.m."
        }
    }

    public static getHorarioCompleto(horario: Horario): string {
        return this.getWeekDays()[horario.dia - 1] + " (" +
            this.getStringHour(horario.horaInicio) + " - " +
            this.getStringHour(horario.horaFin) + ")";
    }

    public static getCurrentHorario(horario: Horario[]): CurrentHorario[] {
        const result: CurrentHorario[] = [];
        for (var i = 0; i < 13; i++) {
            result.push(new CurrentHorario(i + 8));
        }
        horario.forEach(h => {
            for (var i = h.horaInicio; i < h.horaFin; i++) {
                const index = result.findIndex(ch => ch.hora == i);
                switch (h.dia) {
                    case 1:
                        result[index].lunes = h.grupo.nombre;
                        result[index].lunesColor = h.color;
                        break;
                    case 2:
                        result[index].martes = h.grupo.nombre;
                        result[index].martesColor = h.color;
                        break;
                    case 3:
                        result[index].miercoles = h.grupo.nombre;
                        result[index].miercolesColor = h.color;
                        break;
                    case 4:
                        result[index].jueves = h.grupo.nombre;
                        result[index].juevesColor = h.color;
                        break;
                    case 5:
                        result[index].viernes = h.grupo.nombre;
                        result[index].viernesColor = h.color;
                        break;
                }
            }
        });
        return result;
    }

}