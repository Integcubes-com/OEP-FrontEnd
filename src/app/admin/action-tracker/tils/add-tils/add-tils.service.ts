import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TAPIData, TILs, TInterface } from './add-tils.model';

@Injectable({
  providedIn: 'root'
})
export class AddTilsService {

  private readonly getTilsURL = `${environment.apiUrl}/TilsBulletin/getTils`
  private readonly getInterfacesURL = `${environment.apiUrl}/TilsBulletin/getInterfaces`

  private readonly updateTilsURL = `${environment.apiUrl}/TilsBulletin/updateTilsBulletins`
  private readonly deleteTilsURL = `${environment.apiUrl}/TilsBulletin/deleteTilsBulletins`
  // private readonly filterUrl = `${environment.apiUrl}/TilsBulletin/filter`
  private readonly reportURL = `${environment.apiUrl}/TilsBulletin/downloadReport`
  private readonly uploadFileURL = `${environment.apiUrl}/TilsBulletin/uploadFile`

  
  
  constructor(private http:HttpClient) { }
  // getTils(userId:number, filter:TFilterObj):Observable<TAPIData>{
  //   let data = {"userId":userId, 'filter':filter};
  //   return this.http.post<TAPIData>(this.getTilsURL, data)
  // }

  getTilsList(userId:number, docTypeList:string, statusList:string, formList:string, focusList:string, severityList:string):Observable<TAPIData>{
    let data = {userId,docTypeList,statusList,formList,focusList,severityList};
    return this.http.post<TAPIData>(this.getTilsURL, data)
  }
  getInterfaces(userId:number):Observable<TInterface>{
    let data = {"userId":userId};
    return this.http.post<TInterface>(this.getInterfacesURL, data)
  }
  downloadReport(tilId: number): Observable<any> {
    return this.http.post(`${this.reportURL}/${tilId}`, null, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  uploadPDF(result:TILs ,data: TILs, userId: number):Observable<any>{
    const formData = new FormData();
    formData.append('tilReport',result.tilReport);
    formData.append('tilId', data.tilId.toString());
    formData.append('userId', userId.toString());

    return this.http.post<any>(this.uploadFileURL, formData)
  }
  saveTils(til: TILs, userId:number): Observable<TILs> {
    let data = {"til":til, "userId":userId}
    return this.http.post<TILs>(this.updateTilsURL, data)
  }
  // filter(filterObj:TFilterObj):Observable<TILs[]>{
  //   let data = {"filter":filterObj};
  //   return this.http.post<TILs[]>(this.filterUrl, filterObj).pipe(
  //     tap(data=>console.log(JSON.stringify(data))),
  //   )
  // }
  deleteTils(til: TILs): Observable<TILs> {
    return this.http.post<TILs>(this.deleteTilsURL, til)
  }
}
