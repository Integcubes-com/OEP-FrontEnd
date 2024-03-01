export interface TilDetailReport{
     siteName: string;
     siteId: number;
     unit: string;
     actions: number;
     closed: number;
     opened: number;
     inProgress: number;
     oemSeverityTitle:string,
     timingCode:string,
     focusTitle:string,
  
}
export interface Timing {
     timingId: number;
     timingCode: string;
     isSelected:boolean

 }
 export interface Unit {
    equipmentId:number,
    unit:string,
    isSelected:boolean

}
 export interface Focus {
     focusId: number;
     focusTitle: string;
     isSelected:boolean

 }
 
 export interface Severity {
     oemSeverityId: number;
     oemSeverityTitle: string;
     isSelected:boolean

 }
 
 export interface Status {
     tasId: number;
     title: string;
     isSelected:boolean
 }
 export interface TilReportInteface{
     timing:Timing[]
     focus:Focus[]
     severity:Severity[]
     status:Status[]
     unit:Unit[]
 }