import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CCluster, CUsers } from 'src/app/shared/common-interface/common-interface';
import { environment } from 'src/environments/environment';
import { Regions } from '../../regions/region-main/region.model';
import { CountriesModel, CountryApiData } from './add-country.model';

@Injectable({
  providedIn: 'root'
})
export class AddCountriesService {

  private readonly getCountryURL = `${environment.apiUrl}/Country/getCountries`;
  private readonly saveCountryURL = `${environment.apiUrl}/Country/saveCountry`;
  private readonly deleteCountryURL = `${environment.apiUrl}/Country/deleteCountry`
  private readonly usersURL = `${environment.apiUrl}/Country/getUsers`;
  private readonly getSelectedDataURL = `${environment.apiUrl}/Country/getSelectedData`;
  private readonly getClusterDataURL = `${environment.apiUrl}/Country/getClusters`;


  constructor(private http: HttpClient,) { }
  getCountries(userId:number): Observable<CountriesModel[]> {
    let data = {userId}
    return this.http.post<CountriesModel[]>(this.getCountryURL,data)
  }

  saveCountry( userId: number , country: CountryApiData): Observable<Regions> {
    let date = { userId, country};
    return this.http.post<Regions>(this.saveCountryURL, date)
  }

  deleteCountry(userId:number, country:CountriesModel): Observable<Regions> {
    let data = {userId, country}
    debugger;
    return this.http.post<Regions>(this.deleteCountryURL, data)
  }

  getUsers(userId: number, regionId:number, siteId:number): Observable<CUsers[]> {
    let data = { "userId": userId , "regionId":regionId, "siteId":siteId};
    return this.http.post<CUsers[]>(this.usersURL, data)
  }
  getSelectedData(userId: number, countryId:number): Observable<CUsers[]> {
    let data = { userId , countryId};
    return this.http.post<CUsers[]>(this.getSelectedDataURL, data)
  }
  getCluster(userId: number): Observable<CCluster[]> {
    let data = { userId};
    return this.http.post<CCluster[]>(this.getClusterDataURL, data)
  }
}
