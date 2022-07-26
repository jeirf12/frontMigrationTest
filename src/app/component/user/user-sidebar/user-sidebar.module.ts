import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserSidebarComponent } from './user-sidebar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [UserSidebarComponent],
    exports: [UserSidebarComponent]
})
export class UserSidebarModule { }