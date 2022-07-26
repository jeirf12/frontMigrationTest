import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { TwoObjects } from './two-objects';

export class DataChart {

    public title: string;
    public empty: boolean = false;
    public chartType: ChartType;
    public labels: Label[] = [];
    public chartDataSets: ChartDataSets[] = [];
    public multiDataSet: MultiDataSet = []
    public colors: Array<any> = [{
        backgroundColor: ['#c6282880', '#6a1b9a80', '#4527a080', '#28359380', '#1565c080', '#0277bd80',
            '#00838f80', '#00695c80', '#2e7d3280', '#558b2f80', '#9e9d2480', '#f9a82580', '#ff8f0080',
            '#ef6c0080', '#d8431580', '#c6282880', '#6a1b9a80', '#4527a080', '#28359380', '#1565c080',
            '#0277bd80', '#00838f80', '#00695c80', '#2e7d3280', '#558b2f80', '#9e9d2480', '#f9a82580',
            '#ff8f0080', '#ef6c0080', '#d8431580', '#c6282880', '#6a1b9a80', '#4527a080', '#28359380',
            '#1565c080', '#0277bd80', '#00838f80', '#00695c80', '#2e7d3280', '#558b2f80', '#9e9d2480',
            '#f9a82580', '#ff8f0080', '#ef6c0080', '#d8431580'],
        borderColor: ['#c6282850', '#6a1b9a50', '#4527a050', '#28359350', '#1565c050', '#0277bd50',
            '#00838f50', '#00695c50', '#2e7d3250', '#558b2f50', '#9e9d2450', '#f9a82550', '#ff8f0050',
            '#ef6c0050', '#d8431550', '#c6282850', '#6a1b9a50', '#4527a050', '#28359350', '#1565c050',
            '#0277bd50', '#00838f50', '#00695c50', '#2e7d3250', '#558b2f50', '#9e9d2450', '#f9a82550',
            '#ff8f0050', '#ef6c0050', '#d8431550', '#c6282850', '#6a1b9a50', '#4527a050', '#28359350',
            '#1565c050', '#0277bd50', '#00838f50', '#00695c50', '#2e7d3250', '#558b2f50', '#9e9d2450',
            '#f9a82550', '#ff8f0050', '#ef6c0050', '#d8431550']
    }];
    public options: ChartOptions;

    constructor(chartType: ChartType, title: string) {
        this.title = title;
        this.chartType = chartType;
    }

    public setChartDataSet(data: TwoObjects<ChartDataSets, Label[]>) {
        this.chartDataSets = [];
        this.chartDataSets.push(data.first);
        this.empty = data.first.data.length == 0;
        this.labels = data.second;
        const max = Math.round(Math.max(...(data.first.data as number[])) * 1.3) + 2;
        switch (this.chartType) {
            case 'horizontalBar':
                this.options = {
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontSize: 10,
                                    fontColor: '#333333',
                                    stepSize: 1,
                                    beginAtZero: true,
                                    max: max,
                                    min: 0
                                }
                            }
                        ], yAxes: [
                            {
                                ticks: {
                                    fontSize: 10,
                                    fontColor: '#333333',
                                    callback: function (label, index, labels) {
                                        if (label.toString().length > 25) {
                                            return label.toString().substring(0, 25) + "...";
                                        } else {
                                            return label;
                                        }
                                    }
                                }
                            }
                        ]
                    }
                };
                break;
            case 'bar':
            case 'line':
                this.options = {
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontSize: 10,
                                    fontColor: '#333333',
                                    stepSize: 1,
                                    beginAtZero: true,
                                    max: max,
                                    min: 0
                                }
                            }
                        ], xAxes: [
                            {
                                ticks: {
                                    fontSize: 10,
                                    fontColor: '#333333'
                                }
                            }
                        ]
                    }
                };
                break;
        }
    }

    public setMultiDataSet(data: TwoObjects<number[], Label[]>) {
        this.multiDataSet = [];
        this.multiDataSet.push(data.first);
        this.empty = data.first.length == 0;
        this.labels = data.second;
    }

}