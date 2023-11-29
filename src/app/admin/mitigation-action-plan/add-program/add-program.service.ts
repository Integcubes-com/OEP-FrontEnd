import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OMA_Technology, OMA_program, submitProgramObj } from './program.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProgramService {
  private readonly getProgramURL = `${environment.apiUrl}/MitigationActionPlanPrograms/getProgram`
  private readonly getTechnologyURL = `${environment.apiUrl}/MitigationActionPlanPrograms/allTechnologies`
  private readonly saveTechnologyURL =  `${environment.apiUrl}/MitigationActionPlanPrograms/saveTechnology`
  private readonly getSelectedTechnologyURL =  `${environment.apiUrl}/MitigationActionPlanPrograms/getTechnologies`
  private readonly deleteRegionsURL =  `${environment.apiUrl}/MitigationActionPlanPrograms/deleteProgram`

  
  constructor(private http: HttpClient) { }

  getTechnologies(userId:number):Observable<OMA_Technology[]>{
    let date = {"userId":userId};
    return this.http.post<OMA_Technology[]>(this.getTechnologyURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getSelectedTechnologies(userId:number, programId:number):Observable<OMA_Technology[]>{
    let date = {"userId":userId, "programId":programId};
    return this.http.post<OMA_Technology[]>(this.getSelectedTechnologyURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  getPrograms(userId:number):Observable<OMA_program[]>{
    let date = {"userId":userId};
    return this.http.post<OMA_program[]>(this.getProgramURL, date).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  saveProgram(program:submitProgramObj, userId:number):Observable<OMA_program>{
    let data = {'program': program, 'userId':userId};
    return this.http.post<OMA_program>(this.saveTechnologyURL, data).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
  deleteProgram(program: OMA_program): Observable<OMA_program> {
    return this.http.post<OMA_program>(this.deleteRegionsURL, program).pipe(
      tap(data => console.log(JSON.stringify(data))),
    )
  }
}
