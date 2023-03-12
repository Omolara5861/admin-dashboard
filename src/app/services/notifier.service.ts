import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../shared/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
constructor(private snackBar: MatSnackBar) { }

/**
 *This method uses snackBar object of MatSnackBar to open a notification from a custom component called NotifierComponent. The notification is customized by passing some configuration options to openFromComponent method
 * @param displayMessage is the message to display in the notification
 * @param buttonText is the text to display on the action button of the notification
 * @param messageType is the type of notification to display. It can be either an error or success notification
 */
  showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'success') {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType
      },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: messageType
    });
  }
}
