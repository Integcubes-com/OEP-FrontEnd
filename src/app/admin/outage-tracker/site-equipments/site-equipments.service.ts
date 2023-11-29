import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SEFilter, SEAPIData, SEInterfaceAPI, SiteEquipment, SESites, SEUser } from '../../action-tracker/site-equipment/site-equipment-main/site-equipment.model';

@Injectable({
  providedIn: 'root'
})
export class SiteEquipmentsService {

  private readonly getSiteEquipmentURL = `${environment.apiUrl}/OT_SiteEquipment/getSiteEquipment`
  private readonly saveURL = `${environment.apiUrl}/OT_SiteEquipment/saveSiteEquipment`
  private readonly deleteURL = `${environment.apiUrl}/OT_SiteEquipment/deleteSiteEquipment`
  // private readonly filterURL = `${environment.apiUrl}/OT_SiteEquipment/filterSiteEquipment`
  // private readonly getSitesURL = `${environment.apiUrl}/OT_SiteEquipment/getFilterSites`
  // private readonly getUsersURL = `${environment.apiUrl}/OT_SiteEquipment/getFilterUsers`
  private readonly getInterfaceURL = `${environment.apiUrl}/OT_SiteEquipment/getInterfaces`
  constructor(private http:HttpClient) { }

  getSiteEquipment(userId:number, filter:SEFilter):Observable<SEAPIData>{
    let data ={"userId":userId, "filterObj":filter}
    return this.http.post<SEAPIData>(this.getSiteEquipmentURL, data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
  getInterfaces(userId:number):Observable<SEInterfaceAPI>{
    let data ={"userId":userId}
    return this.http.post<SEInterfaceAPI>(this.getInterfaceURL, data).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    )
  }
  // filter(filter:SEFilter):Observable<SiteEquipment[]>{
  //   return this.http.post<SiteEquipment[]>(this.filterURL, filter).pipe(
  //     tap(data=>console.log(JSON.stringify(data))),
  //   )
  // }
  // getSites(regionId:number, userId: number): Observable<SESites[]> {
  //   let data = { "regionId": regionId , "userId":userId }
  //   return this.http.post<SESites[]>(this.getSitesURL, data).pipe(
  //     tap(data => console.log(JSON.stringify(data))),
  //   )
  // }
  // getUserId(siteId:number, userId: number): Observable<SEUser[]> {
  //   let data = { "siteId": siteId , "userId":userId }
  //   return this.http.post<SEUser[]>(this.getUsersURL, data).pipe(
  //     tap(data => console.log(JSON.stringify(data))),
  //   )
  // }
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
