import { Title } from "@angular/platform-browser";

export interface CSites {
    regionId:number,
    regionTitle :string
    siteId: number;
    siteTitle: string;
    isSelected: boolean;
}

export interface CRegions {
    regionId: number;
    regionTitle: string;
    isSelected: boolean;
}
export interface CCluster {
    clusterId:number
    clusterTitle:string
    isSelected:boolean
}
export interface CUsers {
    userId: number;
    userName: string;
    name: string;
    email: string;
    isSelected: boolean;
}
export interface CCountry {
    countryTitle: string
    countryId: number,
    isSelected: boolean;
}
export interface CTechnology {
    technologyTitle: string;
    technologyId: number,
    isSelected: boolean;
}
export interface CFleetEquipment {
    fleetEquipmentId: number;
    fleetEquipmentTtile: string;
    fleetEquipmentType: string;
    fleetEquipmentOEM: string;
}
export interface CEquipment {
    equipmentId: number;
    unit: string;
}