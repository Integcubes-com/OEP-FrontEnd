import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KPIData } from './monthly-kpi.model';

@Injectable({
  providedIn: 'root'
})
export class MonthlyKpiService {

  private readonly getKPIs =  `${environment.apiUrl}/KPIMonthlyBusinessProcess/getKPIsIndicator`
  private readonly saveKPIs =  `${environment.apiUrl}/KPIMonthlyBusinessProcess/saveKPIIndicator`
  private readonly getInterfaceKPIsUrl =  `${environment.apiUrl}/KPIMonthlyBusinessProcess/getInterfaces`

  constructor(private http: HttpClient) { }


  getMonthlyKPIs(userId:number, siteId:number, monthId:number, yearId:number):Observable<KPIData[]>{
    let data = {userId, siteId, monthId, yearId};
    return this.http.post<KPIData[]>(this.getKPIs, data)
  }

  saveMonthlyKPIs(userId: number, kpi: KPIData[], siteId: number, monthId: number, yearId: number): Observable<KPIData[]> {
    let data = { userId, kpi, siteId, monthId, yearId };
    return this.http.post<KPIData[]>(this.saveKPIs, data)
  }
}
