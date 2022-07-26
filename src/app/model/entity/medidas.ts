import { DeportePorcentajeGrasa } from '../deporte';
import { ValoracionUtil } from 'src/app/util/valoracion-util';

export class Medidas {

    public id: number;
    public edad: number;
    public deporte: string;
    public peso: number;
    public talla: number;
    public triceps: number;
    public subEscapular: number;
    public suprailiaco: number;
    public abdominal: number;
    public muslo: number;
    public pantorrilla: number;
    public pMuneca: number;
    public pCabeza: number;
    public dBiacromial: number;
    public dBiltiocristal: number;
    public dHumero: number;
    public dFemur: number;
    public pBrazo: number;
    public dAntebrazo: number;
    public pPantorrilla: number;
    public pCajaToraxica: number;
    public pMuslo: number;
    
    public mCintura: number;
    public mCadera: number;
    public pCintura: number;
    

    public genero: string;

    constructor() { }

    setAllData(medidas: Medidas, genero: string) {
        this.genero = genero;
        this.id = medidas.id;
        this.edad = medidas.edad;
        this.deporte = medidas.deporte;
        this.peso = medidas.peso;
        this.talla = medidas.talla;
        this.triceps = medidas.triceps;
        this.subEscapular = medidas.subEscapular;
        this.suprailiaco = medidas.suprailiaco;
        this.abdominal = medidas.abdominal;
        this.muslo = medidas.muslo;
        this.pantorrilla = medidas.pantorrilla;
        this.pMuneca = medidas.pMuneca;
        this.pCabeza = medidas.pCabeza;
        this.dBiacromial = medidas.dBiacromial;
        this.dBiltiocristal = medidas.dBiltiocristal;
        this.dHumero = medidas.dHumero;
        this.dFemur = medidas.dFemur;
        this.pBrazo = medidas.pBrazo;
        this.dAntebrazo = medidas.dAntebrazo;
        this.pPantorrilla = medidas.pPantorrilla;
        this.pCajaToraxica = medidas.pCajaToraxica;
        this.pMuslo = medidas.pMuslo;

        this.mCintura = medidas.mCintura;
        this.mCadera = medidas.mCadera;
        this.pCintura = medidas.pCintura;
        
    }

    get sumatoriaPliegues(): number {
        return this.triceps + this.subEscapular + this.suprailiaco +
            this.muslo + this.pantorrilla + this.abdominal;

    }

    get porcentajeGrasa(): number {
        if (this.genero == "M") {
            return ((this.sumatoriaPliegues * 0.097) + 3.64);
        } else {
            return ((this.sumatoriaPliegues * 0.1429) + 4.56);
        }
    }

    get pesoGraso(): number {
        let pesoGr = this.peso * this.porcentajeGrasa;
        return ((pesoGr) / 100);
    }

    get pesoLibreGrasa(): number {
        return this.peso - this.pesoGraso;
    }

    get masaMuscular(): number {
        let zmus = this.pBrazo + this.dAntebrazo + this.pMuslo +
            this.pPantorrilla + this.pCajaToraxica;
        let mmus = ((zmus * (170.18 / this.talla) - 207.21) / 13.74);
        return ((mmus * 5.4 + 24.5) / Math.pow(170.18 / this.talla, 3));
    }

    get pesoIdeal(): number {
        return (0.75 * (this.talla - 150) + 50);
    }

    get indiceMasaCorporal(): number {
        return this.peso / 2.89;
    }

    get complexion(): number {
        return this.talla / this.pMuneca;
    }

    get masaTotalOsea(): number {
        return ((this.pCabeza - 1.2) / 0.18);
    }

    get tasaMetabolicaBasal(): number {
        if (this.genero == "M") {
            return 66 + (13.8 * this.peso) + (5 * this.talla) - (6.8 * this.edad);
        } else {
            return 655 + (9.6 * this.peso) + (1.8 * this.talla) - (4.7 * this.edad);
        }
    }

    get excesoPeso(): number {
        return this.peso - this.pesoOptimo;
    }

    get pesoOptimo(): number {
        return this.pesoLibreGrasa / 0.9;
    }

    get porcentajeGrasaIdeal(): number {
        return DeportePorcentajeGrasa.getPorcentajeByDeporte(this.deporte, this.genero);
    }

    get estadoPorcentajeGrasa(): string {
        return ValoracionUtil.estadoPorcentajeGrasa(this.porcentajeGrasa, this.genero);
    }

    get estadoComplexion(): string {
        return ValoracionUtil.estadoComplexion(this.complexion, this.genero);
    }

    get estadoIndiceMasaCorporal(): string {
        return ValoracionUtil.estadoIndiceMasaCorporal(this.indiceMasaCorporal);
    }

    get estadoIndiceMasaCorporal2(): string {
        return ValoracionUtil.estadoIndiceMasaCorporal2(this.indiceMasaCorporal);
    }

    get riesgoCardioMetabolico(): string {
        return ValoracionUtil.riesgoCardioMetabolico(this.indiceMasaCorporal, this.pCintura, this.genero);
    }



    get indiceCinturaCadera(): number {
        return (this.mCintura ? this.mCintura : 0) / (this.mCadera ? this.mCadera : 1);
        
    }

    get estadoIndiceCinturaCadera(): string {
        return ValoracionUtil.indiceCinturaCadera(this.indiceCinturaCadera, this.genero);
    }

    get razonCinturaEstatura(): number {
        return (this.pCintura ? this.pCintura: 0) / (this.talla ? this.talla : 1);
    }

    get estadoRazonCinturaEstatura(): string {
        return ValoracionUtil.razonCinturaEstatura(this.razonCinturaEstatura);
    }

}