import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { OT_SiteNextOutage } from '../../outage-tracker/next-outages/site-next-outages.model';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ContractOutagesService } from './contract-outages.service';
import { WH_Outages, WH_ContractOutage, WH_IEquipments, WH_ContractOutageFilter } from './contract-outages.model';
import { DeleteContractOutageComponent } from './dialogs/delete-contract-outage/delete-contract-outage.component';
import { AddContractOutageComponent } from './dialogs/add-contract-outage/add-contract-outage.component';

@Component({
  selector: 'app-contract-outages',
  templateUrl: './contract-outages.component.html',
  styleUrls: ['./contract-outages.component.sass']
})
export class ContractOutagesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  
  //Filer
  filterObj: WH_ContractOutageFilter = {
    regionId: -1,
    siteId: -1,
    equipmentId: -1,
    outageId: -1
  }
 //Varaibles
 sites: CSites[];
 regions:CRegions[];
 displayFilter: Boolean = false;
 nextOutages: WH_Outages[];
 siteNextOutages: WH_ContractOutage[];
 equipments:WH_IEquipments[]
 //common variables
 isTableLoading: boolean;
 errorMessage: string;

 //Get data from browsers Local Storage
 user: User = JSON.parse(localStorage.getItem('currentUser'));
 constructor(private snackBar: MatSnackBar, private dataService: ContractOutagesService, private dataService2:CommonService,public dialog: MatDialog,) { super() }

 displayedColumns: string[] = ['id','regionTitle', 'siteTitle', 'unit','outageTitle',  'nextOutageDate', 'actions'];
 dataSource: MatTableDataSource<WH_ContractOutage>;
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }
 ngOnInit(): void {
   this.dataSource = new MatTableDataSource<WH_ContractOutage>(this.siteNextOutages);
   this.getInterface();
   this.getEquipments(-1);
   this.getSite(-1);
   this.getRegions();
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
 toggleFilter() {
  this.displayFilter = !this.displayFilter;
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
   const dialogRef = this.dialog.open(AddContractOutageComponent, {
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
 deleteSiteNextOutages(siteNextOutage: WH_ContractOutage) {
   const dialogRef = this.dialog.open(DeleteContractOutageComponent, {
     width: '300px',
     data: {
       siteNextOutage: siteNextOutage,
     }
   });
   dialogRef.afterClosed().subscribe((result: WH_ContractOutage) => {
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
 updateSiteNextOutages(siteNextOutage: WH_ContractOutage) {
   const dialogRef = this.dialog.open(AddContractOutageComponent, {
     width: '600px',
     data: {
       siteNextOutage: siteNextOutage,
       nextOutages: this.nextOutages,
       sites:this.sites,
       equipments:this.equipments,
       action: "edit",
     },
   });
   dialogRef.afterClosed().subscribe((result: WH_ContractOutage) => {
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
   const dialogRef = this.dialog.open(AddContractOutageComponent, {
     width: '600px',
     data: {
       siteNextOutage: "",
       nextOutages: this.nextOutages,
       sites:this.sites,
       equipments:this.equipments,
       action: "add",
     },
   });
   dialogRef.afterClosed().subscribe((result: WH_ContractOutage) => {
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
