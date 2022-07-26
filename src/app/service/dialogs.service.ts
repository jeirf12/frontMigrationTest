import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfirmComponent } from '../component/common/dialog/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { MonthPickerComponent } from '../component/common/dialog/month-picker/month-picker.component';
import { DateUtil } from '../util/date-util';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private modalService: NgbModal,
    private toast: ToastrService
  ) { }

  showConfirmDialog(title: string, description: string, confirmationLabel: string, isCancelable: boolean) {
    const modalRef = this.modalService.open(DialogConfirmComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: isCancelable
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.confirmationLabel = confirmationLabel;
    modalRef.componentInstance.isCancelable = isCancelable;
    return modalRef.componentInstance.responseEvent;
  }

  showDeleteConfirmDialog(tag: string, item: string) {
    const title = "Eliminar " + tag;
    const description = "¿Está seguro que desea eliminar " + tag + " <b>«" + item + "»</b>?";
    return this.showConfirmDialog(title, description, "Si, Eliminar", true);
  }

  showInfoDialog(title: string, description: string) {
    return this.showConfirmDialog(title, description, "Aceptar", false);
  }

  showViewDialog<T>(content: any, item: T) {
    const modalRef = this.modalService.open(content, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.item = item;
  }

  showViewDialogWithDismiss<T>(content: any, item: T) {
    const modalRef = this.modalService.open(content, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.item = item;
  }

  showEventNewsDialog<T>(content: any, item: T) {
    const modalRef = this.modalService.open(content, {
      centered: true
    });
    modalRef.componentInstance.item = item;
  }

  showToast(message: string, success: boolean) {
    if (success) {
      this.toast.success(message);
    } else {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      elemMainPanel.scrollTop = 0;
      this.toast.error(message);
    }
  }

  showMonthPicker(month?: number, year?: number) {
    const date: Date = new Date();
    if (month) date.setMonth(month - 1);
    if (year) date.setFullYear(year);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const modalRef = this.modalService.open(MonthPickerComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.date = DateUtil.dateToStructure(date);
    return modalRef.componentInstance.responseEvent
  }

}
