import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OT_SiteNextOutage, OT_NextOutages, OT_IEquipments } from '../../outage-tracker/next-outages/site-next-outages.model';
import { WH_ContractOutage, WH_Outages, WH_IEquipments, WH_ContractOutageFilter } from './contract-outages.model';

@Injectable({
  providedIn: 'root'
})
export class ContractOutagesService {

  private readonly getSiteNextOutagsURL = `${environment.apiUrl}/WH_ContractOutages/getSiteNextOutages`
  private readonly getInterfaceURL = `${environment.apiUrl}/WH_ContractOutages/getInterfaces`
  private readonly saveSiteNextOutagesURL = `${environment.apiUrl}/WH_ContractOutages/saveSiteNextOutages`
  private readonly deleteSiteNextOutagesURL = `${environment.apiUrl}/WH_ContractOutages/deleteSiteNextOutages`
  private readonly getEquipmentsURL = `${environment.apiUrl}/WH_ContractOutages/getEquipments`



  constructor(private http: HttpClient) { }
  getSiteOutages(userId: number, filter:WH_ContractOutageFilter): Observable<WH_ContractOutage[]> {
    let data = { userId, filter }
    debugger;
    return this.http.post<WH_ContractOutage[]>(this.getSiteNextOutagsURL, data)
  }
  getInterfaces(userId: number): Observable<WH_Outages[]> {
    let data = { userId }
    return this.http.post<WH_Outages[]>(this.getInterfaceURL, data)
  }
  getEquipments(siteId:number): Observable<WH_IEquipments[]> {
    let data = { siteId }
    return this.http.post<WH_IEquipments[]>(this.getEquipmentsURL, data)
  }
  saveSiteNextOutages(userId:number, siteNextOutage:WH_ContractOutage ):Observable<WH_ContractOutage[]>{
    let date = {"userId":userId, "contractOutage":siteNextOutage};
    return this.http.post<WH_ContractOutage[]>(this.saveSiteNextOutagesURL, date)
  }
  deleteSiteNextOutages(userId:number, siteNextOutage:WH_ContractOutage ):Observable<WH_ContractOutage[]>{
    let date = {"userId":userId,"contractOutage":siteNextOutage};
    return this.http.post<WH_ContractOutage[]>(this.deleteSiteNextOutagesURL, date)
  }
}
