import { AbrevEnum } from './abrev-enum';

export class TipoDocumento {
    static readonly CEDULA_CIUDADANIA = new AbrevEnum("CC", "Cédula de ciudadanía");
    static readonly TARJETA_IDENTIDAD = new AbrevEnum("TI", "Tarjeta de identidad");
    static readonly CEDULA_EXTRANJERIA = new AbrevEnum("CE", "Cédula de extranjería");
    static readonly PASAPORTE = new AbrevEnum("PA", "Pasaporte");
}