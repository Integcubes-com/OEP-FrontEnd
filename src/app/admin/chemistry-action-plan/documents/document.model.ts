import { CAPSites } from "../observation/observation.model";

export class CAP_Documents{
    docId:number;
    docName:string;
    siteId:number;
    siteTitle:string;
    regionId:number;
    regionTitle:string;
    file:File;
    constructor(reg){
        this.docId = reg.docId?reg.docId:-1
    }
}
export interface CAP_DocAPI{
    documents:CAP_DocAPI[];
    sites:CAPSites[];
}