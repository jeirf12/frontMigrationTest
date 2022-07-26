import { Inscripcion } from './inscripcion';
import { Horario } from './horario';

export class Asistencia {

    public id: number;
    public fecha: Date;
    public asistieron: string[];
    public observaciones: string;
    public inscripcion: Inscripcion;

    constructor() {
        this.inscripcion = new Inscripcion();
        this.asistieron = [];
    }

}