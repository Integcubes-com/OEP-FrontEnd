import { IRPriority, InsurenceRecommendation } from "../add-insurence/insurence.model";

export class InsurenceTracker {
    assignedToId: number
    assignedToTitle: string
    insurenceActionTrackerId: number;
    recommendationId: number;
    recommendationTitle: string;
    recommendationReference: string;
    documentTypeTitle: string;
    type: string;
    clusterId: number;
    clusterTitle: string;
    action: string;
    targetDate: Date;
    statusId: number;
    statusTitle: string;
    statusScore: number;
    companyId: number;
    companyTitle: string;
    comments: string;
    closureDate: Date;
    evidenceAvailableId: number
    evidenceAvailable: string;
    evidenceAvailableScore: number;
    dayStatusId: number;
    dayStatusTitle: string;
    dayStatusScore: number;
    calcStatus: number;
    calcEvid: number;
    calcDate: number;
    completionScore: string;
    priorityTitle: string;
    insurenceStatusTitle: string
    nomacStatusTitle: string
    daysToTarget: string;
    scoreDetails: string;
    siteId: number;
    siteTitle: string;
    regionId: number;
    regionTitle: string;
    sourceId: number;
    sourceTitle: string;
    reportFile: File;
    reportAttahced: boolean;
    reportName: string;
    adminComment: string;
    reviewerComment: string;
    isCompleted: boolean;
    rework: boolean;
    clusterReviewed: boolean;
    implementedDate:Date;
    actionClosedTitle:string
    constructor(reg) {
        this.insurenceActionTrackerId = reg.insurenceActionTrackerId ? reg.insurenceActionTrackerId : -1;
    }
}
export interface ITFilterObj {
    startData: Date,
    endDate: Date,
    regionId: number,
    siteId: number,
    department: number,
    source: number
}
export interface ITEndUserFilter {

}
export interface ITsites {
    siteId: number,
    siteName: string,
}

export interface ITRegions {
    regionId: number,
    regionTitle: string,
    isSelected: boolean
}
export interface ITRecommendation {
    recommendationId: number,
    recommendationTitle: string,
    recommendationReference: string,
}
export interface ITSource {
    sourceId: number,
    sourceTitle: string
    isSelected: boolean

}
export interface ITCompany {
    companyId: number,
    companyTitle: string
    isSelected: boolean
}
export interface ITUser {
    email: string,
    userName: string,
    userId: number
}
export interface ITStatus {
    statusId: number,
    statusTitle: string,
    statusScore: number,
    isSelected: boolean
}
export interface ITEvidence {
    evidenceTitle: string,
    evidenceId: number,
    evidenceScore: number
}
export interface ITDayStatus {
    dayStatusId: number,
    dayStatusTitle: string,
    dayStatusScore: number,
}
export interface IATAPIData {
    tracker: InsurenceTracker[],
}
export interface IAInterface {
    iatSource: ITSource[],
    iatCompany: ITCompany[],
    iatStatus: ITStatus[],
    recommendation: ITRecommendation[];
    evidenceAvailable: ITEvidence[],
    daysStatus: ITDayStatus[],
    priority:IRPriority[],
}