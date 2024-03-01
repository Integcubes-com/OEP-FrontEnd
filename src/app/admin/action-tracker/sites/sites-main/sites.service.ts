import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APISites, SPStatus, SSaveData, STech, SitesI } from './sites.model';
import { CTechnology } from 'src/app/shared/common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private readonly getSitesURL = `${environment.apiUrl}/Sites/getSites`;
  private readonly saveSitesURL = `${environment.apiUrl}/Sites/saveSites`;
  private readonly deleteSitesURL = `${environment.apiUrl}/Sites/deleteSites`;
  private readonly editSitesURL = `${environment.apiUrl}/Sites/editData`;
  private readonly uploadFileURL = `${environment.apiUrl}/Sites/uploadFile`;
  private readonly tilReportURL = `${environment.apiUrl}/Sites/tilReport`;
  private readonly insuranceReportURL = `${environment.apiUrl}/Sites/insuranceReport`;
  private readonly interfaceURL = `${environment.apiUrl}/Sites/getInterfaces`;

  constructor(private http: HttpClient) { }

  getSites(userId:number, regionList:string, countryList:string, technologyList:string, clusterList:string): Observable<SitesI[]> {
    let data = {'userId':userId, 'regionList':regionList, 'countryList':countryList, 'technologyList':technologyList, 'clusterList':clusterList}
    return this.http.post<SitesI[]>(this.getSitesURL, data)
  }
  getInterfaces(userId:number):Observable<SPStatus[]> {
    let data = {'userId':userId}
    return this.http.post<SPStatus[]>(this.interfaceURL, data)
  }
  getEditData(site: SitesI, userId: number): Observable<CTechnology[]> {
    return this.http.post<CTechnology[]>(this.editSitesURL, site)
  
  }
  saveSite(site: SSaveData, userId: number): Observable<SitesI> {
    // const formData = new FormData();
    // formData.append('sites', site.sites);
    let data = { "site": site , "userId":userId }
    return this.http.post<SitesI>(this.saveSitesURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  uploadPDF(data:SitesI,site: SSaveData, userId:number):Observable<any>{

    const formData = new FormData();
    formData.append('insuranceReport',site.sites.insurenceReport);
    formData.append('tilsReport',site.sites.tilsReport);
    formData.append('siteId', data.siteId.toString());
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.uploadFileURL, formData).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  tilFile(siteId: number): Observable<any> {
    return this.http.post(`${this.tilReportURL}/${siteId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  insuranceFile(siteId:number):Observable<any>{

    return this.http.post(`${this.insuranceReportURL}/${siteId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  deleteSite(site: SitesI): Observable<SitesI> {
    return this.http.post<SitesI>(this.deleteSitesURL, site).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }

}
