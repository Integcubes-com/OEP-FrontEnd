import { Component, Inject, OnInit } from '@angular/core';
import { ApiSave, WorkingHourModel, workingMonthlyHours } from '../../working-cal.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { WorkingCalService } from '../../working-cal.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-add-calc',
  templateUrl: './add-calc.component.html',
  styleUrls: ['./add-calc.component.sass']
})

export class AddCalcComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  apiData: ApiSave = {
    yearlyResult: [],
    result: new WorkingHourModel({}),
    userId: 0,
    typeId: 0
  }
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  yearList:number[]=[];
  selectedYear:number;
  timeStampList = [{ type: 1, title: 'Year' }, { type: 2, title: 'Month' }]
  timeStamp: any;
  workingHoursUnit: WorkingHourModel;
  dialogTitle: string;
  workingMonthlyHours:workingMonthlyHours[];

  startHour:number;
  constructor(
    public dialogRef: MatDialogRef<AddCalcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: WorkingCalService,
    private snackBar: MatSnackBar,
    private dataService2: CommonService
  ) {
    super()
  }

  ngOnInit(): void {
    this.timeStamp = this.timeStampList[0].type;
    this.workingHoursUnit = { ...this.data.workingHours }
    
    this.dialogTitle = this.workingHoursUnit.siteTitle + "-" + this.workingHoursUnit.unit
    const differenceInYears: number = (new Date(this.workingHoursUnit.onmContractExpiry)).getFullYear() - (new Date(this.workingHoursUnit.startDate)).getFullYear();
    for (let za = 0; za < differenceInYears; za++) {
      let yearToAdd: number = (new Date(this.workingHoursUnit.startDate)).getFullYear() + za + 1;
      this.yearList.push(yearToAdd);
    }
    this.selectedYear = this.yearList[0];
    this.getData(this.timeStamp,this.selectedYear)

  }
  copyHours(data: workingMonthlyHours) {
    this.workingMonthlyHours.map(a => {
      if (a.yearId > data.yearId) {
        a.runningHours = data.runningHours
      }
    })
  }
  save(){
    this.apiData.typeId = this.timeStamp;
    this.apiData.userId = this.user.id;
    this.apiData.yearlyResult = [...this.workingMonthlyHours];
    this.apiData.result = {...this.workingHoursUnit}
    this.dialogRef.close(this.apiData);
  }
  getData(event, selectedYear) {
    this.timeStamp = +event;
    this.subs.sink = this.dataService.getMonthlyWorkingHours(this.user.id, +selectedYear, this.workingHoursUnit, event).subscribe({
      next: data => {
        this.workingMonthlyHours = [...data.yealyList];
        this.startHour = data.startHours
        // this.yearList = [...data.uiqueYear]
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
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
  onNoClick() {
    this.dialogRef.close();
  }
}
