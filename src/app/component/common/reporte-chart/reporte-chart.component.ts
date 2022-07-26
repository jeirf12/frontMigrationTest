import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { DataChart } from 'src/app/model/data-chart';

@Component({
  selector: 'app-reporte-chart',
  templateUrl: './reporte-chart.component.html',
  styleUrls: ['./reporte-chart.component.scss']
})
export class ReporteChartComponent implements OnInit {

  faChartBar: IconDefinition = faChartBar;

  @Input()
  dataChart: DataChart;

  constructor() { }

  ngOnInit(): void {
  }

}
