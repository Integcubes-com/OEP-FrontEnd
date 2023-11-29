import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { URMenu, USubmitData, UserRole } from '../../role.model';
export interface URMenuObj {
  menuId: number,
  parentId: number,
  selected: boolean,
  subMenu: any[],
  title: string,
}
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.sass']
})
export class RoleFormComponent {
  dialogTitle: string;
  role: UserRole;
  apiMenu: URMenu[];
  submitObj: USubmitData = {
    menus: [],
    userRole: new UserRole({})
  };
view:boolean = false;
  roleForm: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (this.data.action == "add") {
      this.dialogTitle = "New Role";
      this.role = new UserRole({});
    }
    if(this.data.action=="view"){
      this.dialogTitle = this.data.userRoles.roleName;
      this.role = { ...this.data.userRoles };
      this.view = true;
    }
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.userRoles.roleName;
      this.role = { ...this.data.userRoles };
    }
    this.apiMenu = [...this.data.menus];
    this.roleForm = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.fb.group({
      roleId: [this.role.roleId, [Validators.required]],
      roleName: [this.role.roleName, [Validators.required]],
      roleDescription: [this.role.roleDescription, [Validators.required]]
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
  userAction(event, menu: URMenu) {
    if (event.checked == true) {
      if (menu.parentId == 0) {
        this.apiMenu.filter(a => {
          if (a.parentId == menu.menuId) {
            a.selected = true;
            this.apiMenu.filter(b => {
              if (b.parentId == a.menuId) {
                b.selected = true;
              }
            })
          }
        })
      }
      else{
        this.apiMenu.filter(a=>{
          if(a.menuId == menu.parentId){
            a.selected = true;
            this.apiMenu.filter(b=>{if(menu.menuId == b.parentId){
              b.selected = true;
            }})
            this.apiMenu.filter(c=>{if(a.parentId == c.menuId){
              c.selected = true;
            }})
          }
          
        })
      }
    }
    else{
      if (menu.parentId == 0) {
        this.apiMenu.filter(a => {
          if (a.parentId == menu.menuId) {
            a.selected = false;
            this.apiMenu.filter(b => {
              if (b.parentId == a.menuId) {
                b.selected = false;
              }
            })
          }
        })
      }
      else{
        this.apiMenu.filter(a=>{
          if(a.parentId == menu.menuId){
            a.selected = false;
          }
          
        })
      }
    }
  }
  submit() {
    this.submitObj.menus = [...this.apiMenu];
    this.submitObj.userRole.roleDescription = this.roleForm.value.roleDescription;
    this.submitObj.userRole.roleName = this.roleForm.value.roleName;
    this.submitObj.userRole.roleId = this.roleForm.value.roleId;
  }

}
