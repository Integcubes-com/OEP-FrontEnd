import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UAPIData, UFormSubmit, UUser, UUserInfo } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly getUsersURL = `${environment.apiUrl}/AddUser/getUser`;
  private readonly deleteURL = `${environment.apiUrl}/AddUser/delete`;
  private readonly restoreURL = `${environment.apiUrl}/AddUser/restore`;
  private readonly trashURL = `${environment.apiUrl}/AddUser/getTrash`;
  private readonly saveURL = `${environment.apiUrl}/AddUser/saveUser`;
  private readonly getInfoURL = `${environment.apiUrl}/AddUser/getUserInfo`;


  constructor(private http:HttpClient) { }
  getUser(userId:number):Observable<UAPIData>{
    let userID = {"userId":userId};
    return this.http.post<UAPIData>(this.getUsersURL, userID).pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(err => this.handleError(err))
    )
  }
  delete(user:UUser, userId:number):Observable<UUser>{
    return this.http.post<UUser>(this.deleteURL,user).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  restore(user:UUser, userId:number):Observable<UUser>{
    return this.http.post<UUser>(this.restoreURL,user).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  getTrash(userId:number):Observable<UUser[]>{
    let userID = {"userId":userId};
    return this.http.post<UUser[]>(this.trashURL,userID).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  getInfo(userId:number, info:UUser):Observable<UUserInfo>{
    let userData = {"info":info, "userId":userId};
    return this.http.post<UUserInfo>(this.getInfoURL,userData).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  saveUser(userId:number, data:UFormSubmit):Observable<UUser>{
    let userData = {"data":data, "userId":userId}
    return this.http.post<UUser>(this.saveURL, userData).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
