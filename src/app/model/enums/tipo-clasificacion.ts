import { SimpleEnum } from './simple-enum';

export class TipoClasificacion {
    static readonly INICIAL_I = new SimpleEnum("Inicial I");
    static readonly INICIAL_II = new SimpleEnum("Inicial II");
    static readonly INTERMEDIO = new SimpleEnum("Intermedio");
    static readonly AVANZADO = new SimpleEnum("Avanzado");
}