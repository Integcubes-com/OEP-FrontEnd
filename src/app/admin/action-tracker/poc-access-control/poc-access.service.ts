import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PocAccessObj } from './poc-access.model';
import { InsuranceAccessObj } from './insurance-access/dialogs/insurance-access-form/insurance-access-form.component';
import { CSites } from 'src/app/shared/common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class PocAccessService {
  private readonly getTILSitesAPI = `${environment.apiUrl}/PocAccessControl/getPocTILSites`
  private readonly getInsuranceSitesAPI = `${environment.apiUrl}/PocAccessControl/getPocInsuranceSites`


  private readonly getUsersDataAPI = `${environment.apiUrl}/PocAccessControl/getInsuranceUsers`
  private readonly getUsersTILDataAPI = `${environment.apiUrl}/PocAccessControl/getTILUsers`

  private readonly saveUsersDataAPI = `${environment.apiUrl}/PocAccessControl/saveInsuranceUsers`
  private readonly saveUsersTILDataAPI = `${environment.apiUrl}/PocAccessControl/saveTILUsers`



  constructor(private http: HttpClient,) {  }
  getTilSites(userId:number): Observable<CSites[]> {
    let data = {userId};
    return this.http.post<CSites[]>(this.getTILSitesAPI, data)
  }
  getInsuranceSites(userId:number): Observable<CSites[]> {
    let data = {userId};
    return this.http.post<CSites[]>(this.getInsuranceSitesAPI, data)
  }
  getUsersData(userId:number, siteId:number): Observable<PocAccessObj> {
    let data = {userId,siteId};
    return this.http.post<PocAccessObj>(this.getUsersDataAPI, data)
  }
  getTILUsersData(userId:number, siteId:number): Observable<PocAccessObj> {
    let data = {userId,siteId};
    return this.http.post<PocAccessObj>(this.getUsersTILDataAPI, data)
  }
  saveUsersData(userId:number, accessObj:InsuranceAccessObj): Observable<PocAccessObj> {
    let data = {userId,accessObj};
    return this.http.post<PocAccessObj>(this.saveUsersDataAPI, data)
  }
  saveTILUsersData(userId:number, accessObj:InsuranceAccessObj): Observable<PocAccessObj> {
    let data = {userId,accessObj};
    return this.http.post<PocAccessObj>(this.saveUsersTILDataAPI, data)
  }
}
