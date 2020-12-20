import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class SnackBarService {

    constructor(private matSnackBar: MatSnackBar){}
    openSuccessSnackBar(message: string, action: string) {
        this.matSnackBar.open(message, action, {
          duration: 2000,
          panelClass: ['success-snack-bar']
        });
      }

}