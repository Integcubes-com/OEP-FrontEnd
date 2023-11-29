import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URAPIData, URMenu, USubmitData, UserRole } from './role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly getURL = `${environment.apiUrl}/UserRole/getUserRoles`
  private readonly trashURL = `${environment.apiUrl}/UserRole/getTrash`
  private readonly restoreURL = `${environment.apiUrl}/UserRole/restoreTrash`
  private readonly deleteURL = `${environment.apiUrl}/UserRole/delete`
  private readonly saveURL = `${environment.apiUrl}/UserRole/saveUserRole`
  private readonly getEditURL = `${environment.apiUrl}/UserRole/editData`


  constructor(private http:HttpClient) { }
  getUserRole(userId:number):Observable<URAPIData>{
    let userID = {"userId":userId}
    return this.http.post<URAPIData>(this.getURL,userID).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  getEditData(role: UserRole, userId: number): Observable<URMenu[]> {
    let data = { "role": role, "userId": userId }
    return this.http.post<URMenu[]>(this.getEditURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  getTrash(userId:number):Observable<UserRole[]>{
    let userID = {"userId":userId}
    return this.http.post<UserRole[]>(this.trashURL,userID).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  restore(role:UserRole, userId:number):Observable<UserRole>{
    let data = {"role":role, "userId":userId};
    return this.http.post<UserRole>(this.restoreURL,data).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  delete(role:UserRole, userId:number):Observable<UserRole>{
    let data = {"role":role, "userId":userId};
    return this.http.post<UserRole>(this.deleteURL,data).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => this.handleError(err))
    )
  }
  save(data:USubmitData, userId:number):Observable<USubmitData>{
    let dataObj = {"data":data, "userId":userId}
    return this.http.post<USubmitData>(this.saveURL, dataObj).pipe(
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
