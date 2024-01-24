import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TAPAPIData, TAPEditData, TAPEquipment, TAPFilterObj, TAPInterface, TAPSites, TAPUser, TASubmitObj, TilActionPackage } from './tils-tracker-assignment.model';
import { ActionTrackerEndUser, ActionTilAddAPI } from '../../end-user/end-user-til/til-tracker.model';

@Injectable({
  providedIn: 'root'
})
export class TilsTrackerService {

  private readonly getTilsAction = `${environment.apiUrl}/AssignTilAction/getAssignedActions`
  private readonly getInterfacesURL = `${environment.apiUrl}/AssignTilAction/getInterfaces`
  private readonly deleteTilsActionURL = `${environment.apiUrl}/AssignTilAction/deleteAssignedActions`
  private readonly getUpdateUsersURL = `${environment.apiUrl}/AssignTilAction/getUsersActions`
  private readonly saveURL = `${environment.apiUrl}/AssignTilAction/saveUsersActions`
  private readonly copyURL = `${environment.apiUrl}/AssignTilAction/copyAction`
  
  private readonly getSitesURL = `${environment.apiUrl}/AssignTilAction/getFilterSites`
  private readonly getEqURL = `${environment.apiUrl}/AssignTilAction/getFilterEq`
  private readonly getAPTURL = `${environment.apiUrl}/AssignTilAction/getTAT`
  private readonly deleteActionURL = `${environment.apiUrl}/AssignTilAction/deleteAction`
  private readonly saveActionURL = `${environment.apiUrl}/AssignTilAction/saveAction`


  private readonly reportURL = `${environment.apiUrl}/AssignTilAction/downloadFile`
  
  constructor(private http:HttpClient) { }
  getTilsActions(userId:number, filter:TAPFilterObj):Observable<TAPAPIData>{
    let data = {'userId':userId, "filter":filter};
    return this.http.post<TAPAPIData>(this.getTilsAction, data)
  }
  getTilsActionsList(userId:number, tilList:string, outageList:string, budgetList:string, reviewList:string, priority:string):Observable<TAPAPIData>{
    let data = { userId, tilList, outageList, budgetList, reviewList, priority };
    return this.http.post<TAPAPIData>(this.getTilsAction, data)
  }

  getInterfaces(userId:number):Observable<TAPInterface>{
    let data = {'userId':userId}
    return this.http.post<TAPInterface>(this.getInterfacesURL, data)
  }
  saveAction(act: ActionTrackerEndUser, userId: number): Observable<ActionTrackerEndUser> {
    let data = { "action": act , "userId":userId }
    return this.http.post<ActionTrackerEndUser>(this.saveActionURL, data)
  }
  downloadReport(tatId: number): Observable<any> {
    return this.http.post(`${this.reportURL}/${tatId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  deleteActionPackage(actionPackage: TilActionPackage): Observable<TilActionPackage> {
    return this.http.post<TilActionPackage>(this.deleteTilsActionURL, actionPackage)

  }
  deleteAction(action: ActionTrackerEndUser, userId: number): Observable<ActionTrackerEndUser> {
    let data = { "action": action , "userId":userId }
    return this.http.post<ActionTrackerEndUser>(this.deleteActionURL, data)
  }
  getActions(packageId:number, userId:number): Observable<ActionTilAddAPI>{
    let data = {"userId":userId, "packageId":packageId}
    return this.http.post<ActionTilAddAPI>(this.getAPTURL, data)
  }
  getUpdateUsers(actionPackage: TilActionPackage): Observable<TAPEditData> {
    return this.http.post<TAPEditData>(this.getUpdateUsersURL, actionPackage).pipe(
    )
  }
  updateActioPackage(data:TASubmitObj, userId:number):Observable<TilActionPackage>{
    let dataz = {"userId":userId, "data":data}
    return this.http.post<TilActionPackage>(this.saveURL,dataz).pipe(
    )
  }
  copyActioPackage(data:TilActionPackage, userId:number):Observable<TilActionPackage>{
    let dataz = {"userId":userId, "data":data}
    return this.http.post<TilActionPackage>(this.copyURL,dataz).pipe(
    )
  }
  getSites(regionId:number, userId: number): Observable<TAPSites[]> {
    let data = { "regionId": regionId , "userId":userId }
    return this.http.post<TAPSites[]>(this.getSitesURL, data).pipe(
    )
  }
  getEq(siteId:number, userId: number): Observable<TAPEquipment[]> {
    let data = { "siteId": siteId , "userId":userId }
    return this.http.post<TAPEquipment[]>(this.getEqURL, data).pipe(
    )
  }

}
