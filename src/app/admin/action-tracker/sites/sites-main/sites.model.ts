import { CTechnology } from "src/app/shared/common-interface/common-interface";

export class UploadData 
{
public fileList: File[];
}
export class SitesI {
    siteId: number;
    siteName: string;
    insurenceReport: File;
    tilsReport: File;
    country: string;
    countryId:number;
    region: string;
    regionId:number;
    projectCompany: string;
    siteDescription: string;
    projectStatus: string;
    projectStatusId:number;
    projectCOD: Date;
    onmContractExpiry: Date;
    insuranceLastReportDate: Date;
    insuranceNextAuditDate: Date;
    sitePGMId: number;
    sitePGMName:string;
    insurancePOCId: number;
    insurancePOC:string
    insuranceSummary: string;
    tilsSummary: string;
    clusterId:number;
    clusterTitle:string;
    siteEMOId: number;
    siteEMO:string;
    insurenceReportPath:string;
    tilsReportPath:string;
    s4hanaCode:string;
    projectName:string;
    onmName:string;
    tilPOCId:number;
    tilPOC:string;
    constructor(site){
        this.siteId = site.siteId?site.siteId:-1;
    }
}
export interface SRegion{
    title:string;
    regionId:number
}
export interface SCountry{
    title:string;
    countryId:number
}
export interface STech{
    name:string;
    techId:number;
}
export interface SPStatus{
    projectStatusTitle:string;
    projectStatusId:number;
}
export interface SUsers{
    userId:number;
    userName:string;
    email:string;
    fullName:string;
}
export interface APISites{
    sites:SitesI[]
    siteRegions:SRegion[]
    siteCountry:SCountry[]
    siteTechnology:STech[]
    siteProjectStatus:SPStatus[]
    users:SUsers[]
}
export interface SSaveData{
    sites:SitesI
    techlogies:CTechnology[]
}