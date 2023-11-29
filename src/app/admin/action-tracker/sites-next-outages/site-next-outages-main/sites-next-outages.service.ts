import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NextOutages, SiteNextOutage } from './site-next-outages.model';
import { OT_IEquipments } from 'src/app/admin/outage-tracker/next-outages/site-next-outages.model';

@Injectable({
  providedIn: 'root'
})
export class SitesNextOutagesService {

  private readonly getSiteNextOutage =  `${environment.apiUrl}/SiteNextOutages/GetSiteNextOutages`
  private readonly getInterfaces =  `${environment.apiUrl}/SiteNextOutages/getInterfaces`
  private readonly deleteSiteNextOutagesURL =  `${environment.apiUrl}/SiteNextOutages/deleteSiteNextOutages`
  private readonly saveSiteNextOutagesURL =  `${environment.apiUrl}/SiteNextOutages/saveSiteNextOutages`
  private readonly getEquipmentsURL =  `${environment.apiUrl}/SiteNextOutages/getEquipments`

  
  constructor(private http: HttpClient) { }

  getSitesNextOutages(userId:number):Observable<SiteNextOutage[]>{
    let date = {"userId":userId};
    debugger;
    return this.http.post<SiteNextOutage[]>(this.getSiteNextOutage, date)
  }
  getEquipments(siteId:number): Observable<OT_IEquipments[]> {
    let data = { siteId }
    return this.http.post<OT_IEquipments[]>(this.getEquipmentsURL, data)
  }
  getInterface(userId:number):Observable<NextOutages[]>{
    let date = {"userId":userId};
    return this.http.post<NextOutages[]>(this.getInterfaces, date)
  }
  deleteSiteNextOutages(userId:number, siteNextOutage:SiteNextOutage ):Observable<NextOutages[]>{
    let date = {"userId":userId,"siteNextOutage":siteNextOutage};
    return this.http.post<NextOutages[]>(this.deleteSiteNextOutagesURL, date)
  }
  saveSiteNextOutages(userId:number, siteNextOutage:SiteNextOutage ):Observable<NextOutages[]>{
    let date = {"userId":userId, "siteNextOutage":siteNextOutage};
    debugger;
    return this.http.post<NextOutages[]>(this.saveSiteNextOutagesURL, date)
  }
}
