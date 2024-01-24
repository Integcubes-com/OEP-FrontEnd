import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SEAPIData, SEFilter, SEInterfaceAPI, SESites, SEUser, SiteEquipment } from './site-equipment.model';

@Injectable({
  providedIn: 'root'
})
export class SiteEquipmentService {

  private readonly getSiteEquipmentURL = `${environment.apiUrl}/SiteEquipment/getSiteEquipment`
  private readonly saveURL = `${environment.apiUrl}/SiteEquipment/saveSiteEquipment`
  private readonly deleteURL = `${environment.apiUrl}/SiteEquipment/deleteSiteEquipment`
  private readonly filterURL = `${environment.apiUrl}/SiteEquipment/filterSiteEquipment`
  private readonly getSitesURL = `${environment.apiUrl}/SiteEquipment/getFilterSites`
  private readonly getUsersURL = `${environment.apiUrl}/SiteEquipment/getFilterUsers`
  private readonly getInterfaceURL = `${environment.apiUrl}/SiteEquipment/getInterfaces`
  constructor(private http:HttpClient) { }

  // getSiteEquipment(userId:number, filter:SEFilter):Observable<SEAPIData>{
  //   let data ={"userId":userId, "filterObj":filter}
  //   return this.http.post<SEAPIData>(this.getSiteEquipmentURL, data).pipe(
  //     tap(data=>console.log(JSON.stringify(data))),
  //   )
  // }
  getSiteEquipments(userId: number, regionList: string, siteList: string, modelList: string, eqTypeList: string, oemList: string, clusterList: string): Observable<SEAPIData> {
    let data = { userId, regionList, siteList, modelList, eqTypeList, oemList, clusterList }
    return this.http.post<SEAPIData>(this.getSiteEquipmentURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getInterfaces(userId:number):Observable<SEInterfaceAPI>{
    let data ={"userId":userId}
    return this.http.post<SEInterfaceAPI>(this.getInterfaceURL, data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
  filter(filter:SEFilter):Observable<SiteEquipment[]>{
    return this.http.post<SiteEquipment[]>(this.filterURL, filter).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
  getSites(regionId:number, userId: number): Observable<SESites[]> {
    let data = { "regionId": regionId , "userId":userId }
    return this.http.post<SESites[]>(this.getSitesURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getUserId(siteId:number, userId: number): Observable<SEUser[]> {
    let data = { "siteId": siteId , "userId":userId }
    return this.http.post<SEUser[]>(this.getUsersURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  save(eqp:SiteEquipment, userId:number):Observable<SiteEquipment>{
    let data = {"equipment":eqp,"userId":userId};
    return this.http.post<SiteEquipment>(this.saveURL,data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
  delete(eqp:SiteEquipment, userId:number):Observable<SiteEquipment>{
    let data = {"equipment":eqp,"userId":userId};
    return this.http.post<SiteEquipment>(this.deleteURL,data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
}
