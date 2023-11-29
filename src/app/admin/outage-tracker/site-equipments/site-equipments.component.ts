import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { FleetEquipmentComponent } from '../../action-tracker/common-dialogs/fleet-equipment/fleet-equipment.component';
import { SiteEquipmentFormComponent } from '../../action-tracker/site-equipment/site-equipment-main/dialogs/site-equipment-form/site-equipment-form.component';
import { SiteEquipment, SESiteEquipmentOME, SESiteEquipmentType, SEFleet, SEFilter } from '../../action-tracker/site-equipment/site-equipment-main/site-equipment.model';
import { User } from 'src/app/core/models/user';
import { SiteEquipmentsService } from './site-equipments.service';
import { ConfirmDeleteComponent } from '../../action-tracker/site-equipment/site-equipment-main/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-site-equipments',
  templateUrl: './site-equipments.component.html',
  styleUrls: ['./site-equipments.component.sass']
})
export class SiteEquipmentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  regions: CRegions[];
  sites: CSites[];
  apiUser: CUsers[];
  SiteEquipments: SiteEquipment[];
  errorMessage: string;
  displayFilter: Boolean = false;
  oems: SESiteEquipmentOME[];
  equipmetTypes: SESiteEquipmentType[];
  fleet: SEFleet[];
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  displayedColumns: string[] = ['id', 'regionTitle','clusterTitle' ,'siteTitle', 'unit', 'model', 'modelEquipmentType', 'oemTitle', 'nextOutage', 'outageType', 'actions'];
  dataSource: MatTableDataSource<SiteEquipment>;
  filterObj: SEFilter = {
    regionId: -1,
    siteId: -1,
    modelId: -1,
    fleetEquipId: -1,
    outageTypeId: -1,
    oemId: -1,
    equipmentTypeId: -1
  }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: SiteEquipmentsService, private dataService2: CommonService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SiteEquipment>(this.SiteEquipments);
    this.getInterfaces();
    this.getSite(-1);
    this.getRegions();
    this.getUsers();
    this.getSiteEquipment();
  }
  getUsers(){
    this.subs.sink = this.dataService2.getUsers(this.user.id,-1,-1 ).subscribe({
      next: data => {
        this.apiUser = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterfaces(){
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.fleet = [...data.equipFleetList];
        this.oems = [...data.equipFleetoem];
        this.equipmetTypes = [...data.equipFleetType]
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getSite(regionId:number){
    this.subs.sink = this.dataService2.getUpdatedSites(this.user.id, regionId , -1,-1).subscribe({
      next:data=>{
        this.sites = [...data]
      },
      error:err=>{ this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getRegions(){
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id, -1 , -1).subscribe({
      next:data=>{
        this.regions = [...data]
      },
      error:err=>{ this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }

  viewFleetEquipment(modelId: number) {
    this.subs.sink = this.dataService2.getFleetEquipment(this.user.id, modelId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(FleetEquipmentComponent, {
          width: '600px',
          data: {
            fleetEquipment: { ...data }
          }
        });
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center'); }
    })
  }





  getSiteEquipment() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getSiteEquipment(this.user.id, this.filterObj).subscribe({
      next: data => {
        this.SiteEquipments = [...data.siteEquipment];
        this.dataSource.data = [...this.SiteEquipments];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }

  deleteEquipment(equip?: SiteEquipment) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        siteEquipment: equip
      }
    });
    dialogRef.afterClosed().subscribe((result: SiteEquipment) => {
      if (result) {
        this.subs.sink = this.dataService.delete(result, this.user.id).subscribe({
          next: data => {
            debugger;
            this.showNotification('snackbar-success', result.model + ' has been added sucessfully', 'bottom', 'center');
            this.getSiteEquipment();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    })
  }
  addEquipment() {
    const dialogRef = this.dialog.open(SiteEquipmentFormComponent, {
      width: '750px',
      data: {
        siteEquipment: "",
        action: "add",
        regions: this.regions,
        sites: this.sites,
        fleet: this.fleet,
        apiUser: this.apiUser,
        updated:true,
      },
    });
    dialogRef.afterClosed().subscribe((result: SiteEquipment) => {
      if (result) {
        this.subs.sink = this.dataService.save(result, this.user.id).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.model + ' has been added sucessfully', 'bottom', 'center');
            this.getSiteEquipment();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    });
  }
  viewEquipment(equip?: SiteEquipment) {
    const dialogRef = this.dialog.open(SiteEquipmentFormComponent, {
      width: '750px',
      data: {
        siteEquipment: equip,
        action: "view",
        regions: this.regions,
        sites: this.sites,
        fleet: this.fleet,
        apiUser: this.apiUser
      },
    });
  }
  updateEquipment(equip?: SiteEquipment) {
    const dialogRef = this.dialog.open(SiteEquipmentFormComponent, {
      width: '750px',
      data: {
        siteEquipment: equip,
        action: "edit",
        regions: this.regions,
        sites: this.sites,
        fleet: this.fleet,
        apiUser: this.apiUser,
        updated:true,
      },
    });
    dialogRef.afterClosed().subscribe((result: SiteEquipment) => {
      if (result) {
        this.subs.sink = this.dataService.save(result, this.user.id).subscribe({
          next: data => {
            this.showNotification('snackbar-success', result.model + ' has been added sucessfully', 'bottom', 'center');
            this.getSiteEquipment();
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
        })
      }
    });
  }

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
