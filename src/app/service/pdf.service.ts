import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


import { DatePipe } from '@angular/common';
import { Medidas } from '../model/entity/medidas';
import { Tests } from '../model/entity/tests';
import { ValoracionUtil } from '../util/valoracion-util';
import { Deportista } from '../model/entity/deportista';
import { Valoracion } from '../model/entity/valoracion';
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const pdfMake = require('pdfmake/build/pdfmake.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  getValoracionPdf(data: Valoracion, deportista: Deportista) {
    const medidas = new Medidas();
    medidas.setAllData(data.medidas, deportista.info.genero);
    const tests = new Tests();
    tests.setAllData(data.tests, deportista.info.genero);
    tests.legerAuxValue = ValoracionUtil.legerVo2Max[ValoracionUtil.stringToLeger(tests.leger).length - 1];

    const today = new DatePipe('es-CO').transform(new Date(), 'dd-MM-yyyy');
    const nombreCompleto = deportista.info.primerNombre + ' ' + deportista.info.primerApellido;

    this.spinner.show();
    this.getBase64ImageFromURL('./assets/img/unicauca/antorcha.png').then(antorcha => {
      const pdfDoc = {
        pageSize: 'LETTER',
        background: function (currentPge, pageSize) {
          return { image: antorcha, width: 250, absolutePosition: { x: 150, y: 50 } }
        },
        info: {
          title: nombreCompleto + ' (' + today + ')',
          author: 'Programa Hora Saludable'
        },
        content: [
          { text: 'COMPOSICIÓN CORPORAL Y TESTS DEPORTIVOS', style: 'header' },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 535, y2: 5, lineWidth: 0.5 }], margin: [0, 10] },
          {
            layout: 'noBorders',
            table: {
              widths: ['auto', '*', 'auto', 100],
              body: [
                [{ text: 'Nombre:', style: 'label' }, { text: deportista.info.primerNombre + ' ' + deportista.info.primerApellido, style: 'body1' },
                { text: 'Fecha impresión:', style: 'label' }, { text: today, style: 'body1' }],

                [{ text: 'Identificación:', style: 'label' }, { text: deportista.info.documento, style: 'body1' },
                { text: 'Género:', style: 'label' }, { text: deportista.info.genero == "M" ? "Masculino" : "Femenino", style: 'body1' }],

                [{ text: 'Deporte:', style: 'label' }, { text: medidas.deporte, style: 'body1' },
                { text: 'Talla:', style: 'label' }, { text: medidas.talla + ' cm', style: 'body1' }],

                [{ text: 'Complexión:', style: 'label' }, { text: medidas.complexion.toFixed(2), style: 'body1' },
                { text: 'Peso:', style: 'label' }, { text: medidas.peso + ' kg', style: 'body1' }],
              ]
            }
          },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 535, y2: 5, lineWidth: 0.5 }], margin: [0, 10] },
          {
            layout: 'noBorders',
            margin: [10, 0, 0, 0],
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 100],
              body: [
                [{ text: 'ANTROPOMETRIA', colSpan: 2, style: 'subheader' }, '', { text: 'PLIEGUES CUTANEOS', colSpan: 2, style: 'subheader' }, ''],

                [{ text: 'Perimetro Brazo:', style: 'label' }, { text: medidas.pBrazo.toFixed(1), style: 'body1' },
                { text: 'Triceps:', style: 'label' }, { text: medidas.triceps.toFixed(1), style: 'body1' }],

                [{ text: 'Perimetro Antebrazo:', style: 'label' }, { text: medidas.dAntebrazo.toFixed(1), style: 'body1' },
                { text: 'Abdominal:', style: 'label' }, { text: medidas.abdominal.toFixed(1), style: 'body1' }],

                [{ text: 'Perimetro Caja Toráxica:', style: 'label' }, { text: medidas.pCajaToraxica.toFixed(1), style: 'body1' },
                { text: 'Muslo:', style: 'label' }, { text: medidas.muslo.toFixed(1), style: 'body1' }],

                [{ text: 'Perimetro Pantorrilla:', style: 'label' }, { text: medidas.pPantorrilla.toFixed(1), style: 'body1' },
                { text: 'Subescapular:', style: 'label' }, { text: medidas.subEscapular.toFixed(1), style: 'body1' }],

                [{ text: 'Perimetro Muslo:', style: 'label' }, { text: medidas.pMuslo.toFixed(1), style: 'body1' },
                { text: 'Suprailiaco:', style: 'label' }, { text: medidas.suprailiaco.toFixed(1), style: 'body1' }],

                [{ text: 'Perimetro Muñeca:', style: 'label' }, { text: medidas.pMuneca.toFixed(1), style: 'body1' },
                { text: 'Pantorrilla:', style: 'label' }, { text: medidas.pantorrilla.toFixed(1), style: 'body1' }],

                ['', '',
                  { text: '(+) Pliegues', style: 'label' }, { text: medidas.sumatoriaPliegues.toFixed(1), style: 'body1' }],

              ]
            }
          },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 535, y2: 5, lineWidth: 0.5 }], margin: [0, 10] },
          {
            layout: 'noBorders',
            margin: [10, 0, 0, 0],
            table: {
              headerRows: 1,
              widths: ['auto', '*', 'auto', 100],
              body: [
                [{ text: 'COMPOSICIÓN CORPORAL', colSpan: 4, style: 'subheader' }, '', '', ''],

                [{ text: 'Porcentaje de grasa:', style: 'label' }, { text: medidas.porcentajeGrasa.toFixed(1) + ' ' + medidas.estadoPorcentajeGrasa, style: 'body1' },
                { text: 'peso Óptimo:', style: 'label' }, { text: medidas.pesoOptimo.toFixed(1), style: 'body1' }],

                [{ text: 'Peso graso:', style: 'label' }, { text: medidas.pesoGraso.toFixed(1), style: 'body1' },
                { text: 'Peso libre de grasa:', style: 'label' }, { text: medidas.pesoLibreGrasa.toFixed(1), style: 'body1' }],

                [{ text: 'Masa total osea:', style: 'label' }, { text: medidas.masaTotalOsea.toFixed(1), style: 'body1' },
                { text: 'Tasa metabolica basal:', style: 'label' }, { text: medidas.tasaMetabolicaBasal.toFixed(1), style: 'body1' }],

                [{ text: 'Exceso de peso:', style: 'label' }, { text: medidas.excesoPeso.toFixed(1), style: 'body1' },
                { text: 'Masa muscular:', style: 'label' }, { text: medidas.masaMuscular.toFixed(1), style: 'body1' }]

              ]
            }
          },
          { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 535, y2: 5, lineWidth: 0.5 }], margin: [0, 10] },
          {
            table: {
              alignment: 'center',
              widths: ['*', '*', '*'],
              body: [
                [
                  [{
                    layout: 'noBorders',
                    table: {
                      headerRows: 1,
                      widths: ['*', '*'],
                      body: [
                        [{ text: 'TEST DE SARGENT', colSpan: 2, style: 'subheader', alignment: 'center', margin: 0 }, ''],

                        [{ text: 'Embergadura:', style: 'label', alignment: 'right' }, { text: tests.embergadura.toFixed(1), style: 'body1' }],
                        [{ text: 'Salto máximo:', style: 'label', alignment: 'right' }, { text: tests.saltoMaximo.toFixed(1), style: 'body1' }],
                        [{ text: 'Salto real:', style: 'label', alignment: 'right' }, { text: tests.testSargent.value.toFixed(1), style: 'body1' }]

                      ]
                    }
                  }],
                  [{
                    layout: 'noBorders',
                    table: {
                      headerRows: 1,
                      widths: ['*', '*'],
                      body: [
                        [{ text: 'TEST DE RUFIER', colSpan: 2, style: 'subheader', alignment: 'center', margin: 0 }, ''],

                        [{ text: 'Pulso 1:', style: 'label', alignment: 'right' }, { text: tests.primerPulso.toFixed(1), style: 'body1' }],
                        [{ text: 'Pulso 2:', style: 'label', alignment: 'right' }, { text: tests.segundoPulso.toFixed(1), style: 'body1' }],
                        [{ text: 'Pulso 3:', style: 'label', alignment: 'right' }, { text: tests.tercerPulso.toFixed(1), style: 'body1' }],
                        [{ text: 'Resultado:', style: 'label', alignment: 'right' }, { text: tests.testRufier.value.toFixed(1), style: 'body1' }],
                        [{ text: tests.testRufier.description, colSpan: 2, style: 'label', alignment: 'center', margin: [0, 10] }, '']

                      ]
                    }
                  }],
                  [{
                    layout: 'noBorders',
                    table: {
                      headerRows: 1,
                      widths: ['*', '*'],
                      body: [
                        [{ text: 'TEST DE LEGER', colSpan: 2, style: 'subheader', alignment: 'center', margin: 0 }, ''],

                        [{ text: 'Consumo max. oxigeno:', colSpan: 2, style: 'label', alignment: 'center' }, ''],
                        [{ text: tests.testLeger.value.toFixed(1), colSpan: 2, style: 'body1', alignment: 'center' }],

                        [{ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 120, y2: 5, lineWidth: 0.5 }], margin: [0, 10], colSpan: 2, alignment: 'center' }, ''],

                        [{ text: 'TEST DE WELLS', colSpan: 2, style: 'subheader', alignment: 'center', margin: 0 }, ''],

                        [{ text: 'Flexibilidad:', style: 'label', alignment: 'right' }, { text: tests.flexibilidad.toFixed(1), style: 'body1' }],
                        [{ text: tests.testWells.description, colSpan: 2, style: 'label', alignment: 'center', margin: [0, 10] }, '']
                      ]
                    }
                  }],
                ]
              ]
            }
          },
          { text: 'OBSERVACIONES', style: 'subheader' },
          {
            table: {
              widths: ['*'],
              body: [
                [{ text: data.observaciones, style: 'body1', margin: 5 }],
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            margin: [0, 5]
          },
          subheader: {
            fontSize: 12,
            bold: true,
            decoration: 'underline',
            margin: [15, 5]
          },
          label: {
            fontSize: 11,
            bold: true
          },
          body1: {
            fontSize: 11
          }
        }
      };
      this.spinner.hide();
      pdfMake.createPdf(pdfDoc).download(nombreCompleto + ' (' + today + ').pdf');
    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

}
