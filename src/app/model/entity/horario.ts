import { Grupo } from './grupo';

export class Horario {

    public id: number;
    public horaInicio: number;
    public horaFin: number;
    public dia: number;
    public color: string;
    public grupo: Grupo;

    constructor() {
        this.grupo = new Grupo();
    }

    searchConflicts(other: Horario): boolean {
        const cDia = this.dia == other.dia;
        const c1 = Number(other.horaInicio) <= Number(this.horaInicio) && Number(other.horaFin) >= Number(this.horaFin);
        const c2 = Number(other.horaInicio) >= Number(this.horaInicio) && Number(other.horaInicio) <= Number(this.horaFin);
        const c3 = Number(other.horaFin) >= Number(this.horaInicio) && Number(other.horaFin) <= Number(this.horaFin);
        return cDia && (c1 || c2 || c3);
    }

}