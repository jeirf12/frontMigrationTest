import { Routes } from '@angular/router';

import { UserHomeComponent } from '../pages/user-home/user-home.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { UserAsistenciaComponent } from '../pages/user-asistencia/user-asistencia.component';
import { UserValoracionesCompareComponent } from '../pages/user-valoraciones-compare/user-valoraciones-compare.component';

export const UserLayoutRoutes: Routes = [
    { path: 'dashboard', component: UserHomeComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'asistencia', component: UserAsistenciaComponent },
    { path: 'dashboard/valoraciones/compare', component: UserValoracionesCompareComponent }
];