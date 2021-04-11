import { Injectable } from '@angular/core'
import { ICarOwnersServiceInterface } from '../types/ICarOwnersService.interface'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { OwnerEntityInterface } from '../types/OwnerEntity.interface'
import { CarEntityInterface } from '../types/CarEntity.interface'

@Injectable()
export class ICarOwnersServiceService implements ICarOwnersServiceInterface {
  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntityInterface[]> {}
  getOwnerById(aId: number): Observable<OwnerEntityInterface> {}
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntityInterface[]
  ): Observable<OwnerEntityInterface> {}
  editOwner(aOwner: OwnerEntityInterface): Observable<OwnerEntityInterface> {}
  deleteOwner(aOwnerId: number): void {}
}
