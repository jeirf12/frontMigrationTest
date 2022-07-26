import { Deportista } from './deportista';
import { Medidas } from './medidas';
import { Tests } from './tests';

export class Valoracion {

    public id: number;
    public fecha: Date;
    public observaciones: string;
    public deportista: Deportista;
    public medidas: Medidas;
    public tests: Tests;

    constructor() {
        this.medidas = new Medidas();
        this.tests = new Tests();
    }

    setAllData(valoracion: Valoracion) {
        this.id = valoracion.id;
        this.fecha = valoracion.fecha;
        this.observaciones = valoracion.observaciones;
        this.deportista = valoracion.deportista;
        this.medidas = new Medidas();
        this.medidas.setAllData(valoracion.medidas, this.deportista.info.genero);
        this.tests = new Tests();
        this.tests.setAllData(valoracion.tests, this.deportista.info.genero);
    }

}