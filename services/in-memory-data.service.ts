import { Injectable } from '@angular/core'
import { OwnerEntityInterface } from '../types/OwnerEntity.interface'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const owners = [
      {
        id: 1,
        firstname: 'Logan ',
        secondname: 'Barber',
        middlename: 'Li',
        cars: [
          {
            nameCar: 'Toyota Camry',
            numberCar: 'AX1111HP',
            producer: 'Toyota Motor Corporation',
            year: 1999,
          },
        ],
      },
      {
        id: 2,
        firstname: 'John',
        secondname: 'C',
        middlename: 'Lincon',
        cars: [
          {
            nameCar: 'Toyota Mark 2',
            numberCar: 'AX2222HP',
            producer: 'Toyota Motor Corporation',
            year: 1900,
          },
        ],
      },
    ]

    return { owners }
  }

  genId(owners: OwnerEntityInterface[]): number {
    return owners.length > 0
      ? Math.max(...owners.map((owner) => owner.id)) + 1
      : 1
  }
}
