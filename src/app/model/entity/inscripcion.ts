import { Deportista } from './deportista';
import { Grupo } from './grupo';

export class Inscripcion {

    public id: number;
    public mes: number;
    public anio: number;
    public deportistas: string[];
    public grupo: Grupo;

    constructor() {
        this.grupo = new Grupo();
        this.deportistas = [];
    }

}