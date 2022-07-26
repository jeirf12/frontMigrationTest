import { Programa } from './programa';

export class Dependencia {
    public id: number;
    public nombre: string;
    public tipoDependencia: string;
    public programasList: Programa[];

    constructor() {
        this.programasList = [];
    }

}