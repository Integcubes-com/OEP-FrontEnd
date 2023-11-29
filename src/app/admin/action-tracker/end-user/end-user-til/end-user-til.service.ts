import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TAFilterObj } from './end-user-til.component';
import { ActionTilAddAPI, ActionTilInterfaceApi, ActionTrackerEndUser } from './til-tracker.model';

@Injectable({
  providedIn: 'root'
})
export class EndUserTilService {

  private readonly filterUrl = `${environment.apiUrl}/EndUserTil/filter`
  private readonly filterReportUrl = `${environment.apiUrl}/EndUserTil/filterReport`

  
  private readonly getURL = `${environment.apiUrl}/EndUserTil/getTils`;

  private readonly getInterfacesURL = `${environment.apiUrl}/EndUserTil/getInterfaces`;

  private readonly getReportURL = `${environment.apiUrl}/EndUserTil/getTilsReport`;
  private readonly saveURL = `${environment.apiUrl}/EndUserTil/saveTils`;
  private readonly uploadFileURL = `${environment.apiUrl}/EndUserTil/uploadFile`

  private readonly reportURL = `${environment.apiUrl}/AssignTilAction/downloadFile`

  constructor(private http: HttpClient) { }
  getActionTracker(userId: number, regionList:string, siteList:string, equipmentList:string, sapList:string, statusList:string,daysList:string, focusList:string, severityList:string, priorityList:string): Observable<ActionTilAddAPI> {
    let userID = {userId, regionList, siteList, equipmentList, sapList, statusList, daysList, focusList, severityList, priorityList};
    return this.http.post<ActionTilAddAPI>(this.getURL,userID).pipe(
      tap(data=>console.log(data))
    )
  }
  getActionTrackerReport(userId: number,regionList:string, siteList:string, equipmentList:string, sapList:string, statusList:string,daysList:string,focusList:string, severityList:string, priorityList:string): Observable<ActionTilAddAPI> {
    let userID = {userId, regionList, siteList, equipmentList, sapList, statusList, daysList,focusList, severityList,priorityList};
    return this.http.post<ActionTilAddAPI>(this.getReportURL,userID).pipe(
      tap(data=>console.log(data))
    )
  }
  getInterfaces(userId: number): Observable<ActionTilInterfaceApi> {
    let userID = {'userId':userId};
    return this.http.post<ActionTilInterfaceApi>(this.getInterfacesURL,userID)
  }

  uploadPDF(result:ActionTrackerEndUser ,data: ActionTrackerEndUser, userId: number):Observable<any>{
    const formData = new FormData();
    formData.append('tilReport',result.tilReport);
    formData.append('tatId', data.tilActionTrackerId.toString());
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.uploadFileURL, formData).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  filter(filterObj:TAFilterObj, userId:number):Observable<ActionTrackerEndUser[]>{
    let data = {"filter":filterObj, "userId":userId};
    return this.http.post<ActionTrackerEndUser[]>(this.filterUrl, data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    
    )
  }
  filterReport(filterObj:TAFilterObj, userId:number):Observable<ActionTrackerEndUser[]>{
    let data = {"filter":filterObj, "userId":userId};
    return this.http.post<ActionTrackerEndUser[]>(this.filterReportUrl, data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    
    )
  }
  downloadReport(tatId: number): Observable<any> {
    return this.http.post(`${this.reportURL}/${tatId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  saveActionTracker(action:ActionTrackerEndUser, userId:number):Observable<ActionTrackerEndUser>{
    debugger;
    let data = {"action":action, "userId":userId}
    return this.http.post<ActionTrackerEndUser>(this.saveURL,data).pipe(
      tap(data => console.log(JSON.stringify(data))),
     
    )
  }

}
