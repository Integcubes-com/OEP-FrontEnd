import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { WorkingCalService } from '../working-cal/working-cal.service';
import { User } from 'src/app/core/models/user';
import { GroupedHoursItems, GroupedOutagesItems, WH_TimelapseModel, WH_timelapseOutage, WH_timelapseYear } from './timeline.model';
import { CSites } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  topLevel:WH_TimelapseModel={
    startHour: null,
    equipmentId: null,
    yearData: [],
    unit: '',
    startDate: undefined
  };
  yearList:any[]=[];
  innerLevel:WH_timelapseYear={
    yearlyTotal: null,
    yearId: null,
    outages: []
  };
  selectedSite:number;
  topLevelArr:WH_TimelapseModel[]=[];
  timeline:GroupedHoursItems[]
    outages:GroupedOutagesItems[]
  hours:any
  sites:CSites[]
  errorMessage:string;

    //Get data from browsers Local Storage
    user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private dataService: WorkingCalService,private dataService2: CommonService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }

  ngOnInit(): void {
    this.getSites()
  }
  getSites(){
    this.subs.sink = this.dataService.getSites(this.user.id,-1,-1).subscribe({
      next:data=>{this.sites = [...data];
        this.selectedSite =this.sites[0].siteId;
      this.getData(this.sites[0].siteId)
    },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getData(event){
    this.subs.sink = this.dataService.getTimeLine(event).subscribe({
      next:data=>{
        this.timeline = [...data.timeline]; 
        this.outages = [...data.outages];
        const uniqueEquipments = [...new Set(this.timeline.map(item => item.equipmentId))]
        const uniqueYear = [...new Set(this.timeline.map(item => item.yearId))]
        this.topLevelArr.length = 0;
        // for(let a = 0; a<this.timeline.length; a++){
        //   for(let b = 0 ; b<uniqueEquipments.length; b++){
        //     if(this.timeline[a].equipmentId == uniqueEquipments[b]){
        //       this.topLevel.equipmentId = this.timeline[a].equipmentId;
        //       this.topLevel.startHour = this.timeline[a].startHours;
        //       let outageCounter = this.timeline[a].startHours;
        //       let hoursCounter = this.timeline[a].startHours;
        //       for(let c = 0; c<uniqueYear.length; c++){
        //         for(let z = 0; z<this.timeline.length; z++){
        //           if(this.timeline[z].yearId == uniqueYear[c] && ){
        //             this.innerLevel.yearId = this.timeline[a].yearId;
        //             hoursCounter += this.timeline[a].runningHour;
        //           }
        //         }
                
        //       }
        //       this.innerLevel
        //     }
        //   }
        // }

        // for (let a = 0; a < uniqueEquipments.length; a++) {
        //   for (let z = 0; z < this.timeline.length; z++) {
        //     if (uniqueEquipments[a] == this.timeline[z].equipmentId) {
        //       this.topLevel.equipmentId = this.timeline[a].equipmentId;
        //       this.topLevel.unit = this.timeline[z].unit;
        //       this.topLevel.startDate = this.timeline[z].startDate
        //       this.topLevel.startHour = this.timeline[z].startHours;
        //       let outageCounter = this.timeline[z].startHours;
        //       let hoursCounter = this.timeline[z].startHours;
        //       for(let b = 0; b< uniqueYear.length; b++){
        //         this.innerLevel.yearId = uniqueYear[b];
        //         for (let zz = 0; zz < this.timeline.length; zz++){
        //           if (uniqueEquipments[a] == this.timeline[zz].equipmentId && uniqueYear[b] == this.timeline[zz].yearId) {
        //             hoursCounter += this.timeline[zz].runningHour
        //           }
        //         }
        //         this.innerLevel.yearlyTotal = hoursCounter;
        //         this.topLevel.yearData.push({...this.innerLevel})
        //       }
        //     }
        //   }
        //   this.topLevelArr.push({...this.topLevel})
        // }
        // this.topLevelArr;

        // for (let a = 0; a < uniqueEquipments.length; a++) {
        //   let eqDetail: GroupedHoursItems = this.timeline.find(b => b.equipmentId == uniqueEquipments[a]);
        //   this.topLevel={
        //     startHour: null,
        //     equipmentId: null,
        //     yearData: [],
        //     unit: '',
        //     startDate: undefined
        //   };
        //   this.innerLevel={
        //     yearlyTotal: null,
        //     outage: null,
        //     yearId: null,
        //     outageTitle: ''
        //   };
        //   this.yearList.length = 0;
        //   this.topLevel.equipmentId = eqDetail.equipmentId;
        //   this.topLevel.unit = eqDetail.unit;
        //   this.topLevel.startDate = eqDetail.startDate;
        //   this.topLevel.startHour = eqDetail.startHours;
        //   let outageCounter = eqDetail.startHours;
        //   let hoursCounter = eqDetail.startHours;
        //   const differenceInYears: number = (new Date(eqDetail.onmContractExpiry)).getFullYear() - (new Date(eqDetail.startDate)).getFullYear();
        //   for (let za = 0; za < differenceInYears; za++) {
        //     let yearToAdd: number = (new Date(eqDetail.startDate)).getFullYear() + za + 1;
        //     this.yearList.push(yearToAdd);
        //   }
        //   let equipmentTimelineList:any = this.timeline.filter(b => b.equipmentId == uniqueEquipments[a]);
        //   for(let bb = 0; bb<this.yearList.length; bb++){
        //     this.innerLevel.yearId = this.yearList[bb];
        //     for (let zz = 0; zz < equipmentTimelineList.length; zz++) {
        //       if(equipmentTimelineList.equipmentId == uniqueEquipments[a] && equipmentTimelineList.yearId == this.yearList[bb]){
        //         hoursCounter += equipmentTimelineList.runningHour
        //       }
        //       }
        //       this.innerLevel.yearlyTotal = hoursCounter;
        //      this.topLevel.yearData.push({...this.innerLevel})
        //   }
        //   this.topLevelArr.push({ ...this.topLevel })
        // }


        // for (let a = 0; a < uniqueEquipments.length; a++) {
        //   let eqDetail: GroupedHoursItems = this.timeline.find(b => b.equipmentId == uniqueEquipments[a]);
        //   let equipmentTimelineList: GroupedHoursItems[] = this.timeline.filter(b => b.equipmentId == uniqueEquipments[a]);
        //   let equipmentOutages: GroupedOutagesItems[] = this.outages.filter(b => b.equipmentId == uniqueEquipments[a]);
        //   this.yearList.length = 0;
        //   this.topLevel.equipmentId = eqDetail.equipmentId;
        //   this.topLevel.unit = eqDetail.unit;
        //   this.topLevel.startDate = eqDetail.startDate;
        //   this.topLevel.startHour = eqDetail.startHours;
        //   let outageCounter = eqDetail.startHours;
        //   let hoursCounter = eqDetail.startHours;
        //   const differenceInYears: number = (new Date(eqDetail.onmContractExpiry)).getFullYear() - (new Date(eqDetail.startDate)).getFullYear();
        //   for (let za = 0; za < differenceInYears; za++) {
        //     let yearToAdd: number = (new Date(eqDetail.startDate)).getFullYear() + za + 1;
        //     this.yearList.push(yearToAdd);
        //   }
        //   for(let bb = 0; bb<this.yearList.length; bb++){
        //         this.innerLevel.yearId = this.yearList[bb];
        //         for (let zz = 0; zz < equipmentTimelineList.length; zz++) {
        //           if(equipmentTimelineList[zz].equipmentId == uniqueEquipments[a] && equipmentTimelineList[zz].yearId == this.yearList[bb]){
        //             hoursCounter += equipmentTimelineList[zz].runningHour
        //           }
        //           }
        //           this.innerLevel.yearlyTotal = hoursCounter;
        //          this.topLevel.yearData.push({...this.innerLevel})
        //       }
        //       this.topLevelArr.push({ ...this.topLevel })
        //       this.topLevel.yearData = [];

        // }
        // for (let a = 0; a < uniqueEquipments.length; a++) {
        //   let eqDetail: GroupedHoursItems = this.timeline.find(b => b.equipmentId == uniqueEquipments[a]);
        //   let equipmentTimelineList: GroupedHoursItems[] = this.timeline.filter(b => b.equipmentId == uniqueEquipments[a]);
        //   let equipmentOutages: GroupedOutagesItems[] = this.outages.filter(b => b.equipmentId == uniqueEquipments[a]);
        //   this.yearList.length = 0;
        //   this.topLevel.equipmentId = eqDetail.equipmentId;
        //   this.topLevel.unit = eqDetail.unit;
        //   this.topLevel.startDate = eqDetail.startDate;
        //   this.topLevel.startHour = eqDetail.startHours;
        //   let outageCounter = eqDetail.startHours;
        //   let hoursCounter = eqDetail.startHours;
        //   const differenceInYears: number = (new Date(eqDetail.onmContractExpiry)).getFullYear() - (new Date(eqDetail.startDate)).getFullYear();
        //   for (let za = 0; za < differenceInYears; za++) {
        //     let yearToAdd: number = (new Date(eqDetail.startDate)).getFullYear() + za + 1;
        //     this.yearList.push(yearToAdd);
        //   }
        //   for(let bb = 0; bb<this.yearList.length; bb++){
        //         this.innerLevel.yearId = this.yearList[bb];
        //         for (let zz = 0; zz < equipmentTimelineList.length; zz++) {
        //           if(equipmentTimelineList[zz].equipmentId == uniqueEquipments[a] && equipmentTimelineList[zz].yearId == this.yearList[bb]){
        //             hoursCounter += equipmentTimelineList[zz].runningHour
        //             outageCounter += equipmentTimelineList[zz].runningHour
        //             for(let x =0; x<equipmentOutages.length; x++){
        //               if(equipmentOutages[x].runningHours!=null&&(equipmentOutages[x].runningHours<=outageCounter || new Date(equipmentOutages[x].nextOutageDate).getFullYear == this.yearList[bb])){
        //                 let varz:WH_timelapseOutage = {
        //                   outageTitle: equipmentOutages[x].outageTitle,
        //                   outageCode: equipmentOutages[x].colorCode,
        //                   counter: 0
        //                 }
        //                 this.innerLevel.outages.push({...varz});
        //                 outageCounter = 0
        //               }
        //             }
        //           }
        //           }
        //           this.innerLevel.yearlyTotal = hoursCounter;
        //          this.topLevel.yearData.push({...this.innerLevel})
        //          this.innerLevel.outages = [];
        //       }
        //       this.topLevelArr.push({ ...this.topLevel })
        //       this.topLevel.yearData = [];

        // }
        for (let a = 0; a < uniqueEquipments.length; a++) {
          let eqDetail: GroupedHoursItems = this.timeline.find(b => b.equipmentId == uniqueEquipments[a]);
          let equipmentTimelineList: GroupedHoursItems[] = this.timeline.filter(b => b.equipmentId == uniqueEquipments[a]);
          let equipmentOutages: GroupedOutagesItems[] = this.outages.filter(b => b.equipmentId == uniqueEquipments[a]);
          this.yearList.length = 0;
          this.topLevel.equipmentId = eqDetail.equipmentId;
          this.topLevel.unit = eqDetail.unit;
          this.topLevel.startDate = eqDetail.startDate;
          this.topLevel.startHour = eqDetail.startHours;
          let outageCounter = eqDetail.startHours;
          let hoursCounter = eqDetail.startHours;
          const differenceInYears: number = (new Date(eqDetail.onmContractExpiry)).getFullYear() - (new Date(eqDetail.startDate)).getFullYear();
          for (let za = 0; za < differenceInYears; za++) {
            let yearToAdd: number = (new Date(eqDetail.startDate)).getFullYear() + za + 1;
            this.yearList.push(yearToAdd);
          }
          for(let bb = 0; bb<this.yearList.length; bb++){
                this.innerLevel.yearId = this.yearList[bb];
                for (let zz = 0; zz < equipmentTimelineList.length; zz++) {
                  if(equipmentTimelineList[zz].equipmentId == uniqueEquipments[a] && equipmentTimelineList[zz].yearId == this.yearList[bb]){
                    hoursCounter += equipmentTimelineList[zz].runningHour
                    outageCounter += equipmentTimelineList[zz].runningHour
                    for(let x =0; x<equipmentOutages.length; x++){
                      if(equipmentOutages[x].counter == -1){
                        equipmentOutages[x].counter +=outageCounter
                      }
                      else{
                        equipmentOutages[x].counter += equipmentTimelineList[zz].runningHour

                      }
                      let dateIdD = new Date(equipmentOutages[x].nextOutageDate)
                      let dateId = dateIdD.getFullYear();
                      console.log(dateId);
                      if((equipmentOutages[x].runningHours!=null && equipmentOutages[x].runningHours<=equipmentOutages[x].counter && equipmentTimelineList[zz].monthId == 12)||( dateId == this.yearList[bb] &&  equipmentOutages[x].validate !="NoValidate" && equipmentTimelineList[zz].monthId == 12) ){
                        let varz:WH_timelapseOutage = {
                          outageTitle: equipmentOutages[x].outageTitle,
                          outageCode: equipmentOutages[x].colorCode,
                        }
                        this.innerLevel.outages.push({...varz});
                        if(dateId == this.yearList[bb]){
                          equipmentOutages[x].validate ="NoValidate"

                        }
                        equipmentOutages[x].counter = 0
                      }
                    }
                  }
                  }
                  this.innerLevel.yearlyTotal = hoursCounter;
                 this.topLevel.yearData.push({...this.innerLevel})
                 this.innerLevel.outages = [];
              }
              this.topLevelArr.push({ ...this.topLevel })
              this.topLevel.yearData = [];

        }
      },
      error:err=>{this.showNotification('black', err, 'bottom', 'center')}
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

}
