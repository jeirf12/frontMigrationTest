import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

import { AdminSidebarModule } from './admin-sidebar/admin-sidebar.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { AdminRoutingModule } from './admin.routing.module';
import { DialogConfirmComponent } from '../common/dialog/dialog-confirm/dialog-confirm.component';
import { AdminInstructoresViewComponent } from './pages/admin-instructores/admin-instructores-view/admin-instructores-view.component';
import { AdminDeportistasViewComponent } from './pages/admin-deportistas/admin-deportistas-view/admin-deportistas-view.component';
import { AdminRecursosEventosViewComponent } from './pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos-view/admin-recursos-eventos-view.component';
import { AdminRecursosNoticiasViewComponent } from './pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias-view/admin-recursos-noticias-view.component';
import { AdminRecursosGruposViewComponent } from './pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-view/admin-recursos-grupos-view.component';
import { AdminRecursosGruposHorarioComponent } from './pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-horario/admin-recursos-grupos-horario.component';

import { NgxImageCompressService } from 'ngx-image-compress';
import { MonthPickerComponent } from '../common/dialog/month-picker/month-picker.component';
import { NavbarModule } from '../common/navbar/navbar.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        FontAwesomeModule,
        CommonModule,
        AdminSidebarModule,
        NavbarModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminLayoutComponent,
        //NavbarComponent
    ],
    entryComponents: [
        DialogConfirmComponent,
        AdminInstructoresViewComponent,
        AdminDeportistasViewComponent,
        AdminRecursosEventosViewComponent,
        AdminRecursosNoticiasViewComponent,
        AdminRecursosGruposViewComponent,
        AdminRecursosGruposHorarioComponent,
        MonthPickerComponent
    ],
    providers: [
        NgxImageCompressService
    ]
})
export class AdminModule { }