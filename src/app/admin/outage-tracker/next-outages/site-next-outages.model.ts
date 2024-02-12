export class OT_SiteNextOutage {
    snoId: number;
    siteId: number;
    regionId:number;
    regionTitle:string;
    siteTitle: string;
    equipmentId: number;
    unit: string;
    outageId: number;
    outageTitle: string;
    nextOutageDate: string;
    nextOutageEndDate:Date;
    runningHours:number;
    outageDurationInDays:number;
    clusterId:number;
    clusterTitle:string;
    actualStartDate:Date;
    actualEndDate:Date;
    constructor(reg) {
        this.snoId = reg.snoId ? reg.snoId : -1;
    }
}
export interface OT_NextOutages {
    outageId: number;
    outageTitle: string;
}
export interface OMA_ContractOutageFilter{
    regionId:number;
    clusterId:number;
    siteId:number;
    equipmentId:number;
    outageId:number;
    startDate:Date;
    endDate:Date;
}
export interface OT_IEquipments {
    equipmentId:number
    unit:string
    siteUnit:string
    siteId:number
    siteTitle:string
}

export interface OT_InterfaceApi {
    outageTypes: OT_NextOutages[]
    equipments: OT_IEquipments[]
}