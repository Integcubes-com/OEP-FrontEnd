import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { accountForm, experienceFom, userInfo } from './profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private readonly getUrl = `${environment.apiUrl}/UserProfiles/getUserProfile`;
  private readonly securityFormUrl = `${environment.apiUrl}/UserProfiles/securityForm`;
  private readonly accountFormUrl = `${environment.apiUrl}/UserProfiles/accountForm`;
  private readonly experienceFormUrl = `${environment.apiUrl}/UserProfiles/experienceForm`;

  private imageSubject = new BehaviorSubject<string>('');
  imageSubject$ = this.imageSubject.asObservable();
  constructor(private http:HttpClient) { }
  getData(id:number): Observable<userInfo> {
    let userID ={userId:id}
    return this.http.post<userInfo>(this.getUrl,userID)
    .pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(err=>this.handleError(err))
    )
  }
  updateImage(img:string){
    this.imageSubject.next(img);
  }
  saveSecurityForm(form:any, id:number):Observable<any>{
    let userID ={userId:id};
    let merged = Object.assign(form, userID);
    return this.http.post<any>(this.securityFormUrl, merged)
    .pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(err=>this.handleError(err))
    )
  }
  saveAccountForm(form:any, id:number, image:string):Observable<accountForm>{
    let userID ={userId:id};
    let img = {"uploadFile":image}
    let merged;
    if(image){
      merged = Object.assign(form, userID, img);
    }
    merged= Object.assign(form, userID);
    return this.http.post<accountForm>(this.accountFormUrl,merged)
    .pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(err=>this.handleError(err))
    )
  }
  saveExperienceForm(form:any, id:number):Observable<experienceFom>{
    let userID ={userId:id};
    let merged = Object.assign(form, userID);
    return this.http.post<experienceFom>(this.experienceFormUrl, merged)
    .pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(err=>this.handleError(err))
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
