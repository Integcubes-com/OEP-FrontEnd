import { CUsers } from "src/app/shared/common-interface/common-interface";

export class Regions {
    regionId: number;
    title: string;
    tiLsSummary: string;
    insuranceSummary: string;
    executiveDirectorId: number;
    executiveDirectorTitle: string;
    executiveVPId: string;
    executiveVPTitle: string;
    constructor(reg) {
        this.regionId = reg.regionId ? reg.regionId : -1;

    }
}

export interface SaveApiData {
    region:Regions
    userList:CUsers[]
}


