import { Routes } from '@angular/router';

import { AdminHomeComponent } from '../pages/admin-home/admin-home.component';
import { AdminProfileComponent } from '../pages/admin-profile/admin-profile.component';

import { AdminInstructoresComponent } from '../pages/admin-instructores/admin-instructores.component';
import { AdminInstructoresSaveComponent } from '../pages/admin-instructores/admin-instructores-save/admin-instructores-save.component';

import { AdminDeportistasComponent } from '../pages/admin-deportistas/admin-deportistas.component';
import { AdminDeportistasSaveComponent } from '../pages/admin-deportistas/admin-deportistas-save/admin-deportistas-save.component';

import { AdminValoracionesComponent } from '../pages/admin-valoraciones/admin-valoraciones.component';
import { AdminValoracionesSaveComponent } from '../pages/admin-valoraciones/admin-valoraciones-save/admin-valoraciones-save.component';
import { AdminValoracionesCompareComponent } from '../pages/admin-valoraciones/admin-valoraciones-compare/admin-valoraciones-compare.component';

import { AdminAsistenciaComponent } from '../pages/admin-asistencia/admin-asistencia.component';
import { AdminAsistenciaInscripcionComponent } from '../pages/admin-asistencia/admin-asistencia-inscripcion/admin-asistencia-inscripcion.component';
import { AdminAsistenciaRegistroComponent } from '../pages/admin-asistencia/admin-asistencia-registro/admin-asistencia-registro.component';
import { AdminAsistenciaReportesComponent } from '../pages/admin-asistencia/admin-asistencia-reportes/admin-asistencia-reportes.component';
import { AdminAsistenciaExportarComponent } from '../pages/admin-asistencia/admin-asistencia-exportar/admin-asistencia-exportar.component';

import { AdminRecursosComponent } from '../pages/admin-recursos/admin-recursos.component';

import { AdminRecursosEventosComponent } from '../pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos.component';
import { AdminRecursosEventosSaveComponent } from '../pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos-save/admin-recursos-eventos-save.component';

import { AdminRecursosNoticiasComponent } from '../pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias.component';
import { AdminRecursosNoticiasSaveComponent } from '../pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias-save/admin-recursos-noticias-save.component';

import { AdminRecursosGruposComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos.component';
import { AdminRecursosGruposSaveComponent } from '../pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-save/admin-recursos-grupos-save.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: AdminHomeComponent },
    { path: 'profile', component: AdminProfileComponent },

    { path: 'instructores', component: AdminInstructoresComponent },
    { path: 'instructores/save', component: AdminInstructoresSaveComponent },

    { path: 'deportistas', component: AdminDeportistasComponent },
    { path: 'deportistas/save', component: AdminDeportistasSaveComponent },

    { path: 'deportistas/valoraciones', component: AdminValoracionesComponent },
    { path: 'deportistas/valoraciones/save', component: AdminValoracionesSaveComponent },
    { path: 'deportistas/valoraciones/compare', component: AdminValoracionesCompareComponent },

    { path: 'asistencia', component: AdminAsistenciaComponent },
    { path: 'asistencia/inscripcion', component: AdminAsistenciaInscripcionComponent },
    { path: 'asistencia/registro', component: AdminAsistenciaRegistroComponent },
    { path: 'asistencia/reportes', component: AdminAsistenciaReportesComponent },
    { path: 'asistencia/exportar', component: AdminAsistenciaExportarComponent },

    { path: 'recursos', component: AdminRecursosComponent },

    { path: 'recursos/eventos', component: AdminRecursosEventosComponent },
    { path: 'recursos/eventos/save', component: AdminRecursosEventosSaveComponent },

    { path: 'recursos/noticias', component: AdminRecursosNoticiasComponent },
    { path: 'recursos/noticias/save', component: AdminRecursosNoticiasSaveComponent },

    { path: 'recursos/grupos', component: AdminRecursosGruposComponent },
    { path: 'recursos/grupos/save', component: AdminRecursosGruposSaveComponent }
];