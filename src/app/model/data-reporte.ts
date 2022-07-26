import { Reporte } from './entity/reporte';
import { ChartDataSets } from 'chart.js';
import { TwoObjects } from './two-objects';
import { Label, MultiDataSet } from 'ng2-charts';

export class DataReporte {

    public inscripciones: Reporte[];
    public asistencia: Reporte[];

    constructor() { }

    public static buildChartDataSet(reportes: Reporte[]): TwoObjects<ChartDataSets, Label[]> {
        const result = new TwoObjects<ChartDataSets, Label[]>();
        const data: number[] = [];
        result.second = [];
        reportes.forEach(item => {
            result.second.push(item.detalle);
            data.push(item.valor);
        });;
        result.first = { data: data, barPercentage: 0.8 };
        return result;
    }

    public static buildMultiDataSet(reportes: Reporte[]): TwoObjects<number[], Label[]> {
        const result = new TwoObjects<number[], Label[]>();
        const data: number[] = [];
        result.second = [];
        reportes.forEach(item => {
            result.second.push(item.detalle);
            data.push(item.valor);
        });;
        result.first = data;
        return result;
    }

}
