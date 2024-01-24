import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAInterface, IATAPIData, InsurenceTracker, ITFilterObj, ITRecommendation } from './insurence-tracker.model';
import { InsurenceRecommendation } from '../add-insurence/insurence.model';

@Injectable({
  providedIn: 'root'
})
export class InsurenceTrackerService {

  private readonly saveUserURL = `${environment.apiUrl}/InsurenceActionTracker/getUsersActions`
  private readonly saveInsurenceTrackerURL = `${environment.apiUrl}/InsurenceActionTracker/saveInsurenceActionTracker`
  private readonly delInsurenceTrackerURL = `${environment.apiUrl}/InsurenceActionTracker/delUsersInsurenceActionTracker`
  private readonly getInsurenceTrackerURL = `${environment.apiUrl}/InsurenceActionTracker/getInsurenceActionTracker`
  private readonly filterUrl = `${environment.apiUrl}/InsurenceActionTracker/filter`
  private readonly getRecomUrl = `${environment.apiUrl}/InsurenceActionTracker/filterRecom`
  private readonly getSitesURL = `${environment.apiUrl}/InsurenceActionTracker/getFilterSites`
  private readonly getInterfacesURL = `${environment.apiUrl}/InsurenceActionTracker/getInterfaces`
  private readonly getInsuranceRecommendationURL = `${environment.apiUrl}/InsurenceActionTracker/getIR`
  constructor(private http: HttpClient) { }
  getActionTracker(userId:number, filterObj:ITFilterObj): Observable<IATAPIData> {
    let data = {'userId':userId, "filter":filterObj};
    return this.http.post<IATAPIData>(this.getInsurenceTrackerURL,data)
  }
  getActionTrackerList(userId:number,regionList:string, siteList:string, sourceList:string, department:string, priorityList:string,clusterList:string): Observable<IATAPIData> {
    let data = {userId,regionList,siteList,sourceList,department,priorityList,clusterList};
    return this.http.post<IATAPIData>(this.getInsurenceTrackerURL,data)
  }
  getInterfaces(userId:number): Observable<IAInterface> {
    let data = {'userId':userId}
    return this.http.post<IAInterface>(this.getInterfacesURL,data)
  }
  getSRec(siteId:number, userId: number): Observable<ITRecommendation[]> {
    let data = { "siteId": siteId , "userId":userId }
    return this.http.post<ITRecommendation[]>(this.getRecomUrl, data)
  }
  saveActionTracker(action:InsurenceTracker, userId:number):Observable<InsurenceTracker>{
    let data = {"insurenceAction":action,"userId":userId};
    return this.http.post<InsurenceTracker>(this.saveInsurenceTrackerURL,data)
  }
  getInsuranceRecommendation(userId:number, recommendationId:number): Observable<InsurenceRecommendation[]> {
    let data = { "userId":userId ,"recommendationId":recommendationId}
    return this.http.post<InsurenceRecommendation[]>(this.getInsuranceRecommendationURL, data)
  }
  delActionTracker(action:InsurenceTracker, userId:number):Observable<InsurenceTracker>{
    let data = {"insurenceAction":action,"userId":userId};
    return this.http.post<InsurenceTracker>(this.delInsurenceTrackerURL,action)
  }

}
