import { CRegions } from "src/app/shared/common-interface/common-interface";

export class UUser {
    userId: number;
    userName: string;
    email: string;
    password: string;
    phone: string;
    firstName:string;
    lastName:string;
    constructor(reg) {
        this.userId = reg.userId ? reg.userId : -1;
        this.userName = reg.userName ? reg.userName : "";
        this.email = reg.email ? reg.email : "";
        this.password = reg.password ? reg.password : "";
        this.phone = reg.phone ? reg.phone : "";
        this.firstName = reg.firstName ? reg.firstName : "";
        this.lastName = reg.lastName ? reg.lastName : "";

    }
}
export interface URole {
    roleId: number;
    roleTitle: string;
}
export interface USite {
    siteId: number;
    siteName: string;
    regionId:number;
    selected:boolean;
}
export interface UTechnology {
    techId: number;
    techTitle: string;
    selected:boolean;
}
export interface UAPIData {
    users: UUser[];
    roles: URole[];
    sites: USite[];
    regions:CRegions[];
    technologys: UTechnology[];
}
export interface UFormSubmit {
    users: UUser;
    roles: URole[];
    sites: USite[];
    technologys: UTechnology[];
}
export interface UUserInfo {
    roles: URole[];
    sites: USite[];
    technologys: UTechnology[];
}