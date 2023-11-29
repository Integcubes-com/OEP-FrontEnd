import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UFormSubmit, URole, USite, UTechnology, UUser } from '../../user.model';
import { CRegions } from 'src/app/shared/common-interface/common-interface';
import { debounceTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.sass']
})
export class AddUserFormComponent implements OnInit{
  submitObj:UFormSubmit={
    users: new UUser({}),
    roles: [],
    sites: [],
    technologys: []
  };
  userList:UUser[];
  selectTech:boolean;
  users: UUser;
  regionsz:CRegions[];
  roles: URole[];
  sites: USite[];
  mode:string;
  technologys: UTechnology[];
  dialogTitle: string;
  roleList: URole[];
  userForm: FormGroup;
  sameUserName: boolean;
  constructor
    (
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<AddUserFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.users.userName;
      this.users = { ...this.data.users };
      if (this.data.roles) {
        this.roleList = [...this.data.selectedRoles];
      }
      else {
        this.roleList = [];
      }
    }
    if (this.data.action == "add") {
      this.dialogTitle = "New User";
      this.users = new UUser({});
      this.roleList = [];
    }
    this.mode = this.data.mode;
    this.roles = [...this.data.roles];
    this.sites = [...this.data.sites];
    this.regionsz = [...this.data.regions];
    this.regionsz.map(a=>a.isSelected = false)
    this.technologys = [...this.data.technologys];
    if(this.technologys.length > 0){
      this.technologys.map(a=>{if(a.selected == true){
        this.selectTech = true;
      }})
    }
    this.userList = [...this.data?.userList];
    this.userForm = this.buildForm();
    this.selectRegions();
  }
  ngOnInit(): void {
    this.userForm.get('userName')?.valueChanges
    .pipe(
      debounceTime(1000)
    ).subscribe(
      value => {
        const filterValue = value.toLowerCase();
        let username = this.userList.filter(option => option.userName.toLowerCase() == filterValue);
        if(username.length >0){
          this.showNotification('snackbar-danger', `User with ${filterValue} User Name already exists`, 'bottom', 'center');
          this.sameUserName = true
        }
        else{
          this.sameUserName = false
        }
      }
    )
  }
  selectRegions(){
    this.sites.map(a=>{
      if(a.selected === true){
       this.regionsz.map(r=>{if(r.regionId == a.regionId){
        r.isSelected = true;
       }})
    }})
  }

  buildForm(): FormGroup {
    return this.fb.group({
      userName: [this.users.userName, [Validators.required]],
      password: [this.users.password, [Validators.required]],
      email: [this.users.email, [Validators.required, Validators.email]],
      phone: [this.users.phone, [Validators.required]],
      firstName:[this.users.firstName, [Validators.required]],
      lastName:[this.users.lastName, [Validators.required]],
      role: [""],
    })
  }
techSelect(event, cmd:string){
  if(cmd == 'all'){
    if (event.checked == true) {
      this.technologys.map(a => {
          a.selected = true
      })
    }
    else {
      this.technologys.map(a => {
          a.selected = false
      })
    }
  }
else{
  if (event.checked == true){
    this.selectTech = true
  }
  else{
    let t =  this.technologys.filter(a=>a.selected == true);
    if(t.length>0){
      this.selectTech = true
    }
    else{
      this.selectTech = false
    }
  }
}
}
  regionSelect(event, regionId: number) {
    if (event.checked == true) {
      this.sites.map(a => {
        if (a.regionId == regionId) {
          a.selected = true
        }
      })
    }
    else {
      this.sites.map(a => {
        if (a.regionId == regionId) {
          a.selected = false
        }
      })
    }
  }
  siteSelect(event, siteId: number) {
    if (event.checked == true) {
      this.sites.map(a => {
        if (a.siteId == siteId) {
          this.regionsz.map(b => {
            if (b.regionId == a.regionId) {
              b.isSelected = true;
            }
          })
        }
      })
    }
    else {
      let selectedSite: USite = this.sites.find(a => a.siteId == siteId);
      let sameSites: USite[] = this.sites.filter(a => a.regionId == selectedSite.regionId);
      let index  = sameSites.findIndex(a=>a.selected == true);
      if(index == -1){
        this.regionsz.map(a=>{if(a.regionId == sameSites[1].regionId){
          a.isSelected = false;
        }})
      }
      else{
        this.regionsz.map(a=>{if(a.regionId == sameSites[1].regionId){
          a.isSelected = true;
        }})
      }
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    this.submitObj.roles = [...this.roleList];
    this.submitObj.sites = [...this.sites];
    this.submitObj.technologys = [...this.technologys];
    this.users.userName = this.userForm.value.userName;
    this.users.password = this.userForm.value.password;
    this.users.email = this.userForm.value.email;
    this.users.phone = this.userForm.value.phone;
    this.users.firstName = this.userForm.value.firstName;
    this.users.lastName = this.userForm.value.lastName;
    this.submitObj.users = { ...this.users }
  }

  removeChip(value: any, name: string): void {
    if (name == 'role') {
      const index = this.roleList.indexOf(value);
      if (index >= 0) {
        this.roleList.splice(index, 1);
      }
    }
  }
  addChip(val: string, name: string) {
    if (val) {
      if (name == 'role') {
        let u = this.roles.find(a => a.roleId == +val)
        this.roleList.push(u);
        this.userForm.patchValue({
          role: ""
        })
      }
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
