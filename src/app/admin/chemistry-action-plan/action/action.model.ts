import { CAPAction, CAPDept, CAPPriority, CAPStatus, CAPUsers, CAPObs, CAPSites, CAPRegion, CAPObservation } from "../observation/observation.model";

export class CAPAcEndAPI {
    actions: CAPAction[];
    priority: CAPPriority[];
    status: CAPStatus[];
    sites: CAPSites[];
    regions: CAPRegion[];
    observation:CAPObservation[];
    dept: CAPDept[];
    appUser: CAPUsers[];
  }
  export class CAPAcEndFilter{
    regionId:number;
    siteId:number;
    priorityId:number;
    statusId:number;
  }
  export interface CAPFilterApi{
    sites:CAPSites[];
    actions:CAPAction[];
  }
