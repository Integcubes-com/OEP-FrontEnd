import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { MonthlyKpiService } from './monthly-kpi.service';
import { KPIData } from './monthly-kpi.model';

@Component({
  selector: 'app-monthly-kpi',
  templateUrl: './monthly-kpi.component.html',
  styleUrls: ['./monthly-kpi.component.sass'],
})
export class MonthlyKpiComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  obj1: number = 0;
  obj2: number = 0;
  obj3: number = 0;
  obj4: number = 0;
  obj5: number = 0;
  obj6: number = 0;
  obj7: number = 0;
  filterObj = {
    monthId: null,
    yearId: null,
    siteId: null,
  }
  years: number[] = [];
  monthArray = [
    { title: 'January', number: 1 },
    { title: 'February', number: 2 },
    { title: 'March', number: 3 },
    { title: 'April', number: 4 },
    { title: 'May', number: 5 },
    { title: 'June', number: 6 },
    { title: 'July', number: 7 },
    { title: 'August', number: 8 },
    { title: 'September', number: 9 },
    { title: 'October', number: 10 },
    { title: 'November', number: 11 },
    { title: 'December', number: 12 },
  ]

  // selectedMonth: number = new Date().getMonth();
  // selectedYear: number = new Date().getFullYear();
  // siteData:KPIInterface[];
  monthlyKPI: KPIData[];
  sites: CSites[];
  errorMessage: string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService2: CommonService, private dataService: MonthlyKpiService) { super() }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
    this.getSites();
  }

  saveAction() {
    this.subs.sink = this.dataService.saveMonthlyKPIs(this.user.id, this.monthlyKPI, this.filterObj.siteId, this.filterObj.monthId, this.filterObj.yearId).subscribe({
      next: data => {
        this.showNotification('snackbar-success', 'Data has been saved successfully', 'bottom', 'center');
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  checkScore(kpi: KPIData) {
    // if(kpi.indicatorWeight<kpi.value){
    //   this.showNotification('snackbar-danger','Score value should be less Indiacator Weight', 'bottom', 'center'); 
    //   this.monthlyKPI.map(a=>{if(a.infoId == kpi.infoId){
    //     a.value = 0
    //   }})
    // }
    this.monthlyKPI.map(a => {
      if (kpi.formulaType == 3) {
        if (a.infoId == kpi.infoId) {
          // if(kpi.value == 0){
          //   a.weightedScore = a.indicatorWeight
          // }
          // else{
          a.weightedScore = 0
          // }
        }
      }
      else {
        if (a.infoId == kpi.infoId) {
          let score = (a.value / a.factor) * a.indicatorWeight
          // if(score>a.indicatorWeight){
          //   a.weightedScore = a.indicatorWeight
          // }
          // else{
          a.weightedScore = score
          // }
        }
      }
    })
  }
  getSites() {
    this.subs.sink = this.dataService2.getKPISites(this.user.id, -1, -1).subscribe({
      next: data => {
        this.sites = [...data];
        this.filterObj.siteId = this.sites[0].siteId;
        this.filterObj.monthId = new Date().getMonth() + 1;
        this.filterObj.yearId = new Date().getFullYear();
        this.getKPI();
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  // getInterface() {
  //   this.subs.sink = this.dataService.getInterfaceKPIs(this.user.id, this.filterObj.siteId, this.filterObj.date).subscribe({
  //     next: data => {
  //       this.siteData = [...data];
  //     },
  //     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
  //   })
  // }
  getKPI() {
    this.subs.sink = this.dataService.getMonthlyKPIs(this.user.id, this.filterObj.siteId, this.filterObj.monthId, this.filterObj.yearId).subscribe({
      next: data => {
        this.monthlyKPI = [...data];
        this.obj1 = 0;
        this.obj2 = 0;
        this.obj3 = 0;
        this.obj4 = 0;
        this.obj5 = 0;
        this.obj6 = 0;
        this.obj7 = 0;
        this.monthlyKPI.map(a => {

          if (a.groupId == 1) {
            if (a.isParent == false) {
              this.obj3 += a.indicatorWeight;
            }
          }
          if (a.groupId == 2) {
            if (a.isParent == false) {
              this.obj4 += a.indicatorWeight;
            }
          }
          if (a.groupId == 3) {
            if (a.isParent == false) {
              this.obj5 += a.indicatorWeight;
            }
          }
          if (a.groupId == 4) {
            if (a.isParent == false) {
              this.obj6 += a.indicatorWeight;
            }
          }
          if (a.groupId == 5) {
            if (a.isParent == false) {
              this.obj7 += a.indicatorWeight;
            }
          }
          if (a.groupId == 6) {
            if (a.isParent == false) {
              this.obj1 += a.indicatorWeight;
            }
          }
          if (a.groupId == 7) {
            if (a.isParent == false) {
              this.obj2 += a.indicatorWeight;
            }
          }
        })
        // this.monthlyKPI.map(a=>
        //   {
        //     if(a.unit == 'Days'){
        //       if(a.value == 0){
        //         a.weightedScore =100
        //       }
        //     }
        //   })
        // this.getInterface();
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  tooltipMessage(k: any): string {
    if (k.notApplicable || !k.isDisplay || k.isParent) {
      return 'You cannot edit this field.';
    } else {
      return ''; // Empty string when tooltip is not needed
    }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
