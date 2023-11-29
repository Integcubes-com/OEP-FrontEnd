import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { environment } from 'src/environments/environment';
import { AGAPIData, AGGroups } from './assign-group.model';

@Injectable({
  providedIn: 'root'
})
export class AssignGroupService {
  private readonly getGroupsUrl =  `${environment.apiUrl}/KPIAssignGroup/getAssignedGroup`
  private readonly saveGroupsUrl =  `${environment.apiUrl}/KPIAssignGroup/saveAssignedGroup`
  constructor(private http: HttpClient) { }


  getAssignedGroups(userId:number, assignedUserId:number):Observable<AGGroups[]>{
    let date = {"userId":userId, 'assignedUserId':assignedUserId};
    return this.http.post<AGGroups[]>(this.getGroupsUrl, date)
  }
  saveAssignedGroups(userId:number, assignedUserId:number, groupData:AGGroups[]):Observable<AGGroups[]>{
    let date = {"userId":userId, 'assignedUserId':assignedUserId, 'data':groupData};
    return this.http.post<AGGroups[]>(this.saveGroupsUrl, date)
  }
}
