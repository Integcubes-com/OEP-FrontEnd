export class WorkingHourModel{
    startingId:number
    regionId:number
    regionTitle:string
    siteId:number
    siteTitle:string
    equipmentId:number
    unit:string
    startHours:number
    startDate:Date
    onmContractExpiry:Date
    constructor(reg){
        this.startingId = reg.startingId?reg.startingId:-1
    }
}
export interface workingMonthlyHours {
    yearId: number
    runningHours: number
    monthId: number
    yearlyTotal: number
    monthlyTotal:number
}
export interface APIData{
    uiqueYear:number[]
    yealyList:workingMonthlyHours[]
    startHours:number
} 

export interface ApiSave{
    yearlyResult:workingMonthlyHours[],
    result:WorkingHourModel,
    userId:number,
    typeId:number
}

export interface WH_WorkingCalcFilter{
    regionId:number;
    siteId:number;
    equipmentId:number;
}