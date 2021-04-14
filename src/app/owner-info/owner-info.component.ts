import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import * as FormValidator from './../shared/Validators/formValidators'
import { CarOwnersServiceService } from '../shared/services/carOwnersService.service'
import { OwnerEntityInterface } from '../shared/types/OwnerEntity.interface'
import { collectExternalReferences } from '@angular/compiler'
import { CarEntityInterface } from '../shared/types/CarEntity.interface'
import { SnackServices } from '../shared/services/snack.services'

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss'],
})
export class OwnerInfoComponent implements OnInit {
  owner: OwnerEntityInterface
  carForm: FormGroup
  isShow = false

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
        this.getData(+params.get('id'))
      }

      if (paramsUrl === 'create') {
        const emptyOwner = {
          id: 1,
          firstname: '',
          secondname: '',
          middlename: '',
          cars: [{ nameCar: '', numberCar: '', producer: '', year: 0 }],
        }
        this.owner = emptyOwner
        this.initializeForm()
      }

      if (paramsUrl === 'edit') {
        this.getData(+params.get('id'))
      }
    })
    // setTimeout(() => {
    //   this.isShow = true
    //   console.log('isShow ', this.isShow)
    // }, 1000)
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
      firstnameControl: [firstname, [Validators.required]],
      secondnameControl: [secondname, [Validators.required]],
      middlenameControl: [middlename, [Validators.required]],
      carsControl: this.fb.array(
        cars.map((car: CarEntityInterface) => this.generateCar(car))
      ),
    })
  }

  generateCar(car): FormGroup {
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
          Validators.pattern('^[1-9][0-9]{3}'),
          FormValidator.ValidatorYear,
        ],
      ],
    })
  }

  get getControls() {
    return this.carForm.controls
  }

  get carsControl() {
    return this.carForm.controls.carsControl['controls']
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
    this.carForm.controls.carsControl['controls'].push(this.generateCar(car))

    console.log(this.carForm)
  }

  //Add and update data
  saveData(): void {
    if (this.carForm.invalid) {
      this.snackBar.openSnackBar('Значение формы заполнены некорректно!!!')
      return
    }
    const {
      carsControl: aCars,
      firstnameControl: aFirstName,
      middlenameControl: aMiddleName,
      secondnameControl: aLastName,
    } = this.carForm.value
    console.log('saveData', this.carForm.value)
    console.log('this.owner', this.owner)
    this.carOwnersService
      .createOwner(aLastName, aFirstName, aMiddleName, aCars)
      .subscribe((data) => {
        this.router.navigate(['/'])
      })
  }

  //go to main page
  goBack(): void {
    this.router.navigate(['/'])
  }
}
