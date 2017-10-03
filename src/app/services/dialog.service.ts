import { Injectable } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Injectable()
export class DialogService {

  constructor(public dialog: MdDialog) {
  }

  openDialog(component: any, config: MdDialogConfig): MdDialogRef<any> {
    return this.dialog.open(component, config);
  }

  closeDialogs(): void {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }

}
