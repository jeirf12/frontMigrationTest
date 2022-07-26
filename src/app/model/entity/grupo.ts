import { Usuario } from './usuario';
import { Horario } from './horario';
import { Inscripcion } from './inscripcion';

export class Grupo {

    public id: number;
    public nombre: string;
    public instructor: Usuario;
    public horariosList: Horario[];
    public inscripcionesList: Inscripcion[];

    constructor() {
        this.instructor = new Usuario();
        this.horariosList = [];
        this.inscripcionesList = [];
    }

}