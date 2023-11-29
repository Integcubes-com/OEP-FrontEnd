import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { OT_NextOutages, OT_SiteNextOutage, OT_IEquipments } from '../../outage-tracker/next-outages/site-next-outages.model';
import { NextOutagesService } from './next-outages.service';
import { DeleteNextOutagesComponent } from './dialogs/delete-next-outages/delete-next-outages.component';
import { AddNextOutagesComponent } from './dialogs/add-next-outages/add-next-outages.component';
import { WH_ProposedOutageFilter } from './next-outages.model';

@Component({
  selector: 'app-next-outages',
  templateUrl: './next-outages.component.html',
  styleUrls: ['./next-outages.component.sass']
})
export class NextOutagesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

 //Varaibles 
 sites: CSites[];
 regions:CRegions[];
 filterObj: WH_ProposedOutageFilter = {
  regionId: -1,
  siteId: -1,
  equipmentId: -1,
  outageId: -1
}
displayFilter: Boolean = false;
 nextOutages: OT_NextOutages[];
 siteNextOutages: OT_SiteNextOutage[];
 equipments:OT_IEquipments[]
 //common variables
 isTableLoading: boolean;
 errorMessage: string;

 //Get data from browsers Local Storage
 user: User = JSON.parse(localStorage.getItem('currentUser'));
 constructor(private snackBar: MatSnackBar, private dataService: NextOutagesService, private dataService2:CommonService,public dialog: MatDialog,) { super() }

 displayedColumns: string[] = ['id','regionTitle', 'siteTitle', 'unit','outageTitle',  'nextOutageDate','runningHours', 'actions'];
 dataSource: MatTableDataSource<OT_SiteNextOutage>;
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }
 ngOnInit(): void {
   this.dataSource = new MatTableDataSource<OT_SiteNextOutage>(this.siteNextOutages);
   this.getInterface();
   this.getEquipments(-1);
   this.getRegions();
   this.getSite(-1);
   this.getSiteNextOutages();
 }
 //get fns
 getEquipments(siteId:number){
   this.subs.sink = this.dataService.getEquipments(siteId).subscribe({
     next: data => {
      this.filterObj.equipmentId = -1
       this.equipments = [...data];
     },
     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
   })
 }
 getSite(regionId:number){
  this.subs.sink = this.dataService2.getSites(this.user.id, regionId , -1).subscribe({
    next:data=>{
      this.filterObj.siteId = -1
      this.sites = [...data]
    },
    error:err=>{ this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
  })
}
getRegions(){
  this.subs.sink = this.dataService2.getRegions(this.user.id,-1,-1).subscribe({
    next: data => {
      this.regions = [...data];
    },
    error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
  })
}
 getInterface(): void {
   this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
     next: data => {
       this.nextOutages = [...data];
     },
     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
   })
 }
 getSiteNextOutages(): void {
   this.isTableLoading = true;
   this.subs.sink = this.dataService.getSiteOutages(this.user.id, this.filterObj).subscribe({
     next: data => {
       this.siteNextOutages = [...data];
       this.dataSource.data = [...this.siteNextOutages];
       this.isTableLoading = false;
     },
     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
   })
 }

 //Cruds
 viewSiteNextOutages(siteNextOutage: OT_SiteNextOutage) {
   const dialogRef = this.dialog.open(AddNextOutagesComponent, {
     width: '600px',
     data: {
       siteNextOutage: siteNextOutage,
       nextOutages: this.nextOutages,
       sites:this.sites,
       equipments:this.equipments,
       action: "view",
     },
   });

 }
 deleteSiteNextOutages(siteNextOutage: OT_SiteNextOutage) {
   const dialogRef = this.dialog.open(DeleteNextOutagesComponent, {
     width: '300px',
     data: {
       siteNextOutage: siteNextOutage,
     }
   });
   dialogRef.afterClosed().subscribe((result: OT_SiteNextOutage) => {
     if (result) {
       this.subs.sink = this.dataService.deleteSiteNextOutages(this.user.id, result).subscribe({
         next: data => {
           this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been Deleted!!', 'bottom', 'center');
           this.getSiteNextOutages();
         },
         error: err => {
           this.errorMessage = err;
           this.showNotification('black', err, 'bottom', 'center');
         }
       })
     }
   })
 }
 updateSiteNextOutages(siteNextOutage: OT_SiteNextOutage) {
   const dialogRef = this.dialog.open(AddNextOutagesComponent, {
     width: '600px',
     data: {
       siteNextOutage: siteNextOutage,
       nextOutages: this.nextOutages,
       sites:this.sites,
       equipments:this.equipments,
       action: "edit",
     },
   });
   dialogRef.afterClosed().subscribe((result: OT_SiteNextOutage) => {
     if (result) {
       this.subs.sink = this.dataService.saveSiteNextOutages(this.user.id, result).subscribe({
         next: data => {
           this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been updated!!', 'bottom', 'center');
           this.getSiteNextOutages();
         },
         error: err => {
           this.errorMessage = err;
           this.showNotification('black', err, 'bottom', 'center');
         }
       })
     }
   });
 }
 addSiteNextOutages() {
   const dialogRef = this.dialog.open(AddNextOutagesComponent, {
     width: '600px',
     data: {
       siteNextOutage: "",
       nextOutages: this.nextOutages,
       sites:this.sites,
       equipments:this.equipments,
       action: "add",
     },
   });
   dialogRef.afterClosed().subscribe((result: OT_SiteNextOutage) => {
     if (result) {
       this.subs.sink = this.dataService.saveSiteNextOutages(this.user.id, result).subscribe({
         next: data => {
           this.showNotification('snackbar-success', 'Site save Outage for ' + result.siteTitle + ' has been saved!!', 'bottom', 'center');
           this.getSiteNextOutages();
         },
         error: err => {
           this.errorMessage = err;
           this.showNotification('black', err, 'bottom', 'center');
         }
       })
     }
   });
 }
 toggleFilter() {
  this.displayFilter = !this.displayFilter;
}
 //Common Fns
 showNotification(colorName, text, placementFrom, placementAlign) {
   this.snackBar.open(text, "", {
     duration: 2000,
     verticalPosition: placementFrom,
     horizontalPosition: placementAlign,
     panelClass: colorName,
   });
 }
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if (this.dataSource.paginator) {
     this.dataSource.paginator.firstPage();
   }
 }

}
