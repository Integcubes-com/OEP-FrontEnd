export class ModelEquipment {
    fleetEquipId: number;
    title: string;
    equipmentTypeId: number;
    oemId: number;
    oemTitle: string;
    typeTitle: string;
    constructor(reg){
        this.fleetEquipId = reg.fleetEquipId?reg.fleetEquipId:-1
    }
}
export interface ModelEquipmentInterfaceAPI{
    equipFleetType: SESiteEquipmentType[];
    equipFleetoem:SESiteEquipmentOME[];
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