import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OMA_Technology } from '../add-program/program.model';
import { MitigationActionInterfaceAPI, OMA_Filter, OMA_KeyPhase, OMA_MitigationAction, OMA_MitigationActionSendApi, OMA_MitigationResult } from './mitigation.model';

@Injectable({
  providedIn: 'root'
})
export class AddMitigationService {

  private readonly getMitigationActionsAPI =  `${environment.apiUrl}/MitigationActionPlanActions/getMitigationActions`
  private readonly getMitigationInterfaceAPI =  `${environment.apiUrl}/MitigationActionPlanActions/getInterfaces`
  private readonly saveMitigationAction =  `${environment.apiUrl}/MitigationActionPlanActions/saveMitigationAction`
  private readonly deleteMitigationAction =  `${environment.apiUrl}/MitigationActionPlanActions/deleteMitigationAction`
  private readonly getMitigationResultURL =  `${environment.apiUrl}/MitigationActionPlanActions/getMitigationResult`
  private readonly editMitigationResultURL =  `${environment.apiUrl}/MitigationActionPlanActions/editMitigationAction`
private readonly saveMitigationResultURL = `${environment.apiUrl}/MitigationActionPlanActions/saveMitigationResult`
private readonly getMitigationActionReviewer = `${environment.apiUrl}/MitigationActionPlanActions/getMitigationResultReviewer`
private readonly saveMitigationResultReviewerURL = `${environment.apiUrl}/MitigationActionPlanActions/saveMitigationResultReview`

  constructor(private http: HttpClient) { }

  getMitigationActions(userId:number):Observable<OMA_MitigationAction[]>{
    let date = {"userId":userId};
    return this.http.post<OMA_MitigationAction[]>(this.getMitigationActionsAPI, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getEditMitigation(userId:number, actionId:number):Observable<OMA_KeyPhase[]>{
    let date = {"userId":userId, "actionId":actionId};
    return this.http.post<OMA_KeyPhase[]>(this.editMitigationResultURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getMitigationResult(userId:number, filter:OMA_Filter):Observable<OMA_MitigationResult[]>{
    let date = {"userId":userId, "filter":filter};
    return this.http.post<OMA_MitigationResult[]>(this.getMitigationResultURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getMitigationResultReview(userId:number, filter:OMA_Filter):Observable<OMA_MitigationResult[]>{
    let date = {"userId":userId, "filter":filter};
    return this.http.post<OMA_MitigationResult[]>(this.getMitigationActionReviewer, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  
  getInterface(userId:number):Observable<MitigationActionInterfaceAPI>{
    let date = {"userId":userId};
    return this.http.post<MitigationActionInterfaceAPI>(this.getMitigationInterfaceAPI, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveMitigationResultReview(mitigationResult:OMA_MitigationResult, userId:number):Observable<MitigationActionInterfaceAPI>{
    let date = {"userId":userId, "mitigationResult": mitigationResult};
    return this.http.post<MitigationActionInterfaceAPI>(this.saveMitigationResultReviewerURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveMitigationResult(mitigationResult:OMA_MitigationResult, userId:number):Observable<MitigationActionInterfaceAPI>{
    let date = {"userId":userId, "mitigationResult": mitigationResult};
    return this.http.post<MitigationActionInterfaceAPI>(this.saveMitigationResultURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  deleteMitigation(mitigationAction:OMA_MitigationAction, userId:number):Observable<OMA_MitigationAction>{
    let date = {"userId":userId , "mitigationAction":mitigationAction};
    return this.http.post<OMA_MitigationAction>(this.deleteMitigationAction, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveMitigation(mitigationAction:OMA_MitigationActionSendApi, userId:number):Observable<OMA_MitigationAction>{
    let date = {"userId":userId , "mitigationActionObj":mitigationAction};
    debugger;
    return this.http.post<OMA_MitigationAction>(this.saveMitigationAction, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
