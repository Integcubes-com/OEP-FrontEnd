import { CSites, CTechnology } from "src/app/shared/common-interface/common-interface";
import { OMA_program } from "../add-program/program.model";

export class OMA_MitigationAction{
    actionId:number;
    actionTitle:string;
    priorityId:number;
    priorityTitle:string;
    programId:number;
    programTitle:string;
    comments:string;
    techAccountabilityId:number;
    taTitle:string;
    objectiveOutcome:string;
    // targetDate:Date;
    constructor(reg){
        this.actionId = reg.actionId?reg.actionId: -1;
    }
}
export class OMA_MitigationResult {
    programId: number;
    programTitle: string;
    actionId: number;
    actionTitle: string;
    priorityId: number;
    priorityTitle: string;
    techAccountabilityId: number;
    taTitle: string;
    comments: string;
    objectiveOutcome: string;
    targetDate: Date;
    resultId: number;
    siteId: number;
    siteTitle: string;
    technologyId: number;
    technologyTitle: string;
    tataInvolvement: boolean;
    thirdPartyInterface: string;
    statusId: number;
    statusTitle: string;
    reviewerComment: string;
    isReviewed: boolean;
    actionComment: string;
    rework: boolean;
    constructor(reg){

    }
}

export interface OMA_KeyPhase{
    keyPhaseId:number;
    keyPhaseTitle:string;
    keyPhaseCode:string;
}
export interface MitigationActionInterfaceAPI{
    status:OMA_Status[],
    programs:OMA_program[],
    prioritys:OMA_Priority[],
    techAccountabilities:OMA_TechAccount[],
    keyPhase:OMA_KeyPhase[],
}
export interface OMA_MitigationActionSendApi{
    keyPhase:OMA_KeyPhase[],
    mitigationAction:OMA_MitigationAction;
}
export interface OMA_Priority{
    priorityId:number;
    priorityTitle:string;
}
export interface OMA_TechAccount{
    taId:number;
    taTitle:string;
}
export interface OMA_Status{
    statusId:number;
    statusTitle:string;
}


export interface OMA_Filter{
    priority :number,
    site: number,
    technology:number,
    status :number,
    program :number
}
