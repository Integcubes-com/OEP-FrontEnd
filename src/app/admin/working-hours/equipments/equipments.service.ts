import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SEFilter, SEAPIData, SEInterfaceAPI, SiteEquipment } from '../../action-tracker/site-equipment/site-equipment-main/site-equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  private readonly getSiteEquipmentURL = `${environment.apiUrl}/WH_SiteEquipment/getSiteEquipment`
  private readonly saveURL = `${environment.apiUrl}/WH_SiteEquipment/saveSiteEquipment`
  private readonly deleteURL = `${environment.apiUrl}/WH_SiteEquipment/deleteSiteEquipment`
  private readonly getInterfaceURL = `${environment.apiUrl}/WH_SiteEquipment/getInterfaces`
  constructor(private http: HttpClient) { }

  getSiteEquipment(userId: number, filter: SEFilter): Observable<SEAPIData> {
    let data = { "userId": userId, "filterObj": filter }
    return this.http.post<SEAPIData>(this.getSiteEquipmentURL, data)
  }
  getInterfaces(userId: number): Observable<SEInterfaceAPI> {
    let data = { "userId": userId }
    return this.http.post<SEInterfaceAPI>(this.getInterfaceURL, data)
  }
  save(eqp: SiteEquipment, userId: number): Observable<SiteEquipment> {
    let data = { "equipment": eqp, "userId": userId };
    return this.http.post<SiteEquipment>(this.saveURL, data)
  }
  delete(eqp: SiteEquipment, userId: number): Observable<SiteEquipment> {
    let data = { "equipment": eqp, "userId": userId };
    return this.http.post<SiteEquipment>(this.deleteURL, data)
  }
}
