import { ApiMenu } from "src/app/layout/sidebar/sidebar.metadata";

export class UserRole {
    roleName: string;
    roleDescription: string;
    roleId: number;
    constructor(reg) {
        this.roleName = reg.roleName ? reg.roleName : "";
        this.roleDescription = reg.roleDescription ? reg.roleDescription : "";
        this.roleId = reg.roleId ? reg.roleId : -1;
    }
}
export class URAPIData{
    userRole:UserRole[];
    menus:URMenu[];
}
export class USubmitData{
    userRole:UserRole;
    menus:URMenu[];
    
}
export class URMenu{
    menuId:number;
    title :string;
    parentId :number;
    selected:Boolean;
}