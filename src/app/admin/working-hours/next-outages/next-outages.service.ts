import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OT_SiteNextOutage, OT_NextOutages, OT_IEquipments } from '../../outage-tracker/next-outages/site-next-outages.model';
import { WH_ProposedOutageFilter } from './next-outages.model';

@Injectable({
  providedIn: 'root'
})
export class NextOutagesService {

  private readonly getSiteNextOutagsURL = `${environment.apiUrl}/WH_NextOutages/getSiteNextOutages`
  private readonly getInterfaceURL = `${environment.apiUrl}/WH_NextOutages/getInterfaces`
  private readonly saveSiteNextOutagesURL = `${environment.apiUrl}/WH_NextOutages/saveSiteNextOutages`
  private readonly saveActualOutagesURL = `${environment.apiUrl}/WH_NextOutages/saveActualOutages`

  private readonly deleteSiteNextOutagesURL = `${environment.apiUrl}/WH_NextOutages/deleteSiteNextOutages`
  private readonly getEquipmentsURL = `${environment.apiUrl}/WH_NextOutages/getEquipments`

  

  constructor(private http: HttpClient) { }
  getSiteOutages(userId: number, filter:WH_ProposedOutageFilter): Observable<OT_SiteNextOutage[]> {
    let data = { userId , filter}
    return this.http.post<OT_SiteNextOutage[]>(this.getSiteNextOutagsURL, data)
  }
  getInterfaces(userId: number): Observable<OT_NextOutages[]> {
    let data = { userId }
    return this.http.post<OT_NextOutages[]>(this.getInterfaceURL, data)
  }
  getEquipments(siteId:number): Observable<OT_IEquipments[]> {
    let data = { siteId }
    return this.http.post<OT_IEquipments[]>(this.getEquipmentsURL, data)
  }
  saveSiteNextOutages(userId:number, siteNextOutage:OT_SiteNextOutage ):Observable<OT_SiteNextOutage[]>{
    let date = {"userId":userId, "siteNextOutage":siteNextOutage};
    return this.http.post<OT_SiteNextOutage[]>(this.saveSiteNextOutagesURL, date)
  }
  saveActualOutages(userId:number, siteNextOutage:OT_SiteNextOutage ):Observable<OT_SiteNextOutage[]>{
    let date = {"userId":userId, "siteNextOutage":siteNextOutage};
    return this.http.post<OT_SiteNextOutage[]>(this.saveActualOutagesURL, date)
  }
  deleteSiteNextOutages(userId:number, siteNextOutage:OT_SiteNextOutage ):Observable<OT_SiteNextOutage[]>{
    let date = {"userId":userId,"siteNextOutage":siteNextOutage};
    return this.http.post<OT_SiteNextOutage[]>(this.deleteSiteNextOutagesURL, date)
  }
}
