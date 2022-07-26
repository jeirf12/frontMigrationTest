import { Dependencia } from './dependencia';

export class Programa {

    public id: number;
    public nombre: string;
    public dependencia: Dependencia;

    constructor() {
        this.dependencia = new Dependencia();
    }

}