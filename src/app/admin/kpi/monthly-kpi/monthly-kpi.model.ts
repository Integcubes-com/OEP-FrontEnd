export class KPIData {
    groupId: number
    groupTitle: string
    groupCode: string
    groupWeight: number
    indicatorId: number
    indicatorCode: string
    indicatorTitle: string
    indicatorWeight: number
    infoId:number
    weightageId: number
    siteId: number
    siteName: string
    value: number
    month: number
    year: number
    annual: string
    comment: string
    color:string
    formulaType:number
    unit:string
    measurementTitle: string
    annualTargetTitle: string
    classificationTitle: string
    factor:number
    weightedScore:number
    notApplicable:boolean;
    isParent:boolean;
    isDisplay:boolean;
}
// export class KPIInterface {
//     measurementTitle: string
//     annualTargetTitle: string
//     classificationTitle: string
//     siteId: number
//     indicatorId: number
// }
export class MonthYearPickerComponent {
    public months: { title: string; number: number }[] = [
    
    ];
}