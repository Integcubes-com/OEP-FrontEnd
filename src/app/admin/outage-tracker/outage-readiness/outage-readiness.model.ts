import { CUsers } from "src/app/shared/common-interface/common-interface";

export class OT_OutageRediness{
    phaseId:number
    phaseNumber:number
    phaseTitle:string
    phaseDescription:string
    constructor(reg){
        this.phaseId = reg.phaseId?reg.phaseId : -1;
    }
}

export class OT_OutageReadDesc{
    phaseId:number
    phaseReadId:number
    phaseReadDesc:string
    phaseReadNum:Number
    constructor(reg){
        this.phaseReadId = reg.phaseId?reg.phaseId : -1;
    }
}


export class OT_IActionOwner{
    actionOwnerId:number
    actionOwnerTitle:string
    constructor(reg){
        this.actionOwnerId = reg.actionOwnerId?reg.actionOwnerId : -1;
    }
}

export class OT_SiteOutages {
    outageId: number
    outageTitle: string
}

export class OT_SaveOutageReadDesc {
    ownerList:OT_IActionOwner[]
    outageReadDesc:OT_OutageReadDesc
    userName:string
}
export class OT_SaveActionRole {
    users:CUsers[]
    roles:OT_IActionOwner
}
export class OT_SelectedOutages {
    phaseId: number
    phaseDurId: number
    outageId: number
    outageTitle: string
    durationMonths: number
}