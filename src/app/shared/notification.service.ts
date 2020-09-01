import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    showNotification(message: string, error = false): void {
        const duration = 5000;
        this.snackBar.open(message, 'Close', {
            duration: error ? duration * 10 : duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: error ? ['error-notification'] : ['success-notification']
        });
    }
}
