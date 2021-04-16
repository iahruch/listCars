import { MatSnackBar } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SnackServices {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(msg) {
    this.snackBar.open(msg, '', {
      duration: 1500,
    })
  }
}
