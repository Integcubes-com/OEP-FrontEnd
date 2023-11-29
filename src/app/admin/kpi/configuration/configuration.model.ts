export class KPIConfigurations {
    infoId: number
    groupId: number
    groupTitle: string
    groupCode: string
    groupWeight: number
    indicatorId: number
    indicatorCode: string
    indicatorTitle: string
    infoWeight: number
    factor: number
    unit: string
    formulaType: number
    siteId: number
    measurementTitle: string
    annualTargetTitle: string
    classificationTitle: string
    constructor(reg) {
        this.infoId = reg.infoId ? reg.infoId : -1
    }
}

export interface KPIIndicatorGroup {
    groupId: number
    groupTitle: string
    groupCode: string
    groupWeight: number
}

export interface KPIIndicator {
    groupId: number,
    indicatorId: number,
    indicatorTitle: string,
    indicatorCode: string,
}
export interface formulaType{
    formulaTypeId:number
    formulaTitle:string
    formulaCode:string
}