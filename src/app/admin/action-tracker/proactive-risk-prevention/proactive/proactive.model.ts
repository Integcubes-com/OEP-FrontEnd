export class ProactiveRiskPrevention {
    proactiveId: number;
    proactiveReference: string;
    proactivetitle: string;
    recommendations: string;
    guidelines: string;
    auditPreperatoryChecklist: string;
    criticalityId: number;
    criticalityTitle: string;
    categoryId: number;
    categoryTitle: string;
    exposureId: number;
    exposureTitle: string;
    sourceId: number;
    sourceTitle: string;
    themeId: number;
    details:string;

    themeTitle: string;
    sites: string;
    approachStatusId: number;
    approachStatusTitle: string;
    constructor(reg){
        this.proactiveId = reg.proactiveId?reg.proactiveId: -1
    }
}
export interface ProactiveInterface {
    proactiveCriticality: ProactiveCriticality[];
    proactiveCategory: ProactiveCategory[];
    proactiveExposure: ProactiveExposure[];
    proactiveApproachStatus: ProactiveApproachStatus[];
    proactiveProjectPhase: ProactiveProjectPhase[];
    proactiveProactiveSource: ProactiveProactiveSource[];
    proactiveProactiveTheme: ProactiveProactiveTheme[]
}
export interface ProactiveCategory {
    categoryId: number
    categoryTitle: string
}
export interface ProactiveCriticality {
    criticalityId: number
    criticalityTitle: string
}
export interface ProactiveExposure {
    exposureId: number
    exposureTitle: string
}
export interface ProactiveApproachStatus {
    approachStatusId: number
    approachStatusTitle: string
}
export interface ProactiveProjectPhase {
    projectPhaseId: number
    projectPhaseTitle: string
}
export interface ProactiveProactiveSource {
    sourceId: number
    sourceTitle: string
}
export interface ProactiveProactiveTheme {
    themeId: number
    themeTitle: string
}
export interface ProactiveSaveObj{
    proactive:ProactiveRiskPrevention,
    projectPhase:ProactiveProjectPhase[];
}
