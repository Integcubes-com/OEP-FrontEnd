

export class InsurenceRecommendation {
    recommendationId:number;
    title:string;
    insuranceRecommendation:string;
    referenceNumber:string;
    priorityId:number;
    priorityTitle:string;
    insurenceStatusId:number;
    insurenceStatusTitle:string;
    nomacStatusId:number;
    nomacStatusTitle:string;
    latestStatus:string;
    targetDate:Date;
    siteUpdates:string;
    pcComments:string;
    type:string;
    expectedBudget:string;
    siteTitle:string;
    siteId:number;
    significance:string;
    proactiveReference:string;
    proactiveId:number;
    proactiveTitle:string;
    regionTitle:string;
    regionId:number;
    sourceId:number;
    sourceTitle:string;
    documentTypeId:number
    documentTypeTitle:string;
    year:string;
    insuranceReport:File; 
    recommendationTypeId:number
    recommendationTypeTitle:string;
    report:string;
    reportAttahced:boolean;
    reportName:string;
    clusterId:number;
    clusterTitle:string;
    constructor(reg) {
        this.recommendationId = reg.recommendationId ? reg.recommendationId : -1;
        this.nomacStatusId = reg.nomacStatusId ? reg.nomacStatusId : 2;
        this.insurenceStatusId = reg.insurenceStatusId ? reg.insurenceStatusId : 3;
        debugger;
        let currentDate = new Date();
        let sixMonthDate = currentDate.setMonth(currentDate.getMonth() + 6)
        this.targetDate = reg.targetDate ? reg.targetDate : currentDate;
    }
}
export interface IRFilter{
    startData: Date,
    endDate : Date,
    regionId:number,
    siteId:number,
    sourceId:number,
    nomacStatusId:number,
    insuranceStatusId:number,
}
export interface IRRegion {
    regionId: number,
    title: string
}
export interface IRSite {
    siteId: number,
    siteName: string
}
export interface IRDocumentType {
    documentId: number,
    documnetTitle: string
}
export interface IRNomacStatus {
    nomacStatusId: number,
    nomacStatusTitle: string
    isSelected:boolean
}
export interface IRInsurenceStatus {
    insurenceStatusId: number,
    insurenceStatusTitle: string
    isSelected:boolean

}
export interface IRProactive {
    proactiveId: number,
    proactivetitle: string,
    proactiveReference:string
}
export interface IRSource {
    sourceId: number,
    sourceTitle: string
    isSelected:boolean

}
export interface IRecommendationType {
    typeId: number,
    typeTitle: string
}
export interface IRPriority {
    priorityId: number,
    priorityTitle: string,
    isSelected: boolean,
}
export interface InsurenceRecommendationApi {
    reommendations: InsurenceRecommendation[]
    
}
export interface IRInterfaces{
    documentType: DocumentType[],
    proactive: IRProactive[],
    source: IRSource[],
    recommendationType: IRecommendationType[],
    nomacStatus:IRNomacStatus[],
    insurenceStatus:IRInsurenceStatus[],
    priority:IRPriority[],
}