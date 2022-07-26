import { ResultadoTest } from '../resultado-test';
import { ValoracionUtil, FeqCardiaca } from 'src/app/util/valoracion-util';

export class Tests {

    public id: number;
    public embergadura: number;
    public saltoMaximo: number;
    public primerPulso: number;
    public segundoPulso: number;
    public tercerPulso: number;
    public flexibilidad: number;
    public leger: string;
    public edad: number;
    public feqMaxima: number;
    public feqMaximaLeger: number;
    public feqReposo: number;

    public genero: string;
    public legerAuxValue: number;

    constructor() { }

    setAllData(tests: Tests, genero: string) {
        this.genero = genero;
        this.id = tests.id;
        this.embergadura = tests.embergadura;
        this.saltoMaximo = tests.saltoMaximo;
        this.primerPulso = tests.primerPulso;
        this.segundoPulso = tests.segundoPulso;
        this.tercerPulso = tests.tercerPulso;
        this.flexibilidad = tests.flexibilidad;
        this.leger = tests.leger;
        this.edad = tests.edad;
        this.feqMaxima = tests.feqMaxima;
        this.feqMaximaLeger = tests.feqMaximaLeger;
        this.feqReposo = tests.feqReposo;
    }

    get testSargent(): ResultadoTest {
        let resultado = new ResultadoTest();
        resultado.value = this.saltoMaximo - this.embergadura;
        resultado.description = ValoracionUtil.estadoSargent(resultado.value, this.genero);
        return resultado;
    }

    get testRufier(): ResultadoTest {
        let resultado = new ResultadoTest();
        resultado.value = (this.primerPulso + this.segundoPulso + this.tercerPulso - 200) / 10;
        resultado.description = ValoracionUtil.estadoTestRufier(resultado.value);
        return resultado;
    }

    get testWells(): ResultadoTest {
        let resultado = new ResultadoTest();
        resultado.value = this.flexibilidad;
        resultado.description = ValoracionUtil.estadoTestWells(resultado.value, this.edad, this.genero);
        return resultado;
    }

    get testLeger(): ResultadoTest {
        let resultado = new ResultadoTest();
        resultado.value = Math.round(this.legerAuxValue);
        resultado.description = ValoracionUtil.estadoTestLeger(resultado.value, this.genero);
        return resultado;
    }

    get testFeqCardiacaPorEdad(): FeqCardiaca {
        let feqReserva = (this.feqMaxima - this.feqReposo);
        return {
            feqRehabilitacion: ((feqReserva * 0.5) + this.feqReposo),
            feqQuemaGrasa: ((feqReserva * 0.6) + this.feqReposo),
            feqDlloResistencia: ((feqReserva * 0.7) + this.feqReposo),
            feqDlloPotenciaAerobica: ((feqReserva * 0.8) + this.feqReposo),
            feqMetabolismoAnaerobico: ((feqReserva * 0.9) + this.feqReposo)
        }
    }

    get testFeqCardiacaPorLeger(): FeqCardiaca {
        let feqReserva = (this.feqMaximaLeger - this.feqReposo);
        return {
            feqRehabilitacion: ((feqReserva * 0.5) + this.feqReposo),
            feqQuemaGrasa: ((feqReserva * 0.6) + this.feqReposo),
            feqDlloResistencia: ((feqReserva * 0.7) + this.feqReposo),
            feqDlloPotenciaAerobica: ((feqReserva * 0.8) + this.feqReposo),
            feqMetabolismoAnaerobico: ((feqReserva * 0.9) + this.feqReposo)
        }
    }

}