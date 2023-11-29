// import { TAPBudgetSource, TAPEquipment, TAPPriority, TAPUser, TilActionPackage } from "../tils-tracker-assignment.model";

// export class ActionTrackerEndUser {
//     tilActionTrackerId: number;
//     tapId: number;
//     statusId:number;
//     statustitle:string;
//     tapTitle:string;
//     tilAction:string;
//     actionDescription: string;
//     siteEquipmentId:number;
//     siteEquipmentTitle:string;
//     userId:number;
//     userName:string;
//     budgetSourceId: number;
//     budgetSourceTitle:string;
//     statusCalculated: string;
//     tilDescription:string;
//     siteStatusDetail: string;
//     budgetId: number;
//     budgetTitle: string;
//     partServiceId:number;
//     partServiceTitle:string;
//     planningId: number;
//     planningTitle: string;
//     finalImplementationTitle: string;
//     finalImplementationId: number;
//     targetDate:Date;
//     priorityId:number;
//     priorityTitle:string;
//     calStatus:string;
//     calcPriority:number;
//     budgetCalc:string;
//     ddtCalc:string;
//     evidenceCalc:string;
//     implementationCalc:string;
//     partsCalc:string;
//     sapCalc:string
//     evidenceId:number
//     evidenceTitle:string
//     tilReport:File
//     constructor(reg) {
//         this.tilActionTrackerId = reg.tilActionTrackerId ? this.tilActionTrackerId : -1;
//     }
// }
// export interface tataBudget {
//     budgetId: number,
//     budgetName: string,
// }
// export interface tataSAP{
//     sapPlanningTitle,
//     sapPlanningId
// }export interface tataEv{
//     evidenceId,
//     evidenceTitle
// }
// export interface tatapart{
//     partId,
//     partTitle
// }
// export interface tataFinalImplementation{
//     finalImpId,
//     finalImpTitle
// }
// export interface tataStatus{
//     statusId:number;
//     statustitle:string;
// }
// export interface ActionTilAddAPI {
//     action: ActionTrackerEndUser[],
//     package: TilActionPackage,
//     equipment:TAPEquipment[],
//     priority:TAPPriority[],
//     budgetSource:TAPBudgetSource[],
//     budget:tataBudget[],
//     part:tatapart[],
//     finalImplementation:tataFinalImplementation[],
//     evidence:tataEv[],
//     users:TAPUser[],
//     sapPlaning:tataSAP[],
//     statusList:tataStatus[]
// }