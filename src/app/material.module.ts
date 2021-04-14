import { NgModule } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

const modules = [
  MatTableModule,
  MatFormFieldModule,
  MatListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
]

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
