export class WH_ContractOutage {
    contractOutageId: number;
    siteId: number;
    regionId: number;
    regionTitle: string;
    siteTitle: string;
    equipmentId: number;
    unit: string;
    outageId: number;
    outageTitle: string;
    nextOutageDate: Date;
    runningHours: number;
    outageDurationInDays: number;
    constructor(reg) {
        this.contractOutageId = reg.contractOutageId ? reg.contractOutageId : -1;
    }
}
export interface WH_Outages {
    outageId: number;
    outageTitle: string;
}

export interface WH_IEquipments {
    equipmentId:number
    unit:string
    siteUnit:string
    siteId:number
    siteTitle:string
}

export interface WH_InterfaceApi {
    outageTypes: WH_Outages[]
    equipments: WH_IEquipments[]
}

export interface WH_ContractOutageFilter{
    regionId:number;
    siteId:number;
    equipmentId:number;
    outageId:number
}