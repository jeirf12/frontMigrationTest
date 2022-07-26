import { SimpleEnum } from './simple-enum';

export class TipoDependencia {
    static readonly FACULTAD = new SimpleEnum("Facultad");
    static readonly DEPENDENCIA = new SimpleEnum("Dependencia");
    static readonly DIRECTIVOS = new SimpleEnum("Directivos");
    static readonly CENTRO = new SimpleEnum("Centro");
}