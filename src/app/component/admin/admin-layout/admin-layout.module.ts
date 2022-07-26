import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminLayoutRoutes } from './admin-layout.routing.module';


import { OnlyNumberDirective } from 'src/app/util/only-number-directive';

import { AdminHomeComponent } from '../pages/admin-home/admin-home.component';
import { AdminProfileComponent } from '../pages/admin-profile/admin-profile.component';

import { AdminInstructoresComponent } from '../pages/admin-instructores/admin-instructores.component';
import { AdminInstructoresViewComponent } from '../pages/admin-instructores/admin-instructores-view/admin-instructores-view.component';
import { AdminInstructoresSaveComponent } from '../pages/admin-instructores/admin-instructores-save/admin-instructores-save.component';

import { AdminDeportistasSaveComponent } from '../pages/admin-deportistas/admin-deportistas-save/admin-deportistas-save.component';
import { AdminDeportistasComponent } from '../pages/admin-deportistas/admin-deportistas.component';
import { AdminDeportistasViewComponent } from '../pages/admin-deportistas/admin-deportistas-view/admin-deportistas-view.component';

import { AdminValoracionesComponent } from '../pages/admin-valoraciones/admin-valoraciones.component';
import { AdminValoracionesSaveComponent } from '../pages/admin-valoraciones/admin-valoraciones-save/admin-valoraciones-save.component';
import { AdminValoracionesCompareComponent } from '../pages/admin-valoraciones/admin-valoraciones-compare/admin-valoraciones-compare.component';

import { AdminAsistenciaComponent } from '../pages/admin-asistencia/admin-asistencia.component';
import { AdminAsistenciaInscripcionComponent } from '../pages/admin-asistencia/admin-asistencia-inscripcion/admin-asistencia-inscripcion.component';
import { AdminAsistenciaRegistroComponent } from '../pages/admin-asistencia/admin-asistencia-registro/admin-asistencia-registro.component';
import { AdminAsistenciaReportesComponent } from '../pages/admin-asistencia/admin-asistencia-reportes/admin-asistencia-reportes.component';

import { AdminRecursosComponent } from '../pages/admin-recursos/admin-recursos.component';

import { AdminRecursosEventosComponent } from '../pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos.component';
import { AdminRecursosEventosSaveComponent } from '../pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos-save/admin-recursos-eventos-save.component';
import { AdminRecursosEventosViewComponent } from '../pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos-view/admin-recursos-eventos-view.component';

import { AdminRecursosNoticiasComponent } from '../pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias.component';
import { AdminRecursosNoticiasViewComponent } from '../pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias-view/admin-recursos-noticias-view.component';
import { AdminRecursosNoticiasSaveComponent } from '../pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias-save/admin-recursos-noticias-save.component';

import { AdminRecursosGruposComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos.component';
import { AdminRecursosGruposSaveComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-save/admin-recursos-grupos-save.component';
import { AdminRecursosGruposViewComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-view/admin-recursos-grupos-view.component';
import { AdminRecursosGruposHorarioComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-horario/admin-recursos-grupos-horario.component';

import { MonthPickerComponent } from '../../common/dialog/month-picker/month-picker.component';
import { ReporteChartComponent } from '../../common/reporte-chart/reporte-chart.component';
import { AdminAsistenciaExportarComponent } from '../pages/admin-asistencia/admin-asistencia-exportar/admin-asistencia-exportar.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        ChartsModule,
        NgxSpinnerModule,
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    declarations: [
        OnlyNumberDirective,

        AdminHomeComponent,
        AdminProfileComponent,

        AdminInstructoresComponent,
        AdminInstructoresSaveComponent,
        AdminInstructoresViewComponent,

        AdminDeportistasComponent,
        AdminDeportistasSaveComponent,
        AdminDeportistasViewComponent,

        AdminValoracionesComponent,
        AdminValoracionesSaveComponent,
        AdminValoracionesCompareComponent,

        AdminAsistenciaComponent,
        AdminAsistenciaInscripcionComponent,
        AdminAsistenciaRegistroComponent,
        AdminAsistenciaReportesComponent,
        AdminAsistenciaExportarComponent,

        AdminRecursosComponent,

        AdminRecursosEventosComponent,
        AdminRecursosEventosSaveComponent,
        AdminRecursosEventosViewComponent,

        AdminRecursosNoticiasComponent,
        AdminRecursosNoticiasSaveComponent,
        AdminRecursosNoticiasViewComponent,

        AdminRecursosGruposComponent,
        AdminRecursosGruposSaveComponent,
        AdminRecursosGruposViewComponent,
        AdminRecursosGruposHorarioComponent,

        MonthPickerComponent,
        ReporteChartComponent
    ]
})

export class AdminLayoutModule { }