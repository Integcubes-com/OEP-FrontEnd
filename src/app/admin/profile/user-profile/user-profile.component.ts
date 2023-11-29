import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { accountForm, accountObj, userInfo } from './profile-model';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  DateOfBirth = new Date();
  uploadedFileName: any;
  img:string="";
  file: any;
  profilepic:any;
  Image: any;
  securityForm: FormGroup;
  experienceForm: FormGroup;
  accountForm: FormGroup;
  profileData: userInfo = {
    education: '',
    address: '',
    email: '',
    cell: '',
    mobile: '',
    gender: '',
    about: '',
    empId: 0,
    experience: '',
    workshops: '',
    dob: '',
    designation: '',
    country: '',
    city: '',
    middleName: ''
  }
  accountObj:accountObj={
    firstName: '',
    middleName: '',
    lastName: '',
    city: '',
    email: '',
    country: '',
    address: '',
    mobile: '',
    about: '',
    dob: ''
  };
  accountData:accountForm;
  errorMessage: string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private dataService: UserProfileService) {
    super()
  }
  ngOnInit(): void {
    this.profilepic = this.user.img;
    this.getUser();
  }
  getUser(): void {
    this.subs.sink = this.dataService.getData(this.user.id).subscribe({
      next: data =>{ this.profileData = data;
        if(this.profileData.dob){
          this.DateOfBirth = new Date(this.profileData.dob);
        } 
        this.buildSecurityForm();
        this.buildAccountForm();
        this.buildExperienceForm();},
      error: err => { this.errorMessage = err; this.showNotification("snackbar-error", err, "bottom", "center") }
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  handleUpload(event) {
    this.file = event.target.files[0];
    this.uploadedFileName = this.file.name;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.Image = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  buildExperienceForm(){
    this.experienceForm = this.fb.group({
      designation: [this.profileData.designation, [Validators.required]],
      education:[this.profileData.education,[Validators.required]],
      experience:[this.profileData.experience, [Validators.required]],
      workshops:[this.profileData.workshops,[Validators.required]],
    })
  }
  buildSecurityForm() {
    this.securityForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      newPassword: ["", [Validators.required]]
    })
  }
  buildAccountForm() {
    this.accountForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      middleName: [this.profileData.middleName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      city: [this.profileData.city, [Validators.required]],
      email: [this.profileData.email, [Validators.required]],
      country: [this.profileData.country, [Validators.required]],
      address: [this.profileData.address, [Validators.required]],
      mobile: [this.profileData.mobile, [Validators.required]],
      about:[this.profileData.about, [Validators.required]],
      dob:[this.profileData.dob?this.DateOfBirth:'', [Validators.required]],
      imgFile: [""],
    })
  }
  submitAccountForm() {
    if (this.accountForm.valid) {
      if(this.Image){
        this.img = this.Image.replace('data:', '').replace(/^.+,/, '');
      }
      this.accountObj.address = this.accountForm.value.address;
      this.accountObj.city = this.accountForm.value.city;
      this.accountObj.country = this.accountForm.value.country;
      this.accountObj.email = this.accountForm.value.email;
      this.accountObj.mobile = this.accountForm.value.mobile;
      this.accountObj.firstName = this.accountForm.value.firstName;
      this.accountObj.middleName = this.accountForm.value.middleName;
      this.accountObj.lastName = this.accountForm.value.lastName;
      this.accountObj.about = this.accountForm.value.about;
      this.accountObj.dob = this.accountForm.value.dob;
      this.subs.sink = this.dataService.saveAccountForm(this.accountObj, this.user.id, this.img).subscribe({
        next: data => {
          this.user.firstName = data.firstName;
          this.profileData.middleName = data.middleName;
          this.user.lastName = data.lastName;
          this.profileData.city = data.city;
          this.profileData.country = data.country;
          this.profileData.email = data.email;
          this.profileData.address = data.address;
          this.profileData.mobile = data.mobile;
          this.profileData.about = data.about;
          this.profileData.dob = data.dob
          if(data.uploadFile){
            this.user.img = data.uploadFile;
            this.profilepic = data.uploadFile;
            this.dataService.updateImage(data.uploadFile);
          }
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.showNotification('snackbar-success', 'Account Information updated Sucessfully...!!!', 'bottom', 'center');
        },
        error: err => {
          this.errorMessage = err;
          this.showNotification('black', err, 'bottom', 'center')
        }
      })
    }
    else{
      this.showNotification('snackbar-warning', 'Invalid Form', 'bottom', 'center')
    }
  }
  submitSecurityForm() {
    if (this.securityForm.valid) {
      this.subs.sink = this.dataService.saveSecurityForm(this.securityForm.value, this.user.id).subscribe({
        next: data => {
          if (data != 0) {
            this.showNotification('snackbar-success', 'Password updated Sucessfully...!!!', 'bottom', 'center')
          }
          else {
            this.showNotification('snackbar-warning', 'Wrong User Name or Password', 'bottom', 'center')
          }
        },
        error: err => {
          this.errorMessage = err;
          this.showNotification('black', err, 'bottom', 'center')
        }
      })
    }
    else{
      this.showNotification('snackbar-warning', 'Invalid Form', 'bottom', 'center')
    }
  }
  submitExperienceForm(){
    if(this.experienceForm.valid){
      this.subs.sink = this.dataService.saveExperienceForm(this.experienceForm.value, this.user.id).subscribe({
        next:data=>
        {
          this.profileData.education = data.education;
          this.profileData.experience = data.experience;
          this.profileData.designation = data.designation;
          this.profileData.workshops = data.workshops;
          this.showNotification('snackbar-success', 'Experience Form updated Sucessfully...!!!', 'bottom', 'center')
        }
        ,
        error: err => {
          this.errorMessage = err;
          this.showNotification('black', err, 'bottom', 'center')
        }
      })
    }
    else{
      this.showNotification('snackbar-warning', 'Invalid Form', 'bottom', 'center')
    }
  }
}
