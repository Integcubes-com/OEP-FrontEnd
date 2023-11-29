import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OT_IActionOwner, OT_SaveActionRole } from '../outage-readiness/outage-readiness.model';
import { CUsers } from 'src/app/shared/common-interface/common-interface';

@Injectable({
  providedIn: 'root'
})
export class ActionRolesService {

  private readonly getOwnerUrl = `${environment.apiUrl}/OT_ActionRoles/getActionRoles`
  private readonly deleteOwnerUrl = `${environment.apiUrl}/OT_ActionRoles/deleteActionRoles`
  private readonly setSelectedUsersUrl = `${environment.apiUrl}/OT_ActionRoles/getSelectedUsers`
  private readonly saveActionRoleUrl = `${environment.apiUrl}/OT_ActionRoles/saveActionRoles`

  constructor(private http: HttpClient) { }
  getActionOwner(userId: number): Observable<OT_IActionOwner[]> {
    let data = { userId }
    return this.http.post<OT_IActionOwner[]>(this.getOwnerUrl, data)
  }
  deleteActionOwner(userId: number, actionRole: OT_IActionOwner): Observable<OT_IActionOwner> {
    let data = { userId, actionRole }
    return this.http.post<OT_IActionOwner>(this.deleteOwnerUrl, data)
  }
  getSelectedUsers(userId: number, actionRoleId:number): Observable<CUsers[]> {
    let data = { userId, actionRoleId }
    return this.http.post<CUsers[]>(this.setSelectedUsersUrl, data)
  }
  saveRole(userId: number, actionRole:OT_SaveActionRole): Observable<CUsers[]> {
    let data = { userId, actionRole }
    return this.http.post<CUsers[]>(this.saveActionRoleUrl, data)
  }
}
