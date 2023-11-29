import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TAPIData, TFilterObj, TILs } from '../../tils/add-tils/add-tils.model';

@Injectable({
  providedIn: 'root'
})
export class TilEvaluationService {
  private readonly getTilsURL = `${environment.apiUrl}/ReviewerTilEvaluation/getTils`;
  private readonly saveReviewURL = `${environment.apiUrl}/ReviewerTilEvaluation/saveReview`
  private readonly filterUrl = `${environment.apiUrl}/TilsBulletin/filter`

  
  constructor(private http:HttpClient) { }


  saveReviewUrl(til:TILs, userId):Observable<TILs>{
    let TIL = {"til":til};
    let userID={"userId":userId};
    var merged = Object.assign(TIL, userID);
    return this.http.post<TILs>(this.saveReviewURL, merged)
  }


}
