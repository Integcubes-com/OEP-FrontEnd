import { Component, Inject, OnInit } from '@angular/core';
import { OT_IActionOwner, OT_SaveActionRole } from '../../../outage-readiness/outage-readiness.model';
import { CUsers } from 'src/app/shared/common-interface/common-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-action-role-form',
  templateUrl: './add-action-role-form.component.html',
  styleUrls: ['./add-action-role-form.component.sass']
})
export class AddActionRoleFormComponent {

  apiObj:OT_SaveActionRole={
    users: [],
    roles: new OT_IActionOwner({})
  }
  users:CUsers[]
  selectedUsers:CUsers[]
  role:OT_IActionOwner
  dialogTitle:string
  roleForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddActionRoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    debugger;
    this.users = [...this.data?.users]
    if(this.data.action == "add"){
      this.role = new OT_IActionOwner({});
      this.dialogTitle = "New Action Role"
      this.selectedUsers = []
    }
    if(this.data.action == "edit" || this.data.action =="view"){
      this.role = this.data.role;
      this.selectedUsers = [...this.data?.selectedUsers]
      this.dialogTitle = this.role.actionOwnerTitle
    }
    this.roleForm = this.buildForm();
    this.removeValidators();
   }
   removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.roleForm.controls) {
        this.roleForm.get(key).disable();
        this.roleForm.get(key).clearValidators();
        this.roleForm.get(key).updateValueAndValidity();
      }
    }
  }
   buildForm():FormGroup{
    return this.fb.group({
      actionOwnerId:[this.role.actionOwnerId, [Validators.required]],
      actionOwnerTitle:[this.role.actionOwnerTitle, [Validators.required]],
      users:[""],
    })
  }
  submit() {
    if(this.roleForm.valid){
      this.role.actionOwnerTitle = this.roleForm.value.actionOwnerTitle;
      this.apiObj.users = [...this.selectedUsers];
      this.apiObj.roles = {...this.role};
      this.dialogRef.close(this.apiObj);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  removeChip(value: any): void {

      const index = this.selectedUsers.indexOf(value);
      if (index >= 0) {
        this.selectedUsers.splice(index, 1);
      }

  }
  addChip(val: string) {
    if (val) {
        let u = this.users.find(a => a.userId == +val)
        this.selectedUsers.push(u);
        this.roleForm.patchValue({
          users: ""
        })
    }
  }

}
