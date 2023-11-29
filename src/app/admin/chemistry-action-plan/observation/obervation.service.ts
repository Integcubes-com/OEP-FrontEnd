import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CAPAcAPI, CAPAction, CAPObsAPI, CAPObservation, CAPSites } from './observation.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObervationService {

  private readonly getObservableURL = `${environment.apiUrl}/ChemistryActionPlan/getObservations`;
  private readonly saveObservableURL = `${environment.apiUrl}/ChemistryActionPlan/saveObservations`;
  private readonly deleteObservableURL = `${environment.apiUrl}/ChemistryActionPlan/deleteObservations`;
  private readonly getSitesURL = `${environment.apiUrl}/ChemistryActionPlan/getSites`;


  private readonly getActionURL = `${environment.apiUrl}/ChemistryActionPlan/getActions`;
  private readonly saveActionURL = `${environment.apiUrl}/ChemistryActionPlan/saveAction`;
  private readonly deleteActionURL = `${environment.apiUrl}/ChemistryActionPlan/deleteAction`;



  constructor(private http: HttpClient) { }


  getObservations(userId: number, regionList:string, siteList:string): Observable<CAPObsAPI> {
    let data = { "userId": userId , "regionList":regionList, "siteList":siteList}
    debugger;
    return this.http.post<CAPObsAPI>(this.getObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  deleteObservation(obs: CAPObservation, userId: number): Observable<CAPObsAPI> {
    let data = { "observation": obs , "userId":userId }
    return this.http.post<CAPObsAPI>(this.deleteObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getObservationActions(observationId:number, userId:number, actionId:number): Observable<CAPAcAPI>{
    let data = { "observationId": observationId , "userId":userId , "actionId":actionId}
    return this.http.post<CAPAcAPI>(this.getActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveSite(obs: CAPObservation, userId: number): Observable<CAPObservation> {
    let data = { "observation": obs , "userId":userId }
    return this.http.post<CAPObservation>(this.saveObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveAction(act: CAPAction, userId: number): Observable<CAPAction> {
    let data = { "action": act , "userId":userId }
    debugger;

    return this.http.post<CAPAction>(this.saveActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  deleteAction(action: CAPAction, userId: number): Observable<CAPObservation> {
    let data = { "action": action , "userId":userId }
    return this.http.post<CAPObservation>(this.deleteActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getSites(regionId, userId: number): Observable<CAPSites[]> {
    let data = { "regionId": regionId , "userId":userId }
    return this.http.post<CAPSites[]>(this.getSitesURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
