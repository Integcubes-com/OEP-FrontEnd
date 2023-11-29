import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OT_SiteNextOutage, OT_NextOutages, OT_IEquipments, OMA_ContractOutageFilter } from './site-next-outages.model';

@Injectable({
  providedIn: 'root'
})
export class NextOutagesService {

  private readonly getSiteNextOutagsURL = `${environment.apiUrl}/OT_NextOutages/getSiteNextOutages`
  private readonly getInterfaceURL = `${environment.apiUrl}/OT_NextOutages/getInterfaces`
  private readonly saveSiteNextOutagesURL = `${environment.apiUrl}/OT_NextOutages/saveSiteNextOutages`
  private readonly deleteSiteNextOutagesURL = `${environment.apiUrl}/OT_NextOutages/deleteSiteNextOutages`
  private readonly getEquipmentsURL = `${environment.apiUrl}/OT_NextOutages/getEquipments`

  

  constructor(private http: HttpClient) { }
  getSiteOutages(userId: number, filter:OMA_ContractOutageFilter): Observable<OT_SiteNextOutage[]> {
    let data = { userId,filter }
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
  deleteSiteNextOutages(userId:number, siteNextOutage:OT_SiteNextOutage ):Observable<OT_SiteNextOutage[]>{
    let date = {"userId":userId,"siteNextOutage":siteNextOutage};
    return this.http.post<OT_SiteNextOutage[]>(this.deleteSiteNextOutagesURL, date)
  }
}
