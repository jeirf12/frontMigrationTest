import { Component, OnInit, ElementRef, AfterContentInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { faArrowLeft, faUser, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ADMIN_ROUTES } from '../../admin/admin-sidebar/admin-sidebar.component';
import { RouteInfo } from 'src/app/model/route-info';
import { USER_ROUTES } from '../../user/user-sidebar/user-sidebar.component';

export const MODULE_ADMIN: number = 1;
export const MODULE_USER: number = 2;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faSignOutAlt: IconDefinition = faSignOutAlt;
  faArrowLeft: IconDefinition = faArrowLeft;

  username: string;
  showBackButton: boolean = false;

  private routeInfoList: RouteInfo[] = [];

  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.username = this.authenticationService.currentUser.username;
    this.routeInfoList.push(...ADMIN_ROUTES);
    this.routeInfoList.push(...USER_ROUTES);
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
  }

  get routeInfo(): RouteInfo {
    const path = this.location.prepareExternalUrl(this.location.path());
    return this.routeInfoList.find(route => route.path === path || `/EstilosVidaSaludable${route.path}` === path);
  }

  getModuleIndex(path: string): number {
    if (path.indexOf("admin") !== -1) {
      return MODULE_ADMIN;
    } else {
      return MODULE_USER
    }
  }

  doLogout() {
    this.authenticationService.logout();
  }

  goBack() {
    this.location.back();
  }

  goToProfile() {
    this.authenticationService.goToProfile();
  }

}
