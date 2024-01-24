import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelEquipment, ModelEquipmentInterfaceAPI } from './model.type';

@Injectable({
    providedIn: 'root'
})
export class ModelEquipmentService {

    private readonly getModelEquipmentURL = `${environment.apiUrl}/ModelEquipment/getModelEquipment`
    private readonly saveURL = `${environment.apiUrl}/ModelEquipment/saveModelEquipment`
    private readonly deleteURL = `${environment.apiUrl}/ModelEquipment/deleteModelEquipment`
    private readonly getInterfacesURL = `${environment.apiUrl}/ModelEquipment/getInterfaces`
    constructor(private http: HttpClient) { }
    getModelEquipments(userId: number): Observable<ModelEquipment[]> {
        let data = { userId}
        return this.http.post<ModelEquipment[]>(this.getModelEquipmentURL, data)
    }
    getInterface(userId:number): Observable<ModelEquipmentInterfaceAPI> {
        let data = { userId}
        return this.http.post<ModelEquipmentInterfaceAPI>(this.getInterfacesURL, data)
    }
    delete(userId:number, model:ModelEquipment): Observable<any> {
        let data = { userId, ...model}
        return this.http.post<any>(this.deleteURL, data)
    }
    saveModel(userId:number, model:ModelEquipment): Observable<any> {
        let data = { userId, ...model}
        return this.http.post<any>(this.saveURL, data)
    }
}