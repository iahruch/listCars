import { Injectable } from '@angular/core'
import { ICarOwnersServiceInterface } from '../types/ICarOwnersService.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { OwnerEntityInterface } from '../types/OwnerEntity.interface'
import { CarEntityInterface } from '../types/CarEntity.interface'
import { catchError, tap } from 'rxjs/operators'
import { log } from 'util'

@Injectable()
export class CarOwnersServiceService implements ICarOwnersServiceInterface {
  baseUrl = 'api/owners'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  constructor(private http: HttpClient) {}

  getOwners(): Observable<OwnerEntityInterface[]> {
    return this.http.get<OwnerEntityInterface[]>(this.baseUrl).pipe(
      tap((_) => console.log('fetched owners')),
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
        return throwError(err)
      })
    )
  }

  deleteOwner(id: number): void {
    const url = `${this.baseUrl}/${id}`
    this.http
      .delete<OwnerEntityInterface>(url, this.httpOptions)
      .pipe(
        tap((_) => console.log(`owner was remove. Id:${id}`)),
        catchError((err) => {
          return throwError(err)
        })
      )
      .subscribe()
  }

  deleteCarOwner(idOwner: number, numberCar: string): void {
    const url = `${this.baseUrl}/${idOwner}/car/${numberCar}`

    this.http
      .delete<CarEntityInterface>(url, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Car was remove. Number:${numberCar}`)),
        catchError((err) => {
          return throwError(err)
        })
      )
      .subscribe()
  }

  editOwner(owner: OwnerEntityInterface): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${owner.id}`, owner, this.httpOptions)
      .pipe(
        tap(() => console.log(`updated owner id=${owner.id}`)),
        catchError((err) => {
          return throwError(err)
        })
      )
  }

  createOwner(
    secondname: string,
    firstname: string,
    middlename: string,
    cars: CarEntityInterface[]
  ): Observable<OwnerEntityInterface> {
    const ownerData = {
      firstname,
      secondname,
      middlename,
      cars,
    }
    return this.http
      .post<OwnerEntityInterface>(this.baseUrl, ownerData, this.httpOptions)
      .pipe(
        tap((newOwner: OwnerEntityInterface) =>
          console.log(`New data added ${newOwner.id}`)
        ),
        catchError((err) => {
          return throwError(err)
        })
      )
  }
}
