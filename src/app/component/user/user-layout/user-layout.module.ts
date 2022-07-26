import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserLayoutRoutes } from '../../user/user-layout/user-layout.routing.module';
import { UserHomeComponent } from '../pages/user-home/user-home.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { UserAsistenciaComponent } from '../pages/user-asistencia/user-asistencia.component';
import { UserValoracionesCompareComponent } from '../pages/user-valoraciones-compare/user-valoraciones-compare.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        RouterModule.forChild(UserLayoutRoutes)
    ],
    declarations: [
        UserHomeComponent,
        UserProfileComponent,
        UserAsistenciaComponent,
        UserValoracionesCompareComponent
    ]
})

export class UserLayoutModule { }