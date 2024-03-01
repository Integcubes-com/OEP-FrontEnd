import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRFilter, IRInterfaces, IRSite, InsurenceRecommendation, InsurenceRecommendationApi } from './insurence.model';

@Injectable({
  providedIn: 'root'
})
export class AddInsurenceService {
  private readonly delRecommendationsURL = `${environment.apiUrl}/InsurenceRecommendation/deleteInsurenceRecommendation`
  private readonly saveRecommendationsURL = `${environment.apiUrl}/InsurenceRecommendation/saveInsuranceRecommendation`
  private readonly getnsurenceRecommendationsURL = `${environment.apiUrl}/InsurenceRecommendation/getInsurenceRecommendation`
  private readonly filterUrl = `${environment.apiUrl}/InsurenceRecommendation/filter`
  private readonly uploadFileURL = `${environment.apiUrl}/InsurenceRecommendation/uploadFile`
  private readonly reportURL = `${environment.apiUrl}/InsurenceRecommendation/downloadReport`
  private readonly getSitesURL = `${environment.apiUrl}/InsurenceRecommendation/getFilterSites`
  private readonly getInterfaceURL = `${environment.apiUrl}/InsurenceRecommendation/getInterfaces`

  constructor(private http: HttpClient) { }
  getRecommendations(userId: number, filterObj: IRFilter): Observable<InsurenceRecommendationApi> {
    let data = { 'userId': userId,"filter": filterObj}
    return this.http.post<InsurenceRecommendationApi>(this.getnsurenceRecommendationsURL, data)
  }
  getRecommendationsList(userId: number,regionList:string, siteList:string, sourceList:string, nomacStatus:string, insuranceStatus:string, priorityList:string, clusterList:string, yearList:string, proactiveList:string): Observable<InsurenceRecommendationApi> {
    let data = { userId, regionList, siteList, sourceList, nomacStatus, insuranceStatus, priorityList,clusterList,yearList,proactiveList}
    return this.http.post<InsurenceRecommendationApi>(this.getnsurenceRecommendationsURL, data)
  }
  getInterfaces(userId: number): Observable<IRInterfaces> {
    let data = { 'userId': userId }
    return this.http.post<IRInterfaces>(this.getInterfaceURL, data)
  }


  saveRecommendations(recommendations: InsurenceRecommendation, userId: number): Observable<InsurenceRecommendation> {
    let rec = { "recommendation": recommendations, "userId": userId };
    return this.http.post<InsurenceRecommendation>(this.saveRecommendationsURL, rec)
  }
  uploadPDF(result: InsurenceRecommendation, data: InsurenceRecommendation, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('recommendationReport', result.insuranceReport);
    formData.append('irId', data.recommendationId.toString());
    formData.append('userId', userId.toString());

    return this.http.post<any>(this.uploadFileURL, formData)

  }
  downloadReport(irId: number): Observable<any> {
    return this.http.post(`${this.reportURL}/${irId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  deleteRecommendations(recommendations: InsurenceRecommendation): Observable<InsurenceRecommendation> {
    return this.http.post<InsurenceRecommendation>(this.delRecommendationsURL, recommendations)
  }
}
