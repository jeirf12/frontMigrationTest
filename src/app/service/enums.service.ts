import { Injectable } from '@angular/core';
import { AbrevEnum } from '../model/enums/abrev-enum';
import { SimpleEnum } from '../model/enums/simple-enum';
import { Enums } from '../model/Enums';
import { SimpleEnumCheck } from '../model/simple-enum-check';
import { TipoDocumento } from '../model/enums/tipo-documento';
import { TipoUsuario } from '../model/enums/tipo-usuario';
import { TipoDeportista } from '../model/enums/tipo-deportista';
import { TipoGenero } from '../model/enums/tipo-genero';
import { TipoDeporte } from '../model/enums/tipo-deporte';
import { TipoPatologia } from '../model/enums/tipo-patologia';
import { TipoReporte } from '../model/enums/tipo-reporte';
import { TipoClasificacion } from '../model/enums/tipo-clasificacion';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  constructor() { }

  get tiposDocumento(): AbrevEnum[] {
    return Object.values(TipoDocumento);
  }

  get tiposUsuario(): AbrevEnum[] {
    return Object.values(TipoUsuario);
  }

  get tiposDeportista(): SimpleEnum[] {
    return Object.values(TipoDeportista);
  }

  get tiposGenero(): AbrevEnum[] {
    return Object.values(TipoGenero);
  }

  get tiposDeporte(): SimpleEnum[] {
    return Object.values(TipoDeporte);
  }

  get tiposPatologia(): SimpleEnumCheck[] {
    return Object.values(TipoPatologia);
  }

  get tiposReporte(): SimpleEnum[] {
    return Object.values(TipoReporte);
  }

  get tiposClasificacion(): SimpleEnum[] {
    return Object.values(TipoClasificacion);
  }

  enumDescription(abreviatura: string, tipo: Enums): string {
    var list: AbrevEnum[];
    switch (tipo) {
      case Enums.tiposDocumento:
        list = this.tiposDocumento
        break;
      case Enums.tiposUsuario:
        list = this.tiposUsuario
        break;
      case Enums.tiposGenero:
        list = this.tiposGenero;
        break;
    }
    const result = list.find(t => t.abreviatura == abreviatura);
    if (result) {
      return result.descripcion;
    } else {
      return "";
    }
  }

}
