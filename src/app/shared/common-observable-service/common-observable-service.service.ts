import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CRegions } from '../common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class CommonObservableServiceService {

  //URLs
  private readonly siteURL = `${environment.apiUrl}/CommonFilter/getSites`;
  private readonly regionURL = `${environment.apiUrl}/CommonFilter/getRegions`;
  private readonly equipmentURL = `${environment.apiUrl}/CommonFilter/getEquipments`;
  private readonly usersURL = `${environment.apiUrl}/CommonFilter/getUsers`;
  private readonly countryURL = `${environment.apiUrl}/CommonFilter/getCountries`;
  private readonly technologyURL = `${environment.apiUrl}/CommonFilter/getTechnologies`;
  private readonly allRegionURL = `${environment.apiUrl}/CommonFilter/getAllRegions`;
  private readonly allCountryURL = `${environment.apiUrl}/CommonFilter/getAllCountries`;

  
  //Observable Pattern
  constructor(private http:HttpClient) { }


}
