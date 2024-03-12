export class TilEvaluationForm {
    teId: number;
    teSummary: string;
    reviewStatus: number;
    evaluated: boolean;
    mandatory: boolean;
    critical: boolean;
    safetyCritical: boolean;
    constructor(reg) {
        this.teId = reg.teId ? reg.teId : -1;
        this.teSummary = reg.teSummary ? reg.teSummary : "";
    }
}
export class TILs {
    tilId: number;
    tilNumber: string;
    alternateNumber: string;
    applicabilityNotes: string;
    tilTitle: string;
    currentRevision: string;
    tilFocusId: number;
    tilFocusTitle: string;
    documentTypeId: number;
    documentTypeTitle: string;
    oem: string;
    oemSeverityId: number;
    oemSeverityTitle: string;
    oemTimingId: number;
    oemTimingTitle: string;
    reviewForumId: number;
    reviewForumtitle: string;
    recommendations: string;
    technicalReviewId:number;
    technicalReviewUserId:number
    technicalReviewSummary:string;
    dateReceivedNomac: Date;
    dateIssuedDocument: Date;
    sourceId: number;
    sourceTitle: string;
    reviewStatusId:number;
    reviewStatusTitle:string;
    notes: string;
    componentId: number;
    componentTitle: string;
    report: string;
    tilReport:File;
    implementationNotes:string;
    yearOfIssue: string;
    reportAttahced:boolean;
    reportName:string;
    isSelected:boolean;
    tbEquipmentId:number;
    tbTitle:string;
    constructor(reg) {
        this.tilId = reg.tilId ? reg.tilId : -1;
        this.reviewStatusId = reg.statusId? reg.statusId : 1;
    }
}
export interface TSource{
    sourceId:number,
    sourceTitle:string
}
export interface tbEquipemnt{
    tilEquipmentId:number,
    title:string,
    isSelected:boolean,

}
export interface TComponent {
    componentId: number,
    componentTitle: string
}
export interface TDocType {
    typeId: number,
    typeTitle: string,
    isSelected:boolean,
}
export interface TFilterObj{
    startDate:Date,
    endDate:Date,
    documentId:number,
    statusId:number,
    formId:number
}
export interface TEquipment {
    equipmentId: number,
    equipmentTitle: string
}
export interface TSeverity {
    oemSeverityId: number,
    oemSeverityTitle: string,
    isSelected:boolean,
}
export interface TSeverityTiming {
    timingId: number,
    timingCode: string
}
export interface TFocus {
    focusId: number,
    focusTitle: string,
    isSelected:boolean,
}
export interface TReviewForum {
    reviewFormId: number,
    reviewFormTitle: string,
    isSelected:boolean,
}
export interface TReviewStatus {
    reviewStatusId: number,
    reviewStatusTitle: string,
    isSelected:boolean,
}
export interface TSite {
    siteId: number,
    siteName: string
}
export interface TAPIData {
    tils: TILs[],

}
export interface TInterface{
    tilComponent: TComponent[],
    tilDocType: TDocType[],
    oemSeverity: TSeverity[],
    oemSeverityTiming: TSeverityTiming[],
    tilFocus: TFocus[],
    reviewForum: TReviewForum[],
    reviewStatus: TReviewStatus[],
    tilSource:TSource[];
    tbEquipemnt:tbEquipemnt[];
}