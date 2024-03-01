import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TilDetailReport, TilReportInteface } from "./til-detail.model";

@Injectable({
    providedIn: 'root'
})
export class TilDetailReportService {
    private readonly getTilReportUrl = `${environment.apiUrl}/TilDetailReport/getReport`
    private readonly getReportInterfaceUrl = `${environment.apiUrl}/TIlActionReport/getInterfaces`

    constructor(private http: HttpClient) { }
    getActionTracker(regionList: string, clusterList: string, siteList: string, unitList: string, statusList: string, timmingList: string, focusList: string, severityList: string): Observable<TilDetailReport[]> {
        let data = {
            regionList,
            clusterList,
            siteList,
            unitList,
            statusList,
            timmingList,
            focusList,
            severityList,
        }
        return this.http.post<TilDetailReport[]>(this.getTilReportUrl, data)
    }
    getInterfaces(userId: number): Observable<TilReportInteface> {
        let data = { userId };
        return this.http.post<TilReportInteface>(this.getReportInterfaceUrl, data)
    }
}
