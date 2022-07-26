import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FontAwesomeModule
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})
export class NavbarModule { }