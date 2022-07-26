import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';


const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        data: { roles: [TipoUsuario.SUPER.abreviatura, TipoUsuario.ADMINISTRADOR.abreviatura] },
        children: [
            {
                path: '', loadChildren: () => import('./admin-layout/admin-layout.module').then(m =>
                    m.AdminLayoutModule
                )
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }