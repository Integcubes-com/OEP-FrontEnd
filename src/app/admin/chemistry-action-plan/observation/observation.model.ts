export class CAPObservation {
  observationId: number;
  observationTitle: string;
  plantId: number | null;
  plantTitle: string;
  regionId: number | null;
  regionTitle: string;
  actionId: number;
  actionTitle: string;
  priorityId: number;
  priorityTitle: string;
  startDate: Date;
  targetDate: Date;
  remarks: string;
  deptId: number;
  deptTitle: string;
  userId: number;
  userName: string;
  statusId: number;
  statusTitle: string;
  referenceNumber: string;
  suggestion: string;
  closureDate:Date;
  closureStatus:number;
  constructor(reg) {
    this.observationId = reg.observationId ? reg.observationId : -1;
    this.actionId = reg.actionId?reg.actionId:-1;
  }
}
export interface CAPSites {
  siteId: number;
  siteTitle: string;
  selected:boolean
}
export interface CAPRegion {
  regionId: number
  regionTitle: string
  selected:boolean
}
export class CAPDept {
  deptId: number;
  deptTitle: string;
}
export class CAPPriority {
  priorityId: number;
  priorityTitle: string;
}
export class CAPStatus {
  statusId: number;
  statusTitle: string;
  selected:boolean
}
export class CAPUsers {
  userName: string;
  userId: number;
  email: string;
  fullName: string;
}
export class CAPAcAPI {
  actions: CAPAction;
  dept: CAPDept[];
  priority: CAPPriority[];
  status: CAPStatus[];
  appUser: CAPUsers[];
  observation:CAPObs;

}
export class CAPObs {
  observationId: number
  observationTitle: string;
}
export class CAPAction {
  plantId:number
  plantTitle:string
  regionId:number
  regionTitle:string
  observationId: number;
  observationTitle: string;
  actionId: number;
  actionTitle: string;
  priorityId: number;
  priorityTitle: string;
  startDate: Date;
  targetDate: Date;
  remarks: string;
  deptId: number;
  deptTitle: string;
  userId: number;
  userName: string;
  statusId: number;
  statusTitle: string;
  referenceNumber: string;
  suggestion: string;
  closureDate:Date;
  closureStatus:number;
  actionAdmin :number;
  constructor(reg) {
    this.actionId = reg.actionId ? reg.actionId : -1;
  }
}
export interface CAPObsAPI {
  observation: CAPObservation[];
  sites: CAPSites[];
  regions: CAPRegion[];
  dept: CAPDept[];
  priority: CAPPriority[];
  status: CAPStatus[];
  appUser: CAPUsers[];
}





