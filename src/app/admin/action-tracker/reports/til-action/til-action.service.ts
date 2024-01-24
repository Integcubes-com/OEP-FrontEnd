import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TilActionReport } from './til-action.model';

@Injectable({
  providedIn: 'root'
})
export class TilActionService {
  private readonly getTilReportUrl = `${environment.apiUrl}/TIlActionReport/getReport`
  constructor(private http: HttpClient) { }
  getActionTracker(): Observable<TilActionReport[]> {
      return this.http.get<TilActionReport[]>(this.getTilReportUrl)
  }
}
