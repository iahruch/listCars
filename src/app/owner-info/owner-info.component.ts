import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

import * as FormValidator from './../shared/Validators/formValidators'
import { CarOwnersServiceService } from '../shared/services/carOwnersService.service'
import { OwnerEntityInterface } from '../shared/types/OwnerEntity.interface'

import { CarEntityInterface } from '../shared/types/CarEntity.interface'
import { SnackServices } from '../shared/services/snack.services'
import { log } from 'util'

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss'],
})
export class OwnerInfoComponent implements OnInit {
  owner: OwnerEntityInterface
  carForm: FormGroup

  isShow = true
  viewMode = false
  editMode = false
  createMode = false

  constructor(
    private carOwnersService: CarOwnersServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: SnackServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      let paramsUrl = params.get('params')

      if (paramsUrl === 'view') {
        this.viewMode = true
        this.getData(+params.get('id'))
      }

      if (paramsUrl === 'create') {
        this.createMode = true
        this.initializeForm()
      }

      if (paramsUrl === 'edit') {
        this.editMode = true
        this.getData(+params.get('id'))
      }
    })
  }

  getData(id): void {
    this.carOwnersService
      .getOwnerById(id)
      .subscribe((owner: OwnerEntityInterface) => {
        this.owner = owner
        this.initializeForm()
      })
  }

  initializeForm(): void {
    const { firstname, secondname, middlename, cars } = this.owner
    this.carForm = this.fb.group({
      firstname: [firstname, [Validators.required]],
      secondname: [secondname, [Validators.required]],
      middlename: [middlename, [Validators.required]],
      cars: this.fb.array(
        cars.map((car: CarEntityInterface) => this.generateCar(car))
      ),
    })

    this.isShow = false
  }

  get carsControl(): FormArray {
    return this.carForm.get('cars') as FormArray
  }
  get getControls() {
    return this.carForm.controls
  }

  generateCar(car): FormGroup {
    console.log('generateCar(car)', car)
    return this.fb.group({
      nameCar: [car.nameCar, [Validators.required]],
      numberCar: [
        car.numberCar,
        [Validators.required, FormValidator.ValidatorNumberCar],
      ],
      producer: [car.producer, [Validators.required]],
      year: [
        car.year,
        [
          Validators.required,
          Validators.pattern('^[1-9][0-9]{3}$'),
          FormValidator.ValidatorYear,
        ],
      ],
    })
  }

  //delete owner's car
  deleteCar(numberCar) {
    let ownerId = this.owner.id
    let cars = this.owner.cars.filter((car) => car.numberCar !== numberCar)
    this.owner = { ...this.owner, cars }
    this.carOwnersService.deleteCarOwner(ownerId, numberCar)
    this.initializeForm()
    this.snackBar.openSnackBar(`Car with number ${numberCar} was delete`)
  }

  //add new car
  addNewCar(): void {
    const car = {
      nameCar: '',
      numberCar: '',
      producer: '',
      year: 0,
    }

    this.carsControl.push(this.generateCar(car))
  }

  //Add and update data
  saveData(): void {
    console.log('this.carForm.value ', this.carForm.value)

    const newCar = {
      ...this.carForm.value,
      id: this.owner.id,
    }
    console.log('newCar ', newCar)
    if (this.editMode) {
      this.carOwnersService.editOwner(newCar).subscribe(() => {
        this.router.navigate(['/'])
      })
    } else {
      this.createNewOwner()
    }
  }
  //create new owner
  createNewOwner() {
    if (this.carForm.invalid) {
      this.snackBar.openSnackBar('???????????????? ?????????? ?????????????????? ??????????????????????!!!')
      return
    }
    const { cars, firstname, middlename, secondname } = this.carForm.value

    this.carOwnersService
      .createOwner(secondname, firstname, middlename, cars)
      .subscribe((data: OwnerEntityInterface) => {
        this.router.navigate(['/'])
      })
  }

  //go to main page
  goBack(): void {
    this.router.navigate(['/'])
  }
}
