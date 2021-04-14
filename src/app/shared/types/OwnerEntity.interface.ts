import { CarEntityInterface } from './CarEntity.interface'

export interface OwnerEntityInterface {
  id: number
  firstname: string
  secondname: string
  middlename: string
  cars: CarEntityInterface[]
}
