import { TILs } from "../add-tils/add-tils.model";

export class TilActionPackage {
    packageId: number;
    tilId: number;
    tilNumber: string;
    actionTitle: string;
    actionClosureGuidelinesId: number;
    actionCategory: string;
    outageId: number;
    unitStatus: string;
    actionDescription: string;
    expectedBudget: string;
    budgetSourceId: number;
    budegetSource: string;
    patComments: string;
    priorityId: number;
    priorityTitle: string;
    recurrence: string;
    reviewStatusId: number;
    reviewStatus: string;
    // siteId:number;
    // siteTitle:string;
    // regionId:number;
    // regionTitle:string;
    constructor(reg) {
        this.packageId = reg.packageId ? reg.packageId : -1;
        this.reviewStatusId = reg.reviewStatusId?reg.reviewStatusId:1;
    }
}
export interface TAPSites{
    siteId:number;
    siteTitle:string;
}
export interface TAPRegions{
    regionId:number;
    regionTitle:string;
}
export interface TAPEquipment {
    equipmentId: number;
    siteId: number;
    siteTitle: string;
    regionId:number;
    regionTitle:string;
    unit:string;
    isSelected:boolean;
    isGroup:number,
    groupedEquipments:string,
}
export interface TAPPriority {
    priorityId: number;
    priorityTitle: string;
    isSelected:boolean
}

export interface TAPUser {
    email: string;
    userId: number;
    userName: string;
}

export interface TAPEditData {
    // users: TAPUser[];
    equipments: TAPEquipment[];
}
export interface TAPFilterObj {
    budgetSource: number;
    tilNumber: number;
    unitStatus: number;
    reviewStatus: number;
    priority: number;
}
export interface TAPActionClosure{
    acId:number,
    title:string,
}
export interface TASubmitObj{
    action:TilActionPackage,
    // user:TAPUser[],
    equipment:TAPEquipment[],
}
export interface TAPBudgetSource {
    budgetSourceId: number;
    budgetSourceTitle: string;
    isSelected:boolean
}
export interface TAPOutage{
    outageTypeId:number,
    title:string,
    isSelected:boolean
}
export interface TAPReviewStatus {
    reviewStatusId: number;
    reviewStatusTitle: string;
    isSelected:boolean;
}
export interface TAPAPIData{
    actions:TilActionPackage[]
}
export interface TAPTilList{
    tilId:number
    tilNumber:string
}
export interface TAPInterface{
    equipments:TAPEquipment[],
    priority:TAPPriority[],
    budgetSource:TAPBudgetSource[],
    reviewStatus:TAPReviewStatus[],
    actionClosureGuidelines:TAPActionClosure[],
    outages:TAPOutage[],
    tilsList: TILs[],
}

