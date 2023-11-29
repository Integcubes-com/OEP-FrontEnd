import { CUsers } from "src/app/shared/common-interface/common-interface";

export class clusterModel {
    clusterId: number;
    clusterTitle: string;
    clusterCode: string;
    executiveDirectorId: number;
    executiveDirectorTitle: string;
    executiveVpName: string;
    regionId:number;
    regionTitle:string;
    constructor(reg) {
        this.clusterId = reg.clusterId ? reg.clusterId : -1
    }
}

export interface clusterAPIModel {
    clusterId: number;
    clusterTitle: string;
    clusterCode: string;
    executiveDirectorId: number;
    executiveDirectorTitle: string;
    executiveVpName: string
    regionId:number;
    regionTitle:string;
    executiveVps: CUsers[]
}

export interface clusterVps {
    executiveVpId: number;
    executiveVpTitle: string;
}