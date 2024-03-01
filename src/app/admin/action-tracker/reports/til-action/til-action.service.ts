import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TilActionReport } from './til-action.model';
import { TilDetailReport, TilReportInteface } from '../til-detail/til-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TilActionService {
  constructor(private http: HttpClient) { }
  private readonly getTilReportUrl = `${environment.apiUrl}/TIlActionReport/getReport`
  private readonly getReportInterfaceUrl = `${environment.apiUrl}/TIlActionReport/getInterfaces`
  getActionTracker(regionList: string, clusterList: string, siteList: string, unitList: string, statusList: string, timmingList: string, focusList: string, severityList: string): Observable<TilActionReport[]> {
    let data = {
      regionList,
      clusterList,
      siteList,
      unitList,
      statusList,
      timmingList,
      focusList,
      severityList,
    }
    return this.http.post<TilActionReport[]>(this.getTilReportUrl, data)
  }
  getInterfaces(userId: number): Observable<TilReportInteface> {
    let data = { userId };
    return this.http.post<TilReportInteface>(this.getReportInterfaceUrl, data)
  }
}
