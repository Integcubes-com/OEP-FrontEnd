import { Injectable } from '@angular/core';
import { CAPAPILATEST, CAPLatestStatus } from './latest-status.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LatestStatusService {

  private readonly getDataURL = `${environment.apiUrl}/ChemistryDashboardLatestStatus/getLatestStatus`;
  private readonly deleteObservableURL = `${environment.apiUrl}/ChemistryDashboardLatestStatus/deletelatestStatus`;
  private readonly saveObservableURL = `${environment.apiUrl}/ChemistryDashboardLatestStatus/savelatestStatus`;

  
  constructor(private http: HttpClient) { }

  getObservations(userId: number): Observable<CAPAPILATEST> {
    let data = { "userId": userId }
    return this.http.post<CAPAPILATEST>(this.getDataURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveSite(obs: CAPLatestStatus, userId: number): Observable<CAPLatestStatus[]> {
    let data = { "latestStatus": obs , "userId":userId }
    return this.http.post<CAPLatestStatus[]>(this.saveObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  deleteObservation(obs: CAPLatestStatus, userId: number): Observable<CAPLatestStatus> {
    let data = { "latestStatus": obs , "userId":userId }
    return this.http.post<CAPLatestStatus>(this.deleteObservableURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
