import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TAPIData, TFilterObj, TILs } from '../../tils/add-tils/add-tils.model';
import { TILEvaluation } from './til-evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class TilEvaluationService {
  private readonly getTilsURL = `${environment.apiUrl}/ReviewerTilEvaluation/getTils`;
  private readonly saveReviewURL = `${environment.apiUrl}/ReviewerTilEvaluation/saveReview`
  private readonly getInterfaceUrl = `${environment.apiUrl}/ReviewerTilEvaluation/getInterface`;

  
  constructor(private http:HttpClient) { }


  saveReviewUrl(til:TILEvaluation, userId):Observable<TILs>{
   let data = {
    til,
    userId
   }
    return this.http.post<TILs>(this.saveReviewURL, data)
  }

  getTils(userId:number, docTypeList:string, statusList:string, formList:string, focusList:string, severityList:string):Observable<TILEvaluation[]>{
   let data = {
    userId,
    statusList,
    docTypeList,
    formList,
    focusList,
    severityList
   }
    return this.http.post<TILEvaluation[]>(this.getTilsURL, data)
  }
  getInterfaces(userId:number):Observable<any>{
    let data = {
      userId
     }
      return this.http.post<any>(this.getInterfaceUrl, data)
  }

}
