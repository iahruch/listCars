import { Injectable } from '@angular/core'
import { ICarOwnersServiceInterface } from '../types/ICarOwnersService.interface'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { OwnerEntityInterface } from '../types/OwnerEntity.interface'
import { CarEntityInterface } from '../types/CarEntity.interface'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class CarOwnersServiceService implements ICarOwnersServiceInterface {
  baseUrl = 'api/owners'

  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntityInterface[]> {
    return this.http.get<OwnerEntityInterface[]>(this.baseUrl).pipe(
      tap((_) => console.log('fetched heroes')),
      catchError((err) => {
        console.log(err)
        return throwError(err)
      })
    )
  }

  getOwnerById(id: number): Observable<OwnerEntityInterface> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<OwnerEntityInterface>(url).pipe(
      tap((_) => console.log(`fetched owner. Id:${id}`)),
      catchError((err) => {
        console.log(err)
        return throwError(err)
      })
    )
  }

  // getOwnerById(aId: number): Observable<OwnerEntityInterface> {}
  // createOwner(
  //   aLastName: string,
  //   aFirstName: string,
  //   aMiddleName: string,
  //   aCars: CarEntityInterface[]
  // ): Observable<OwnerEntityInterface> {}
  // editOwner(aOwner: OwnerEntityInterface): Observable<OwnerEntityInterface> {}
  // deleteOwner(aOwnerId: number): void {}
}
