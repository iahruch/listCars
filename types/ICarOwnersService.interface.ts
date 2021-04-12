import { Observable } from 'rxjs'
import { OwnerEntityInterface } from './OwnerEntity.interface'
import { CarEntityInterface } from './CarEntity.interface'

export interface ICarOwnersServiceInterface {
  getOwners(): Observable<OwnerEntityInterface[]>
  getOwnerById(aId: number): Observable<OwnerEntityInterface>
  // createOwner(
  //   aLastName: string,
  //   aFirstName: string,
  //   aMiddleName: string,
  //   aCars: CarEntityInterface[]
  // ): Observable<OwnerEntityInterface>
  // editOwner(aOwner: OwnerEntityInterface): Observable<OwnerEntityInterface>
  // deleteOwner(aOwnerId: number): void
}
