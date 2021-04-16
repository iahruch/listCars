import { AbstractControl } from '@angular/forms'

export function ValidatorYear(control: AbstractControl) {
  let currentYear = new Date().getFullYear()
  if (1990 > control.value && control.value < currentYear) {
    return { invalidYear: true }
  }
  return null
}
export function ValidatorNumberCar(control: AbstractControl) {
  let regexp = new RegExp(/^[A-Z]{2}[0-9]{4}[A-Z]{2}/)

  if (regexp.test(control.value)) {
    return null
  } else {
    return { invalidNumber: !regexp.test(control.value) }
  }
}
