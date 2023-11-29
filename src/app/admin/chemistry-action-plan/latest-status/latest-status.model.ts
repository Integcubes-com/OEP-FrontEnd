import { CAPSites } from "../observation/observation.model";

export class CAPLatestStatus{
    updateId:number;
    siteId:number;
    siteTitle:string
    remarks:string
    liveApplication:string
    modelId:number
    modelStatus:string
    statusId:number;
    lusId:number
    status:string;
    score:number;
    target:string;
    constructor(reg){
        this.updateId = reg.updateId?reg.updateId:-1
    }
}
export interface CAPStatusll{
    score:number,
    status:string,
    lusId:number
}
export interface CAPModel{
    modelId:number,
    status:string
}
export interface CAPAPILATEST{
    latestStatus:CAPLatestStatus[],
    status:CAPStatusll[],
    model:CAPModel[],
    site:CAPSites[];
}