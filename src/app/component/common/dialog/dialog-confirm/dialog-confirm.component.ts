import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() confirmationLabel: string;
  @Input() isCancelable: boolean = true;
  @Output() responseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  sendResponse(response: boolean) {
    this.responseEvent.emit(response);
    this.activeModal.dismiss();
  }

}
