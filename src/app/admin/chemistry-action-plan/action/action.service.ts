import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CAPAcAPI, CAPAction, CAPObservation, CAPSites } from '../observation/observation.model';
import { CAPAcEndAPI, CAPAcEndFilter, CAPFilterApi } from './action.model';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private readonly getSitesURL = `${environment.apiUrl}/ChemistryActionPlanAction/getSites`;
  private readonly getActionURL = `${environment.apiUrl}/ChemistryActionPlanAction/getActions`;
  private readonly saveActionURL = `${environment.apiUrl}/ChemistryActionPlanAction/saveAction`;
  private readonly filerActionURL = `${environment.apiUrl}/ChemistryActionPlanAction/filterAction`;
  private readonly getActionReportURL = `${environment.apiUrl}/ChemistryActionPlanAction/getActionsReport`;
  private readonly getActionsReportURL = `${environment.apiUrl}/ChemistryActionPlanAction/getFilterActionsReport`;
  private readonly saveObservableURL = `${environment.apiUrl}/ChemistryActionPlan/saveObservations`;

  

  constructor(private http: HttpClient) { }
getActionReport(userId: number): Observable<CAPAcEndAPI> {
  let data = { "userId": userId }
  return this.http.post<CAPAcEndAPI>(this.getActionReportURL, data).pipe(
    tap(data => console.log(JSON.stringify(data))),
  )
}
  getObservationActions(userId: number): Observable<CAPAcEndAPI> {
    let data = { "userId": userId }
    return this.http.post<CAPAcEndAPI>(this.getActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveAction(act: CAPAction, userId: number): Observable<CAPAction> {
    debugger;
    let data = { "action": act, "userId": userId }
    return this.http.post<CAPAction>(this.saveActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getSites(regionId, userId: number): Observable<CAPSites[]> {
    let data = { "regionId": regionId, "userId": userId }
    return this.http.post<CAPSites[]>(this.getSitesURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  filter(userId:number,regionList:string, siteList:string, statusList:string): Observable<CAPFilterApi>{
    let data = { "userId": userId , "regionList":regionList, "siteList":siteList, "statusList":statusList};
    return this.http.post<CAPFilterApi>(this.filerActionURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  filterReport( userId:number,regionList:string, siteList:string, statusList:string): Observable<CAPFilterApi>{
    let data = { "userId": userId , "regionList":regionList, "siteList":siteList, "statusList":statusList};
    debugger;
    return this.http.post<CAPFilterApi>(this.getActionsReportURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveSite(obs: CAPObservation, userId: number): Observable<CAPObservation> {
    let data = { "observation": obs , "userId":userId }
    return this.http.post<CAPObservation>(this.saveObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
