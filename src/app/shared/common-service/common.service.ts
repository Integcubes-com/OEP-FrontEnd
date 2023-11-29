import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CCluster, CCountry, CFleetEquipment, CRegions, CSites, CTechnology, CUsers } from '../common-interface/common-interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private readonly siteURL = `${environment.apiUrl}/CommonFilter/getSites`;
  private readonly siteOMURL = `${environment.apiUrl}/CommonFilter/getSitesOM`;
  private readonly siteOMURLSpecific = `${environment.apiUrl}/CommonFilter/getSitesOMSpecific`;
  private readonly siteOMURLSpecificReviewer = `${environment.apiUrl}/CommonFilter/getSitesOMSpecificReviewer`;

  

  private readonly regionURL = `${environment.apiUrl}/CommonFilter/getRegions`;

  private readonly regionUpdatedURL = `${environment.apiUrl}/CommonFilter/getUpdatedRegions`;
  private readonly sitesUpdatedURL = `${environment.apiUrl}/CommonFilter/getUpdatedSites`;
  private readonly clusterURL = `${environment.apiUrl}/CommonFilter/getClusters`;

  private readonly regionOMURL = `${environment.apiUrl}/CommonFilter/getRegionsOM`;

  private readonly usersURL = `${environment.apiUrl}/CommonFilter/getUsers`;
  private readonly countryURL = `${environment.apiUrl}/CommonFilter/getCountries`;
  private readonly technologyURL = `${environment.apiUrl}/CommonFilter/getTechnologies`;
  private readonly technologyOMURL = `${environment.apiUrl}/CommonFilter/getTechnologiesOM`;
  private readonly allRegionURL = `${environment.apiUrl}/CommonFilter/getAllRegions`;
  private readonly allCountryURL = `${environment.apiUrl}/CommonFilter/getAllCountries`;

  
  private readonly siteKPIURL = `${environment.apiUrl}/CommonFilter/getKPISites`;
  
  private readonly fleetEquipmentURL = `${environment.apiUrl}/CommonFilter/getFleetEquipment`;

  constructor(private http:HttpClient) { }
  getSites(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteURL, data)
  }
  getKPISites(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteKPIURL, data)
  }
  getRegions(userId: number, regionId:number, siteId:number): Observable<CRegions[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CRegions[]>(this.regionURL, data)
  }
  getUpdatedSites(userId: number, regionId:number, siteId:number, clusterId): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId, "clusterId":clusterId};
    return this.http.post<CSites[]>(this.sitesUpdatedURL, data)
  }
  getClusters(userId: number, regionId:number, clusterId:number): Observable<CCluster[]> {
    let data = { "userId": userId , "regionId":regionId, "clusterId":clusterId};
    return this.http.post<CCluster[]>(this.clusterURL, data)
  }
  getUpdatedRegions(userId: number, regionId:number, siteId:number): Observable<CRegions[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CRegions[]>(this.regionUpdatedURL, data)
  }
  getAllRegions(userId: number): Observable<CRegions[]> {
    let data = { userId };
    return this.http.post<CRegions[]>(this.allRegionURL, data)
  }
  getSitesOM(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteOMURL, data)
  }
  getSitesReviewer(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteOMURLSpecificReviewer, data)
  }
  getSitesSpec(userId: number, regionId:number, siteId:number): Observable<CSites[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CSites[]>(this.siteOMURLSpecific, data)
  }
  getRegionsOM(userId: number, regionId:number, siteId:number): Observable<CRegions[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CRegions[]>(this.regionOMURL, data)
  }
  getUsers(userId: number, regionId:number, siteId:number): Observable<CUsers[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CUsers[]>(this.usersURL, data)
  }
  getTechnology(userId: number, regionId:number, siteId:number): Observable<CTechnology[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CTechnology[]>(this.technologyURL, data)
  }
  getTechnologyOM(userId: number, regionId:number, siteId:number): Observable<CTechnology[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CTechnology[]>(this.technologyOMURL, data)
  }
  getCountry(userId: number, regionId:number, siteId:number): Observable<CCountry[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CCountry[]>(this.countryURL, data)
  }
  getAllCountry(userId: number, regionId:number, siteId:number): Observable<CCountry[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CCountry[]>(this.allCountryURL, data)
  }
  getFleetEquipment(userId:number, fleetEquipmentId:number):Observable<CFleetEquipment>{
    let data = {"userId": userId, 'fleetEquipmentId':fleetEquipmentId};
    return this.http.post<CFleetEquipment>(this.fleetEquipmentURL, data)
  }
}
