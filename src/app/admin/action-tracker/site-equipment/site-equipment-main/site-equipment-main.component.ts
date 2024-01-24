import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { SiteEquipmentFormComponent } from './dialogs/site-equipment-form/site-equipment-form.component';
import { SEFilter, SEFleet, SESiteEquipmentOME, SESiteEquipmentType, SiteEquipment } from './site-equipment.model';
import { SiteEquipmentService } from './site-equipment.service';
import { User } from 'src/app/core/models/user';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { FleetEquipmentComponent } from '../../common-dialogs/fleet-equipment/fleet-equipment.component';
import { CCluster, CRegions, CSites, CUsers } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-site-equipment-main',
  templateUrl: './site-equipment-main.component.html',
  styleUrls: ['./site-equipment-main.component.sass']
})
export class SiteEquipmentMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  regions: CRegions[];
  sites: CSites[];
  apiUser: CUsers[];
  SiteEquipments: SiteEquipment[];
  errorMessage: string;
  displayFilter: Boolean = false;
  oems: SESiteEquipmentOME[];
  equipmetTypes: SESiteEquipmentType[];
  fleet: SEFleet[];
  cluster:CCluster[];
  isTableLoading: boolean;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  displayedColumns: string[] = ['id', 'regionTitle', 'siteTitle', 'unit', 'model', 'modelEquipmentType', 'oemTitle', 'nextOutage', 'outageType', 'actions'];
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
  regionsFilterList:any[]=[];
  sitesFilterList:any[]=[];
  modelFilterList:any[]=[];
  oemFilterList:any[]=[];
  eqTypeFilterList:any[]=[];
  clusterFilterList:any[]=[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: SiteEquipmentService, private dataService2: CommonService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SiteEquipment>(this.SiteEquipments);
    this.getInterfaces();
    this.getSite(-1);
    this.getRegions();
    this.getUsers();
    this.getSiteEquipment();
    this.getClusters();
  }
  getClusters(){
    this.subs.sink = this.dataService2.getClusters(this.user.id,-1,-1 ).subscribe({
      next: data => {
        this.cluster = [...data];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
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
    this.subs.sink = this.dataService2.getSites(this.user.id, regionId , -1).subscribe({
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
    this.subs.sink = this.dataService.getSiteEquipments(this.user.id,this.regionsFilterList.toString(), this.sitesFilterList.toString(), this.modelFilterList.toString(), this.eqTypeFilterList.toString(), this.oemFilterList.toString(), this.clusterFilterList.toString()).subscribe({
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
            // let index = this.SiteEquipments.findIndex(a => a.equipmentId === result.equipmentId);
            // this.SiteEquipments.splice(index, 1);
            // this.dataSource.data = [...this.SiteEquipments];
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
        apiUser: this.apiUser
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
        apiUser: this.apiUser
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


      //filters
      regionListFn(region: CRegions) {
        let index = this.regionsFilterList.indexOf(region.regionId);
        if (index == -1) {
          this.regionsFilterList.push(region.regionId);
        }
        else {
          this.regionsFilterList.splice(index, 1);
        }
      }
      siteListFn(site: CSites) {
        let index = this.sitesFilterList.indexOf(site.siteId);
        if (index == -1) {
          this.sitesFilterList.push(site.siteId);
        }
        else {
          this.sitesFilterList.splice(index, 1);
        }
      }
      modelListFn(model: SEFleet) {
        let index = this.modelFilterList.indexOf(model.fleetEquipId);
        if (index == -1) {
          this.modelFilterList.push(model.fleetEquipId);
        }
        else {
          this.modelFilterList.splice(index, 1);
        }
      }
      eqTypeListFn(eqType: SESiteEquipmentType) {
        let index = this.eqTypeFilterList.indexOf(eqType.typeId);
        if (index == -1) {
          this.eqTypeFilterList.push(eqType.typeId);
        }
        else {
          this.eqTypeFilterList.splice(index, 1);
        }
      }
      oemListFn(oem: SESiteEquipmentOME) {
        let index = this.oemFilterList.indexOf(oem.oemId);
        if (index == -1) {
          this.oemFilterList.push(oem.oemId);
        }
        else {
          this.oemFilterList.splice(index, 1);
        }
      }
      clusterListFn(cluster: CCluster) {
        let index = this.clusterFilterList.indexOf(cluster.clusterId);
        if (index == -1) {
          this.clusterFilterList.push(cluster.clusterId);
        }
        else {
          this.clusterFilterList.splice(index, 1);
        }
      }

      filterFn(){
        this.getSiteEquipment();
      }
      clearFn(){
        this.regionsFilterList.length = 0;
        this.clusterFilterList.length = 0;
        this.sitesFilterList.length = 0;
        this.modelFilterList.length = 0;
        this.eqTypeFilterList.length = 0;
        this.oemFilterList.length = 0;
        this.regions.map(a=>a.isSelected = false)
        this.sites.map(a=>a.isSelected = false)
        this.fleet.map(a=>a.isSelected = false)
        this.equipmetTypes.map(a=>a.isSelected = false)
        this.oems.map(a=>a.isSelected = false)
        this.cluster.map(a=>a.isSelected = false)

      }
}
