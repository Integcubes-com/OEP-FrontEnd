import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { environment } from 'src/environments/environment';
import { Regions, SaveApiData } from '../../action-tracker/regions/region-main/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  private readonly getRegionsURL = `${environment.apiUrl}/UpdatedRegions/getRegions`;
  private readonly saveRegionsURL = `${environment.apiUrl}/UpdatedRegions/saveRegions`;
  private readonly deleteRegionsURL = `${environment.apiUrl}/UpdatedRegions/deleteRegions`
  private readonly getUserInterfaceURL = `${environment.apiUrl}/CommonFilter/getUsers`
  private readonly getSelectedRegionURL = `${environment.apiUrl}/UpdatedRegions/getSelecteddata`

  

  constructor(private http: HttpClient,) { }
  getRegions(): Observable<Regions[]> {
    return this.http.get<Regions[]>(this.getRegionsURL)
  }
  saveRegion(userId:number, data:SaveApiData): Observable<Regions> {
    let datas = {userId, data};
    return this.http.post<Regions>(this.saveRegionsURL, datas) 
  }
  getSelectedRegionData(userId:number, regionId:number): Observable<CUsers[]> {
    let date = {userId, regionId};
    return this.http.post<CUsers[]>(this.getSelectedRegionURL, date)
  }
  getInterface(userId): Observable<CUsers[]> {
    let date = {"userId":userId};
    return this.http.post<CUsers[]>(this.getUserInterfaceURL, date)
  }
  deleteRegion(region: Regions): Observable<Regions> {
    return this.http.post<Regions>(this.deleteRegionsURL, region)
  }
}
