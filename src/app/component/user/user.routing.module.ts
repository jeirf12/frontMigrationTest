import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';


const routes: Routes = [
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        data: { roles: [TipoUsuario.SUPER.abreviatura, TipoUsuario.USUARIO.abreviatura] },
        children: [
            {
                path: '', loadChildren: () => import('./user-layout/user-layout.module').then(m =>
                    m.UserLayoutModule
                )
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }