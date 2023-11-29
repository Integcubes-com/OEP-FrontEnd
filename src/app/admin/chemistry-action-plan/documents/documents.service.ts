import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CAP_Documents } from './document.model';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CAPRegion, CAPSites } from '../observation/observation.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private readonly getDocumentURL = `${environment.apiUrl}/ChemistryActionPlanDocument/getDocuments`
  private readonly getRegionsURL = `${environment.apiUrl}/CommonFilter/getRegions`
  private readonly getSitesURL = `${environment.apiUrl}/CommonFilter/getSites`
  private readonly uploadFileURL = `${environment.apiUrl}/ChemistryActionPlanDocument/uploadFile`
  private readonly deleteDocumentURL = `${environment.apiUrl}/ChemistryActionPlanDocument/deleteDoc`
  private readonly insuranceReportURL = `${environment.apiUrl}/ChemistryActionPlanDocument/pdfReport`;
  constructor(private http:HttpClient) { }
  getDocuments(userId:number): Observable<CAP_Documents[]> {
    let data = {"userId":userId}
    return this.http.post<CAP_Documents[]>(this.getDocumentURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),

    )
  }
  getRegions(userId:number): Observable<CAPRegion[]> {
    let data = {"userId":userId}
    return this.http.post<CAPRegion[]>(this.getRegionsURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),

    )
  }
  saveDocument(data:CAP_Documents, userId:number):Observable<any>{
    debugger;
    const formData = new FormData();
    formData.append('siteId',data.siteId.toString());
    formData.append('docId',data.docId.toString());
    formData.append('file', data.file);
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.uploadFileURL, formData).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getSites(userId:number, regionId:number): Observable<CAPSites[]> {
    let data = {"userId":userId, "regionId":regionId}
    return this.http.post<CAPSites[]>(this.getSitesURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),

    )
  }
  downloadFile(docId:number):Observable<any>{

    return this.http.post(`${this.insuranceReportURL}/${docId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  deleteDocument(data:CAP_Documents, userId:number){
    const formData = new FormData();
    formData.append('docId',data.docId.toString());
    return this.http.post<any>(this.deleteDocumentURL, formData).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
