import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KPIConfigurations, KPIIndicatorGroup, KPIIndicator, formulaType } from './configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly getKPIUrl =  `${environment.apiUrl}/KPIConfigurator/getKPIsConfigurations`
  private readonly getIndicatorUrl =  `${environment.apiUrl}/KPIConfigurator/getIndicator`
  private readonly getIndicatorGroupUrl =  `${environment.apiUrl}/KPIConfigurator/getIndicatorGroup`
  private readonly saveKPIUrl =  `${environment.apiUrl}/KPIConfigurator/saveKpi`
private readonly deleteKPIUrl = `${environment.apiUrl}/KPIConfigurator/deleteKpi`
private readonly getFormulaUrl = `${environment.apiUrl}/KPIConfigurator/getFormula`
private readonly saveKPIIndicator = `${environment.apiUrl}/KPIConfigurator/saveIndicator`


  constructor(private http: HttpClient) { }

  deleteKpi(kpi:KPIConfigurations):Observable<KPIConfigurations[]>{
    return this.http.post<KPIConfigurations[]>(this.deleteKPIUrl, kpi)
  }
  saveKpiIndicator(kpi:KPIIndicator):Observable<KPIIndicator[]>{
    return this.http.post<KPIIndicator[]>(this.saveKPIIndicator, kpi)
  }
  getKPIs(userId:number, siteId:number):Observable<KPIConfigurations[]>{
    let data = {userId, siteId};
    return this.http.post<KPIConfigurations[]>(this.getKPIUrl, data)
  }
  getIndicatorGroup(userId:number):Observable<KPIIndicatorGroup[]>{
    let data = {userId};
    return this.http.post<KPIIndicatorGroup[]>(this.getIndicatorGroupUrl, data)
  }
  getFormula(userId:number):Observable<formulaType[]>{
    let data = {userId};
    return this.http.post<formulaType[]>(this.getFormulaUrl, data)
  }
  getIndicator(userId:number, groupId:number):Observable<KPIIndicator[]>{
    let data = {userId, groupId};
    return this.http.post<KPIIndicator[]>(this.getIndicatorUrl, data)
  }
  saveKpi(kpi:KPIConfigurations):Observable<KPIConfigurations[]>{
    return this.http.post<KPIConfigurations[]>(this.saveKPIUrl, kpi)
  }
}
