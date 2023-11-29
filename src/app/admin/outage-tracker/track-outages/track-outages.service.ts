import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APISaveData, OTApiData, OTData, OT_APiData, OT_FileList, OT_OutageTrackerFilter, OT_outageTracker } from './track-outages.model';

@Injectable({
  providedIn: 'root'
})
export class TrackOutagesService {

  private readonly getOutageTrackerURL = `${environment.apiUrl}/OT_OutageTracker/getOutageTracker`
  private readonly saveOutageTrackerURL = `${environment.apiUrl}/OT_OutageTracker/saveOutageTracker`
  private readonly getInterfaceURL = `${environment.apiUrl}/OT_OutageTracker/getInterfaces`
  private readonly uploadFileURL = `${environment.apiUrl}/OT_OutageTracker/uploadFile`
  private readonly reportURL = `${environment.apiUrl}/OT_OutageTracker/downloadFile`
  private readonly otDataURL = `${environment.apiUrl}/OT_OutageTracker/outageInfo`
  private readonly otcDataURL = `${environment.apiUrl}/OT_OutageTracker/outageInfoC`

  


  constructor(private http: HttpClient) { }
  getActions(userId: number, filter: OT_OutageTrackerFilter): Observable<OT_outageTracker[]> {
    let data = { userId, filter }
    return this.http.post<OT_outageTracker[]>(this.getOutageTrackerURL, data)
  }
  saveAction(userId: number, action: APISaveData): Observable<OT_outageTracker> {
    let data = { userId, action }
    debugger;
    return this.http.post<OT_outageTracker>(this.saveOutageTrackerURL, data)
  }
  getInterface(userId: number): Observable<OT_APiData> {
    let data = { userId }
    return this.http.post<OT_APiData>(this.getInterfaceURL, data)
  }
  getOTData(userId: number, action: OT_outageTracker): Observable<OTApiData> {
    let data = { userId, action }
    return this.http.post<OTApiData>(this.otDataURL, data)
  }
  getOTCData(userId: number, monthId:string,potId:number ): Observable<OTData> {

    let data = { userId, monthId,  potId}
    return this.http.post<OTData>(this.otcDataURL, data)
  }

  // uploadPDF(result: OT_outageTracker, data: OT_outageTracker, userId: number): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('report', result.file);
  //   formData.append('potId', data.potId.toString());
  //   formData.append('userId', userId.toString());
  //   return this.http.post<any>(this.uploadFileURL, formData)
  // }
  // downloadReport(potId: number): Observable<any> {
  //   return this.http.post(`${this.reportURL}/${potId}`, null, {
  //     responseType: 'blob',
  //     observe: 'response'
  //   });
  // }
}
