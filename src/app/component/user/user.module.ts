import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { UserSidebarModule } from './user-sidebar/user-sidebar.module';
import { UserRoutingModule } from './user.routing.module';

import { UserLayoutComponent } from './user-layout/user-layout.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { NavbarModule } from '../common/navbar/navbar.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        FontAwesomeModule,
        CommonModule,
        NavbarModule,
        UserSidebarModule,
        UserRoutingModule
    ],
    declarations: [
        UserLayoutComponent,
        //NavbarComponent
    ],
    entryComponents: [
    ]
})
export class UserModule { }