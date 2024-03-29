
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  private config: MatSnackBarConfig = {
    duration: 4500,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  public success(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '',this.config);
  }

  public warn(msg: string) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}