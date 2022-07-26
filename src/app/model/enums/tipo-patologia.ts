import { SimpleEnum } from './simple-enum';

export class TipoPatologia {

    static readonly DIABETES = new SimpleEnum("Diabetes");
    static readonly CANSANCIO = new SimpleEnum("Cansancio/Fatiga");
    static readonly HIPERTENCION_ARTERIAL = new SimpleEnum("Hipertensión arterial");
    static readonly DEPRESION = new SimpleEnum("Depresión");
    static readonly COLESTEROL = new SimpleEnum("Colesterol y triglicéridos altos");
    static readonly TRASTORNOS_CARDIACOS = new SimpleEnum("Trastornos cardiacos");
    static readonly VARICES = new SimpleEnum("Varices");
    static readonly TRASTORNOS_RESPIRATORIOS = new SimpleEnum("Trastornos respiratorios");
    static readonly OSTEOARTRITIS = new SimpleEnum("Osteoartritis");
    static readonly DIGESTIVAS = new SimpleEnum("Enfermedades digestivas");
    static readonly LESIONES = new SimpleEnum("Lesiones en articulaciones y musculares");
    static readonly MEDICACION = new SimpleEnum("Medicación");
    static readonly OTRO = new SimpleEnum("Otro");

    constructor() { }
}