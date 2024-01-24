export class OT_outageTracker {
    siteId: number
    siteTitle: string
    phaseId: number
    phaseNumber: number
    phaseTitle: string
    phaseReadId: number
    phaseReadDesc: string
    notApplicable:boolean
    statusId: number
    statusTitle : string
    potId: number
    snoId: number
    outageId: number
    outageTitle: string
    nextOutageDate:Date
    equipmentId:number
    unit:string
    startDate:Date
    endDate: Date
    name:string
}

export interface OT_FileList {
    fileId: number
    fileName: string
    remarks: string
    path:string
}
export interface APISaveData{
    outageTracker:OT_outageTracker;
    monthlyData:OTData;
}
export interface OTApiData{
    monthList:OTDate[]
    outageData:OTData
    userData:OTUser[]
}
export interface OTUser{
    userId:number
    userName:string
    name:string
}
export interface OTDate{
    date:Date,
    monthId:string
}
export class OTData{
    yearId:number
    monthId:number
    remarks:string
    progress:number
    progressId:number
    constructor(reg){
        this.progressId = reg.progressId?reg.progressId:-1
    }
}
export interface OT_OutageTrackerFilter{
    phaseNumber:number,
    siteId:number,
    outageId:number,
    status:number,
}
export interface OT_OutageStatus{
    statusTitle:string,
    statusId:number
}
export interface OT_APiData {
    phaseNumber: any[]
    outage: any[]
    status:OT_OutageStatus[]
}