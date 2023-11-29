import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIData, WH_WorkingCalcFilter, WorkingHourModel, workingMonthlyHours } from './working-cal.model';
import { environment } from 'src/environments/environment';
import { OT_IEquipments } from '../../outage-tracker/next-outages/site-next-outages.model';
import { APITimeline } from '../timeline/timeline.model';
import { CSites } from 'src/app/shared/common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class WorkingCalService {

  private readonly getWorkingURL = `${environment.apiUrl}/WH_WorkingHours/getWorkingHour`
  private readonly deleteWorkingURL = `${environment.apiUrl}/WH_WorkingHours/deleteWorkingHour`
  private readonly getEquipmentsURL = `${environment.apiUrl}/WH_NextOutages/getEquipments`
  private readonly saveWorkingURL = `${environment.apiUrl}/WH_WorkingHours/saveWorkingHour`
  private readonly getMonthlyURL = `${environment.apiUrl}/WH_WorkingHours/getYearlyWorkingHour`
  private readonly saveURL = `${environment.apiUrl}/WH_WorkingHours/saveHours`
  private readonly getTimeline = `${environment.apiUrl}/WH_WorkingHours/getTimeLine`
  private readonly siteURL = `${environment.apiUrl}/WH_WorkingHours/getSites`
  private readonly timeline2 = `${environment.apiUrl}/WH_Timeline/getTimeLine`

  
  
  constructor(private readonly http:HttpClient) { }

  getWorking(userId: number, filter:WH_WorkingCalcFilter): Observable<WorkingHourModel[]> {
    let data = { userId, filter }
    return this.http.post<WorkingHourModel[]>(this.getWorkingURL, data);
  }
  saveWorking(userId: number, result: WorkingHourModel): Observable<WorkingHourModel[]> {
    let data = { userId, result }
    debugger;
    return this.http.post<WorkingHourModel[]>(this.saveWorkingURL, data);
  }
  delete(result: WorkingHourModel, userId: number): Observable<WorkingHourModel[]> {
    let data = { userId, result }
    return this.http.post<WorkingHourModel[]>(this.deleteWorkingURL, data);
  }
  getEquipments(siteId: number): Observable<OT_IEquipments[]> {
    let data = { siteId }
    return this.http.post<OT_IEquipments[]>(this.getEquipmentsURL, data)
  }
  getMonthlyWorkingHours(userId: number,yearId:number, result: WorkingHourModel, typeId:number): Observable<APIData> {
    let data = { userId, result, typeId, yearId}
    return this.http.post<APIData>(this.getMonthlyURL, data)
  }
  saveWorkingHours(  yearlyResult,result,userId,typeId ): Observable<APIData> {
    let data = { userId, result, typeId, yearlyResult}
    return this.http.post<APIData>(this.saveURL, data)
  }
  getTimeLine( siteId:number): Observable<APITimeline> {
    let data = { siteId }
    return this.http.post<APITimeline>(this.getTimeline, data)
  }
  getSites(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteURL, data)
  }
  // getTimeline2(siteId:number): Observable<any> {
  //   let data = { siteId };
  //   return this.http.post<any>(this.timeline2, data)
  // }
  getTimeline2(siteId:number): Observable<any[]> {
    let data = { siteId };
    return this.http.get<any[]>(this.timeline2)
  }
}
