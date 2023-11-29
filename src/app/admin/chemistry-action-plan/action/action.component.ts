import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ObervationService } from '../observation/obervation.service';
import { CAPAction, CAPDept, CAPPriority, CAPStatus, CAPUsers, CAPObs, CAPRegion, CAPSites, CAPObservation } from '../observation/observation.model';
import { ActionService } from './action.service';
import { CAPAcEndFilter } from './action.model';
import { ActionFormComponent } from '../observation/observation-action/dialogs/action-form/action-form.component';
import { ObservationFormComponent } from '../observation/dialogs/observation-form/observation-form.component';
declare var $: any;
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Common Variables
  isTableLoading: boolean;
  errorMessage: string;

  //Variables
  actions: CAPAction[];
  prioritys: CAPPriority[];
  statuss: CAPStatus[];
  regions: CAPRegion[];
  sites: CAPSites[];
  observations: CAPObservation[];
  depts: CAPDept[];
  appUsers: CAPUsers[];
  siteListObj: any[] = [];
  regionListObj: any[] = [];
  statusListObj: any[] = [];
  //Filter
  filterObj: CAPAcEndFilter = {
    regionId: -1,
    siteId: -1,
    priorityId: -1,
    statusId: -1,
  }
  constructor(private route: ActivatedRoute, private dataService: ActionService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    super();
  }
  editAction(action: CAPAction) {
    let observation = this.observations.find(a => a.observationId == action.observationId);

    if(action.actionAdmin == this.user.id){
      const dialogRef = this.dialog.open(ObservationFormComponent, {
        width: '720px',
        data: {
          observation: observation,
          depts: this.depts,
          prioritys: this.prioritys,
          statuss: this.statuss,
          users: this.appUsers,
          action: "edit",
          sites: [...this.sites],
          regions: [...this.regions],
        },
      });
      dialogRef.afterClosed().subscribe((result: CAPObservation) => {
        if (result) {
          this.subs.sink = this.dataService.saveSite(result, this.user.id).subscribe({
            next: data => {
              const table = $('#datatableexample').DataTable();
              table.destroy();
              this.getActions();
              this.showNotification('snackbar-success', "Selected observation" + ' has been added sucessfully', 'bottom', 'center');
            },
            error: err => {
              this.errorMessage = err;
              this.showNotification('black', err, 'bottom', 'center');
            }
          })
        }
      });
    }
    else{
      const dialogRef = this.dialog.open(ActionFormComponent, {
        width: '720px',
        data: {
          actionData: action,
          action: "action",
          prioritys: this.prioritys,
          statuss: this.statuss,
          depts: this.depts,
          users: this.appUsers,
          observation: observation
        },
      });
      dialogRef.afterClosed().subscribe((result: CAPAction) => {
        if (result) {
          debugger;
          this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
            next: data => {
              const table = $('#datatableexample').DataTable();
              table.destroy();
              this.getActions();
              
              this.showNotification('snackbar-success', "Selected observation" + ' has been added sucessfully', 'bottom', 'center');
            },
            error: err => {
              this.errorMessage = err;
              this.showNotification('black', err, 'bottom', 'center');
            }
          })
        }
      });
    }

  }
  // search(){
  //   this.subs.sink = this.dataService.filter(this.filterObj, this.user.id).subscribe({
  //     next:data=>{

  //       this.actions=[...data.actions];
  //       this.sites=[...data.sites];
  //     },
  //     error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
  //   })
  // }
  ngOnInit(): void {
    this.getActions()
  }
  filterFn() {
    debugger;
    this.subs.sink = this.dataService.filter(this.user.id, this.regionListObj.toString(), this.siteListObj.toString(), this.statusListObj.toString()).subscribe({
      next: data => {
        const table = $('#datatableexample').DataTable();
        table.destroy();
        this.actions = [...data.actions];
        this.buildDT();


      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  regionList(region: CAPRegion) {
    let index = this.regionListObj.indexOf(region.regionId);
    if (index == -1) {
      this.regionListObj.push(region.regionId);
    }
    else {
      this.regionListObj.splice(index, 1);
    }
  }
  siteList(site: CAPSites) {
    let index = this.siteListObj.indexOf(site.siteId);
    if (index == -1) {
      this.siteListObj.push(site.siteId);
    }
    else {
      this.siteListObj.splice(index, 1);
    }
  }
  handleSearch(searchValue: string) {
    const table = $('#datatableexample').DataTable();
    table.search(searchValue).draw();
  }
  downloadExcel() {
    const table = $('#datatableexample').DataTable();
    table.button('.buttons-excel').trigger();
  }
  statusList(status: CAPStatus) {
    let index = this.statusListObj.indexOf(status.statusId);
    if (index == -1) {
      this.statusListObj.push(status.statusId);
    }
    else {
      this.statusListObj.splice(index, 1);
    }
  }
  getActions() {
    this.isTableLoading=true;
    this.subs.sink = this.dataService.getObservationActions(this.user.id).subscribe({
      next: data => {
        this.actions = [...data.actions];
        this.prioritys = [...data.priority];
        this.statuss = [...data.status];
        this.regions = [...data.regions];
        this.sites = [...data.sites];
        this.observations = [...data.observation];
        this.depts = [...data.dept];
        this.appUsers = [...data.appUser];
        this.buildDT();
        this.isTableLoading=false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  buildDT() {
    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthChange: false,
        processing: true,
        lengthMenu: [10, 20, 100],
        dom: 'lrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: 'Download Excel',
            className: 'btn btn-primary',
            exportOptions: {
              columns: ':visible',
            },
          },
          {
            extend: 'copyHtml5',
            text: 'Copy',
            className: 'btn btn-primary',
            exportOptions: {
              columns: ':visible',
            },
          },
        ],
      });
    }, 1);
  }
  //Common Functions
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
