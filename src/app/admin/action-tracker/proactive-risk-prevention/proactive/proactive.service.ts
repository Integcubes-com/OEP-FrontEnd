import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProactiveInterface, ProactiveProjectPhase, ProactiveRiskPrevention, ProactiveSaveObj } from './proactive.model';

@Injectable({
  providedIn: 'root'
})
export class ProactiveService {
  private readonly getProactiveURL = `${environment.apiUrl}/ProactiveRiskPrevention/getProactives`
  private readonly getInterfacesURL = `${environment.apiUrl}/ProactiveRiskPrevention/getInterfaces`
  private readonly saveProactiveURL = `${environment.apiUrl}/ProactiveRiskPrevention/saveProactive`
  private readonly deleteProactiveURL = `${environment.apiUrl}/ProactiveRiskPrevention/deleteProactive` 
  private readonly getSpecificURL = `${environment.apiUrl}/ProactiveRiskPrevention/getSpecificObject`
  
  constructor(private http: HttpClient) { }
  getProactives(userId: number): Observable<ProactiveRiskPrevention[]> {
    let data = { userId }
    return this.http.post<ProactiveRiskPrevention[]>(this.getProactiveURL, data)
  }
  getInterfaces(userId: number): Observable<ProactiveInterface> {
    let data = { userId }
    return this.http.post<ProactiveInterface>(this.getInterfacesURL, data)
  }
  getSpecificItem(ProactiveRiskPrevention): Observable<ProactiveProjectPhase[]> {
    return this.http.post<ProactiveProjectPhase[]>(this.getSpecificURL, ProactiveRiskPrevention)
  }
  saveProactive(obj:ProactiveSaveObj, userId):Observable<ProactiveRiskPrevention>{
    let data = { obj, userId }
    return this.http.post<ProactiveRiskPrevention>(this.saveProactiveURL, data)
  }
  deleteProactive(ProactiveRiskPrevention):Observable<ProactiveRiskPrevention>{
    return this.http.post<ProactiveRiskPrevention>(this.deleteProactiveURL, ProactiveRiskPrevention)
  }
}
