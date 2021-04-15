import { Component, OnInit } from '@angular/core'
import { CarOwnersServiceService } from '../shared/services/carOwnersService.service'
import { OwnerEntityInterface } from '../shared/types/OwnerEntity.interface'
import { SnackServices } from '../shared/services/snack.services'

@Component({
  selector: 'app-list-owners',
  templateUrl: './list-owners.component.html',
  styleUrls: ['./list-owners.component.scss'],
})
export class ListOwnersComponent implements OnInit {
  owners: OwnerEntityInterface[]
  idOwner: any
  isDisable = true
  checkedElem = new Map()

  displayedColumns: string[] = [
    'select',
    'secondname',
    'firstname',
    'middlename',
    'carsCount',
  ]
  constructor(
    private carOwnersService: CarOwnersServiceService,
    private snackBar: SnackServices
  ) {}

  ngOnInit(): void {
    this.getAllOwners()
  }

  getAllOwners(): void {
    this.carOwnersService
      .getOwners()
      .subscribe((owners: OwnerEntityInterface[]) => {
        this.owners = owners
      })
  }

  getIdOwner(id) {
    this.idOwner = id
    return this.idOwner
  }

  isChecked({ checked, source }, row) {
    if (this.checkedElem.size || !checked) {
      this.checkedElem.get('elem').checked = false
      this.checkedElem.clear()
      this.isDisable = true
    }

    if (checked) {
      source.checked = checked
      this.checkedElem.set('data', row)
      this.checkedElem.set('elem', source)
      this.getIdOwner(row.id)
    }

    if (this.checkedElem.size) {
      this.isDisable = false
    }
  }

  deleteOwnerCar() {
    this.owners = this.owners.filter((o) => o.id !== this.idOwner)
    this.carOwnersService.deleteOwner(this.idOwner)
    this.snackBar.openSnackBar('Owner was delete')
  }
}
