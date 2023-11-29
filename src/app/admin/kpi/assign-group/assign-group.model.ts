import { CUsers } from "src/app/shared/common-interface/common-interface";

export class AGGroups{
    groupId:number;
    groupTitle:string;
    groupCode:string;
    selected:boolean;
}

export class AGAPIData{
    group:AGGroups[];
    user:CUsers;
}
