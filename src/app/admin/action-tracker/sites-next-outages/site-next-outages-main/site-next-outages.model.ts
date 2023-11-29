export class SiteNextOutage {
    snoId: number;
    siteId: number;
    siteTitle: string;
    equipmentId:number;
    unit:string;
    siteUnit:string;
    outageTypeId: number;
    outageTitle: string;
    outageLevel: number;
    nextOutageDate: Date
    constructor(reg) {
        this.snoId = reg.snoId ? reg.snoId : -1;
    }
}
export interface NextOutages {
    outageTypeId: number;
    outageTitle: string;
    outageLevel: number;
}