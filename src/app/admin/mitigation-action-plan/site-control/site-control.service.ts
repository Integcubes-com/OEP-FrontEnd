import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OMA_Technology } from '../add-program/program.model';
import { OMA_selectedSite, OM_SiteControl } from './site-control.model';

@Injectable({
  providedIn: 'root'
})
export class SiteControlService {

  private readonly getSiteControlURL =  `${environment.apiUrl}/MitigationActionPlanSiteControl/getSiteControl`
  private readonly getSelectedSiteControlURL =  `${environment.apiUrl}/MitigationActionPlanSiteControl/getSelectedSites`
  private readonly saveSiteControlURL =  `${environment.apiUrl}/MitigationActionPlanSiteControl/saveSiteControl`

  
  constructor(private http: HttpClient) { }

  getSiteControl(userId:number):Observable<OM_SiteControl[]>{
    let date = {"userId":userId};
    return this.http.post<OM_SiteControl[]>(this.getSiteControlURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getSelectedSiteControl(siteId:number):Observable<OMA_selectedSite[]>{
    let date = {"siteId":siteId};
    return this.http.post<OMA_selectedSite[]>(this.getSelectedSiteControlURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveSiteControl(userId:number,siteId:number,siteControl:OMA_selectedSite[]):Observable<OMA_selectedSite[]>{
    let date = {"userId":userId,"siteId":siteId, "siteControl":siteControl};
    return this.http.post<OMA_selectedSite[]>(this.saveSiteControlURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
