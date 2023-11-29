import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
export interface InsuranceAccessObj {
  siteId: number,
  siteTitle:string,
  userList: CUsers[]
}
@Component({
  selector: 'app-insurance-access-form',
  templateUrl: './insurance-access-form.component.html',
  styleUrls: ['./insurance-access-form.component.sass']
})
export class InsuranceAccessFormComponent implements OnInit {

  insuranceObj: InsuranceAccessObj = {
    siteId: null,
    siteTitle: "",
    userList: []
  }
  dialogTitle: string;
  users: CUsers[];
  filteredArray: CUsers[];
  site: CSites;
  accessForm: FormGroup;
  selectedUserList: CUsers[] = [];
  constructor(
    public dialogRef: MatDialogRef<InsuranceAccessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.site = { ...this.data.site }
    this.dialogTitle = this.site.siteTitle;
    if (this.data.users.length > 0) {
      this.users = [...this.data.users]
      this.filteredArray = [...this.data.users]
    }
    if(this.data.selectedUsers.length > 0){
      this.selectedUserList = [...this.data.selectedUsers]
    }
    this.accessForm = this.buildForm();
  }
  ngOnInit(): void {
    this.accessForm.get('user')?.valueChanges.subscribe(
      value => {
        const filterValue = value.toLowerCase();
        this.filteredArray = this.users.filter(option => option.userName.toLowerCase().includes(filterValue));
      }
    );
  }
  buildForm(): FormGroup {
    return this.fb.group({
      user: [""]
    })
  }
  removeUser(user: CUsers) {
    const index = this.selectedUserList.findIndex(a => a.userId == user.userId);
    if (index >= 0) {
      this.selectedUserList.splice(index, 1);
    }
  }
  submit() {
    this.insuranceObj.siteId = this.site.siteId;
    this.insuranceObj.siteTitle = this.site.siteTitle;
    this.insuranceObj.userList = [...this.selectedUserList]
  }
  addUser(val: CUsers) {
    if (val) {
      const index = this.selectedUserList.findIndex(a => a.userId == val.userId);
      if (index == -1) {
        this.selectedUserList.push(val);
      }
    }
    this.accessForm.patchValue({
      user: ""
    });
    setTimeout(() => {
      this.filteredArray = [...this.users];
    }, 0);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
