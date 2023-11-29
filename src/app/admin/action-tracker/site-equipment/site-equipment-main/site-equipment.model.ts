export class SiteEquipment{
    equipmentId:number;
    regionId:number; 
    regionTitle:string;
    siteId:number; 
    siteTitle:string;
    model:string; 
    modelId:number;
    modelEquipmentType:string;
    unitSN:string;  
    nextOutage:Date; 
    outageType:string; 
    outageTypeId:number; 
    details:string; 
    responsible:number; 
    responsibleName:string;
    unitCOD:Date; 
    unit:string; 
    oemId:number;
    oemTitle:string;
   
    constructor(reg){
        this.equipmentId=reg.equipmentId?reg.equipmentId:-1;
    } 

}
export interface SEFilter{
   oemId:number;
   equipmentTypeId:number;
    regionId:number,
    siteId:number,
    modelId:number,
    fleetEquipId:number,
    outageTypeId:number,

}
export interface SERegions{
    title:string,
    regionId:number
}
export interface SESites{
    siteId:number,
    siteName:string,

}
export interface SEInterfaceAPI{
    equipFleetList: SEFleet[];
    equipFleetType: SESiteEquipmentType[];
    equipFleetoem:SESiteEquipmentOME[];
}

export interface SEFleet{
    fleetEquipId:number;
    title:string;
    isSelected:boolean
}
export interface SEUser{
    userId:number;
    userName:string;
}
export interface SESiteEquipmentType{
    isSelected:boolean
    typeId:number;
    typeTitle:string
}
export interface SESiteEquipmentOME{
    isSelected:boolean
    oemTitle:string
    oemId:number
}
export interface SEAPIData {
    siteEquipment: SiteEquipment[],
}