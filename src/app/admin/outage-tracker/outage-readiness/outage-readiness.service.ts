import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OT_IActionOwner, OT_OutageReadDesc, OT_OutageRediness, OT_SaveOutageReadDesc, OT_SelectedOutages, OT_SiteOutages } from './outage-readiness.model';

@Injectable({
  providedIn: 'root'
})
export class OutageReadinessService {

  private readonly getPhasesURL = `${environment.apiUrl}/OT_Phases/getPhases`
  private readonly savePhaseURL = `${environment.apiUrl}/OT_Phases/savePhases`
  private readonly deletePhasesURL = `${environment.apiUrl}/OT_Phases/deletePhases`
  private readonly getPhaseDescURL = `${environment.apiUrl}/OT_Phases/getOutageRediness`
  private readonly savePhaseDurationURL = `${environment.apiUrl}/OT_Phases/saveDurations`
  private readonly savePhaseDescURL = `${environment.apiUrl}/OT_Phases/saveOutageRediness`
  private readonly deletePhaseDescURL = `${environment.apiUrl}/OT_Phases/deleteOutageRediness`
  private readonly getSelectedOutagesURL = `${environment.apiUrl}/OT_Phases/getSelectedOutages`
  private readonly getInterfaceURL = `${environment.apiUrl}/OT_Phases/getInterface`
  private readonly getSelectedOwnerURL = `${environment.apiUrl}/OT_Phases/getSelectedOutageOwners`

  constructor(private http: HttpClient) { }
  getPhases(userId: number): Observable<OT_OutageRediness[]> {
    let data = { userId }
    return this.http.post<OT_OutageRediness[]>(this.getPhasesURL, data)
  }
  getInterface(userId:number ): Observable<OT_IActionOwner[]> {
    let data = { userId }
    return this.http.post<OT_IActionOwner[]>(this.getInterfaceURL, data)
  }
  getSelectedOwners(userId:number , phaseReadId:number): Observable<OT_IActionOwner[]> {
    let data = { userId, phaseReadId}
    return this.http.post<OT_IActionOwner[]>(this.getSelectedOwnerURL, data)
  }
  seledtedOutages(userId: number, phaseId: number): Observable<OT_SelectedOutages[]> {
    let data = { userId, phaseId }
    return this.http.post<OT_SelectedOutages[]>(this.getSelectedOutagesURL, data)
  }
  getPhasesDesc(userId: number): Observable<OT_OutageReadDesc[]> {
    let data = { userId }
    return this.http.post<OT_OutageReadDesc[]>(this.getPhaseDescURL, data)
  }
  savePhases(userId: number, phase: OT_OutageRediness): Observable<OT_OutageRediness> {
    let data = { userId, phase }
    return this.http.post<OT_OutageRediness>(this.savePhaseURL, data)
  }
  savePhaseDuration(userId: number, PhaseDuration: OT_SelectedOutages[]): Observable<OT_SelectedOutages> {
    let data = { userId, PhaseDuration }
    return this.http.post<OT_SelectedOutages>(this.savePhaseDurationURL, data)
  }
  savePhaseDesc(userId: number, PhaseDesc: OT_SaveOutageReadDesc): Observable<OT_OutageReadDesc> {
    let data = { userId, PhaseDesc }
    return this.http.post<OT_OutageReadDesc>(this.savePhaseDescURL, data)
  }
  deletePhaseDesc(userId: number, PhaseDesc: OT_OutageReadDesc): Observable<OT_OutageReadDesc> {
    let data = { userId, PhaseDesc }
    return this.http.post<OT_OutageReadDesc>(this.deletePhaseDescURL, data)
  }
  deletePhases(userId: number, phase: OT_OutageRediness): Observable<OT_OutageRediness> {
    let data = { userId, phase }
    return this.http.post<OT_OutageRediness>(this.deletePhasesURL, data)
  }
}
