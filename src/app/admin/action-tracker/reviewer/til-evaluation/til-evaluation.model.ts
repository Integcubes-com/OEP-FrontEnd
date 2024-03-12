export interface TILEvaluation {
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
    technicalReviewId: number;
    technicalReviewUserId: string;
    technicalReviewSummary: string;
    dateReceivedNomac: string;
    dateIssuedDocument: string;
    sourceId: number;
    sourceTitle: string;
    reviewStatusId: number;
    reviewStatusTitle: string;
    notes: string;
    componentId: number;
    componentTitle: string;
    implementationNotes: string;
    report: string;
    yearOfIssue: string;
    evaluationDate: string;
    reviewStatus: string;
    evaluated: boolean;
    mandatory: boolean;
    critical: boolean;
    safetyCritical: boolean;
    reviewTitle:string;
    evaluatedById:number;
    evaluatedByTitle:string;
}
export interface tilReviewStatus{
    tesId:number,
    title:string,
    isSelected:boolean
}
