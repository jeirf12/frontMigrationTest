import { SimpleEnum } from './simple-enum'

export class TipoDeporte {
    static readonly NINGUNO = new SimpleEnum("Ninguno");
    static readonly ATLETISMO = new SimpleEnum("Atletismo");
    static readonly BALONCESTO = new SimpleEnum("Baloncesto");
    static readonly CICLISMO = new SimpleEnum("Ciclismo");
    static readonly GIMNASIA = new SimpleEnum("Gimnasia");
    static readonly TIRO = new SimpleEnum("Tiro");
    static readonly BOXEO = new SimpleEnum("Boxeo");
    static readonly KARATE_DO = new SimpleEnum("Karate Do");
    static readonly TENIS_MESA = new SimpleEnum("Tenis de Mesa");
    static readonly VOLEIBOL = new SimpleEnum("Voleibol");
    static readonly FUTBOL = new SimpleEnum("Futbol");
    static readonly MICROFUTBOL = new SimpleEnum("Microfutbol");
    static readonly TENIS_CAMPO = new SimpleEnum("Tenis de Campo");
    static readonly NATACION = new SimpleEnum("Natacion");
    static readonly LUCHA_OLIMPICA = new SimpleEnum("Lucha Olimpica");
    static readonly LAVANTAMIENTO_PESAS = new SimpleEnum("Levantamiento de Pesas");
    static readonly JUDO = new SimpleEnum("Judo");
    static readonly TAEKONDO = new SimpleEnum("Taekondo");
    static readonly ESGRIMA = new SimpleEnum("Esgrima");
}