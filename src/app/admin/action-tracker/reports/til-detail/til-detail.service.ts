import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TilDetailReport } from "./til-detail.model";

@Injectable({
    providedIn: 'root'
})
export class TilDetailReportService {
    private readonly getTilReportUrl = `${environment.apiUrl}/TilDetailReport/getReport`
    constructor(private http: HttpClient) { }
    getActionTracker(): Observable<TilDetailReport[]> {
        return this.http.get<TilDetailReport[]>(this.getTilReportUrl)
    }
}
