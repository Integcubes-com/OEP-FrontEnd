import { TFocus, TSeverity, tbEquipemnt } from "../../tils/add-tils/add-tils.model";
import { TAPEquipment, TAPPriority, TAPBudgetSource } from "../../tils/tils-tracker/tils-tracker-assignment.model";

export class ActionTrackerEndUser {
    assignedToId :number;
    assignedToTitle :string;
    tilActionTrackerId: number;
    tapId: number;
    tilTitle:string;
    statusId:number;
    statustitle:string;
    tapTitle:string;
    tilAction:string;
    actionDescription: string;
    siteEquipmentId:number;
    siteEquipmentTitle:string;
    userId:number;
    userName:string;
    budgetSourceId: number;
    budgetSourceTitle:string;
    statusCalculated: number;
    tilDescription:string;
    siteStatusDetail: string;
    budgetId: number;
    budgetTitle: string;
    partServiceId:number;
    partServiceTitle:string;
    planningId: number;
    planningTitle: string;
    finalImplementationTitle: string;
    finalImplementationId: number;
    targetDate:Date;
    daysToTarget:string;
    priorityId:number;
    priorityTitle:string;
    calStatus:string;
    calcPriority:number;
    focusId:number;
    focusTitle:string;
    oemSeverityId:number;
    oemSeverityTitle:string;
    budgetCalc:string;
    ddtCalc:string;
    evidenceCalc:string;
    implementationCalc:string;
    partsCalc:string;
    sapCalc:string
    evidenceId:number
    evidenceTitle:string
    regionId:number
    regionTitle:string
    siteId:number
    siteTitle:string
    reportAttahced:boolean
    reportName:string
    tilReport:File
    actionClosureGuidelinesId:number
    actionCategory:string
    outageId:number
    unitStatus:string
    tilNumber:string
    adminComment:string
    reviewerComment: string;
    isCompleted: boolean;
    rework: boolean;
    clusterReviewed: boolean;
    implementedDate:Date;
    timingCode:string;
    oemTimimgCodeId:number;
    actionClosedBy:number;
    actionClosedTitle:string;
    actionClosureDate:Date;
    tbEquipmentId:number;
    tbTitle:string;
    constructor(reg) {
        this.tilActionTrackerId = reg.tilActionTrackerId ? this.tilActionTrackerId : -1;
    }
}
export interface tataBudget {
    budgetId: number,
    budgetName: string,
}
export interface unitTypes {
    outageTypeId: number,
    title: string,
    isSelected:boolean,
}
export interface tataSAP{
    sapPlanningTitle:string,
    sapPlanningId:number,
    isSelected:boolean,
}export interface tataEv{
    evidenceId,
    evidenceTitle
}
export interface tatapart{
    partId,
    partTitle
}
export interface tataFinalImplementation{
    finalImpId,
    finalImpTitle,
    isSelected:boolean,
}
export interface tataStatus{
    statusId:number;
    statustitle:string;
    isSelected:boolean
}
export interface ActionTilAddAPI {
    action: ActionTrackerEndUser[],
}
export interface ActionTilInterfaceApi{
    equipment:TAPEquipment[],
    priority:TAPPriority[],
    budgetSource:TAPBudgetSource[],
    budget:tataBudget[],
    part:tatapart[],
    finalImplementation:tataFinalImplementation[],
    evidence:tataEv[],
    sapPlaning:tataSAP[],
    statusList:tataStatus[],
    oemSeverity:TSeverity[],
    tilFocus:TFocus[]
    outageTypes:unitTypes[],
    tbEquipemnt:tbEquipemnt[],
}
export class Year{
    year:number;
    isSelected:boolean
}