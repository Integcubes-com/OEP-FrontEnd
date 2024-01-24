import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { clusterModel } from './cluster.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CUsers } from 'src/app/shared/common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class ClusterMainService {

  private readonly getclusterURL = `${environment.apiUrl}/Cluster/getCluster`;
  private readonly saveclusterURL = `${environment.apiUrl}/Cluster/saveCluster`;
  private readonly deleteclusterURL = `${environment.apiUrl}/Cluster/deleteCluster`
  private readonly getSelectedDataURL = `${environment.apiUrl}/Cluster/getClusterInfo`;

  constructor(private http: HttpClient,) { }
  getCountries(userId:number): Observable<clusterModel[]> {
    let data = {userId}
    return this.http.post<clusterModel[]>(this.getclusterURL,data)
  }

  savecluster( userId: number , cluster: clusterModel): Observable<clusterModel[]> {
    let date = { userId, cluster};
    return this.http.post<clusterModel[]>(this.saveclusterURL, date)
  }

  deletecluster(userId:number, cluster:clusterModel): Observable<clusterModel[]> {
    let data = {userId, cluster}
    return this.http.post<clusterModel[]>(this.deleteclusterURL, data)
  }

  getClusterInfo(userId: number, cluster:clusterModel): Observable<CUsers[]> {
    let data = { userId , cluster};
    return this.http.post<CUsers[]>(this.getSelectedDataURL, data)
  }

}
