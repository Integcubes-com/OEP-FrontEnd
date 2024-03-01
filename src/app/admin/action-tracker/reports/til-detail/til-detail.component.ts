import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Focus, Severity, Status, TilDetailReport, Timing, Unit } from './til-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { TilDetailReportService } from './til-detail.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { CCluster, CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';

@Component({
  selector: 'app-til-detail',
  templateUrl: './til-detail.component.html',
  styleUrls: ['./til-detail.component.sass']
})
export class TilDetailComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isTableLoading: boolean;
  detailReport: TilDetailReport[];
  dataSource: MatTableDataSource<TilDetailReport>;
  displayedColumns: string[] = ['id', 'siteName', 'unit', 'actions','timingCode','focusTitle', 'oemSeverityTitle', 'closed', 'opened', 'inProgress'];
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  timing: Timing[]
  focus: Focus[]
  severity: Severity[]
  status: Status[]
  clusters: CCluster[]
  regions: CRegions[]
  sites: CSites[]
  units: Unit[]
  timingFilterList: any[] = []
  focusFilterList: any[] = []
  severityFilterList: any[] = []
  statusFilterList: any[] = []
  clustersFilterList: any[] = []
  regionsFilterList: any[] = []
  sitesFilterList: any[] = []
  unitsFilterList: any[] = []
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: TilDetailReportService,
    private dataService2: CommonService,
    private snackBar: MatSnackBar) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TilDetailReport>(this.detailReport);
    this.getData();
    this.getInterface();
    this.getRegions();
    this.getSites();
    this.getClusters();
  }

  getRegions() {
    this.subs.sink = this.dataService2.getUpdatedRegions(this.user.id, -1, -1).subscribe({
      next: data => { this.regions = [...data] },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getSites() {
    this.subs.sink = this.dataService2.getUpdatedSites(this.user.id, -1, -1, -1).subscribe({
      next: data => { this.sites = [...data] },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getClusters() {
    this.subs.sink = this.dataService2.getClusters(this.user.id, -1, -1).subscribe({
      next: data => { this.clusters = [...data] },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getData() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionTracker(this.regionsFilterList.toString(), this.clustersFilterList.toString(), this.sitesFilterList.toString(), this.unitsFilterList.toString(), this.statusFilterList.toString(), this.timingFilterList.toString(), this.focusFilterList.toString(), this.severityFilterList.toString()).subscribe({
      next: data => {
        this.detailReport = [...data];
        this.dataSource.data = [...this.detailReport];
        this.isTableLoading = false;
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getInterface() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.timing = [...data.timing];
        this.focus = [...data.focus];
        this.severity = [...data.severity];
        this.status = [...data.status]
        this.units = [...data.unit]
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  regionList(region: CRegions) {
    let index = this.regionsFilterList.indexOf(region.regionId);
    if (index == -1) {
      this.regionsFilterList.push(region.regionId);
    }
    else {
      this.regionsFilterList.splice(index, 1);
    }
  }
  clusterList(cluster: CCluster) {
    let index = this.clustersFilterList.indexOf(cluster.clusterId);
    if (index == -1) {
      this.clustersFilterList.push(cluster.clusterId);
    }
    else {
      this.clustersFilterList.splice(index, 1);
    }
  }
  siteList(site: CSites) {
    let index = this.sitesFilterList.indexOf(site.siteId);
    if (index == -1) {
      this.sitesFilterList.push(site.siteId);
    }
    else {
      this.sitesFilterList.splice(index, 1);
    }
  }
  unitList(unit: Unit) {
    let index = this.unitsFilterList.indexOf(unit.equipmentId);
    if (index == -1) {
      this.unitsFilterList.push(unit.equipmentId);
    }
    else {
      this.unitsFilterList.splice(index, 1);
    }
  }
  timingList(timing: Timing) {
    let index = this.timingFilterList.indexOf(timing.timingId);
    if (index == -1) {
      this.timingFilterList.push(timing.timingId);
    }
    else {
      this.timingFilterList.splice(index, 1);
    }
  }
  focusList(focus: Focus) {
    let index = this.focusFilterList.indexOf(focus.focusId);
    if (index == -1) {
      this.focusFilterList.push(focus.focusId);
    }
    else {
      this.focusFilterList.splice(index, 1);
    }
  }
  severityList(severity: Severity) {
    let index = this.severityFilterList.indexOf(severity.oemSeverityId);
    if (index == -1) {
      this.severityFilterList.push(severity.oemSeverityId);
    }
    else {
      this.severityFilterList.splice(index, 1);
    }
  }
  statusList(status: Status) {
    let index = this.statusFilterList.indexOf(status.tasId);
    if (index == -1) {
      this.statusFilterList.push(status.tasId);
    }
    else {
      this.statusFilterList.splice(index, 1);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
