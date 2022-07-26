import { Usuario } from './usuario';
import { Dependencia } from './dependencia';
import { Programa } from './programa';

export class Deportista {

    public id: number;
    public codigo: string;
    public tipoDeportista: string;
    public clasificacion: string;
    public patologias: string;
    public info: Usuario;
    public instructor: Usuario;
    public dependencia: Dependencia;
    public programa: Programa;
    public conyugue: Deportista;

    constructor() {
        this.info = new Usuario();
        this.instructor = new Usuario();
        this.dependencia = new Dependencia();
        this.programa = new Programa();
    }

}