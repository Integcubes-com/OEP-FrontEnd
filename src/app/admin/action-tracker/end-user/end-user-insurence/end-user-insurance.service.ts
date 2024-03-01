import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAInterface, IATAPIData, InsurenceTracker, ITUser } from '../../insurence/insurence-tracker/insurence-tracker.model';
import { EUIFilterObj } from './end-user-insurance.model';
import { InsurenceRecommendation } from '../../insurence/add-insurence/insurence.model';
import { ReturnedDocumnet } from '../../file-upload-dialog/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class EndUserInsuranceService {

  private readonly saveUserURL = `${environment.apiUrl}/EndUserInsuranceTracker/getUsersActions`
  private readonly saveInsurenceTrackerURL = `${environment.apiUrl}/EndUserInsuranceTracker/endUserStausInsurenceActionTracker`
  private readonly saveReviewInsurenceTrackerURL = `${environment.apiUrl}/EndUserInsuranceTracker/reviewerInsurenceActionTracker`

  private readonly getInsurenceTrackerURL = `${environment.apiUrl}/EndUserInsuranceTracker/getInsurenceActionTracker`
  private readonly getInsurenceTrackerReportURL = `${environment.apiUrl}/EndUserInsuranceTracker/getInsurenceActionTrackerReport`

  private readonly filterURL = `${environment.apiUrl}/EndUserInsuranceTracker/filterAction`
  private readonly uploadFileURL = `${environment.apiUrl}/EndUserInsuranceTracker/uploadFile`
  private readonly reportURL = `${environment.apiUrl}/EndUserInsuranceTracker/downloadFile`
  private readonly getInterfacesURL = `${environment.apiUrl}/EndUserInsuranceTracker/getInterfaces`

  private readonly getInsuranceRecommendationURL = `${environment.apiUrl}/EndUserInsuranceTracker/getIR`
  private readonly getFileList = `${environment.apiUrl}/EndUserInsuranceTracker/getAttachedFiles`

  
  constructor(private http: HttpClient) { }
  
  getActionTracker(userId:number, regionList:string, siteList:string, sourceList:string, statusList:string, dayList:string, companyList:string,priorityList:string, clusterList:string,quaterList:string, yearList:string, issueYearList:string): Observable<IATAPIData> {
    let data = {userId, regionList, siteList, sourceList, statusList, dayList, companyList, priorityList,clusterList,quaterList,yearList,issueYearList};
    return this.http.post<IATAPIData>(this.getInsurenceTrackerURL,data).pipe(
    )
  }
  getActionTrackerReport(userId:number, regionList:string, siteList:string, sourceList:string, statusList:string, dayList:string, companyList:string,priorityList,clusterList:string): Observable<IATAPIData> {
    let data = {userId, regionList, siteList, sourceList, statusList, dayList, companyList, priorityList,clusterList};
    return this.http.post<IATAPIData>(this.getInsurenceTrackerReportURL,data).pipe(
    )
  }
  uploadPDF(data:InsurenceTracker,action:InsurenceTracker, userId:number):Observable<any>{
    const formData = new FormData();
    formData.append('iatReport',action.reportFile);
    formData.append('iatId', data.insurenceActionTrackerId.toString());
    formData.append('userId', userId.toString());
    return this.http.post<any>(this.uploadFileURL, formData).pipe(
    )
  }
  downloadReport(iatId: number): Observable<any> {
    return this.http.post(`${this.reportURL}/${iatId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  getInterfaces(userId:number): Observable<IAInterface> {
    let data = {'userId':userId}
    return this.http.post<IAInterface>(this.getInterfacesURL,data)
  }
  saveActionTracker(action:InsurenceTracker, userId:number):Observable<InsurenceTracker>{
    let data = {"insurenceAction":action,"userId":userId};
    return this.http.post<InsurenceTracker>(this.saveInsurenceTrackerURL,data)
  }
  saveReviewActionTracker(action:InsurenceTracker, userId:number):Observable<InsurenceTracker>{
    let data = {"insurenceAction":action,"userId":userId};
    return this.http.post<InsurenceTracker>(this.saveReviewInsurenceTrackerURL,data)
  }
  getInsuranceRecommendation(userId:number, recommendationId:number): Observable<InsurenceRecommendation[]> {
    let data = { "userId":userId ,"recommendationId":recommendationId}
    return this.http.post<InsurenceRecommendation[]>(this.getInsuranceRecommendationURL, data)
  }
  getAttachedFileList(iatId:number , userId :number): Observable<ReturnedDocumnet[]> {
    let data = {iatId, userId}
    return this.http.post<ReturnedDocumnet[]>(this.getFileList, data)
  }
}
