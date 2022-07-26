import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminSidebarComponent } from './admin-sidebar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [AdminSidebarComponent],
    exports: [AdminSidebarComponent]
})
export class AdminSidebarModule { }