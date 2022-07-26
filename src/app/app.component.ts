import { Component, OnDestroy } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthenticationService } from './service/authentication.service';
import { DialogsService } from './service/dialogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = "Hora Saludable";
  lastPing?: Date = null;
  timedOut = false;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService
  ) {
    this.idle.setIdle(1);
    this.idle.setTimeout(900);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      if (this.authenticationService.currentUser) {
        this.dialogsService.showInfoDialog("La sesión expiró", "Tu sesión ha expirado por inactividad")
          .subscribe((confirmation: boolean) => {
            if (confirmation) {
              this.timedOut = true;
              this.authenticationService.logout();
              this.reset();
            }
          });
      } else {
        this.reset();
      }
    });

    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => { this.lastPing = new Date() });
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  ngOnDestroy(): void {
    this.authenticationService.logoutWithoutNav();
  }
}
