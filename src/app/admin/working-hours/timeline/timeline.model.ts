export interface APITimeline {
    timeline: GroupedHoursItems[]
    outages: GroupedOutagesItems[]
}
export interface WH_TimelapseModel {
    startHour: number
    equipmentId: number
    unit:string
    startDate: Date
    yearData: WH_timelapseYear[]
}
export interface WH_timelapseYear {
    yearlyTotal: number
    outages: WH_timelapseOutage[]
    yearId: number
}
export interface WH_timelapseOutage {

    outageTitle: string
    outageCode:string
}
export interface GroupedHours {
    equipmentId,
    Items: GroupedHoursItems[]
}
export interface GroupedHoursItems {
    siteId,
    equipmentId,
    unit,
    startDate,
    startHours,
    yearId,
    runningHour,
    monthId,
    onmContractExpiry,
}
export interface GroupedOutges {
    equipmentId,
    Items: GroupedOutagesItems[]
}
export interface GroupedOutagesItems {
    siteId
    equipmentId
    unit
    outageId
    outageTitle
    runningHours
    nextOutageDate
    colorCode
    counter:number
    validate:string

}
