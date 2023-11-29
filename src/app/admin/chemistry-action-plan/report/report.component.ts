import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CAPAcEndFilter } from '../action/action.model';
import { ActionService } from '../action/action.service';
import { ActionFormComponent } from '../observation/observation-action/dialogs/action-form/action-form.component';
import { CAPAction, CAPPriority, CAPStatus, CAPRegion, CAPSites, CAPObs, CAPDept, CAPUsers } from '../observation/observation.model';
import { User } from 'src/app/core/models/user';
import 'datatables.net-dt/js/dataTables.dataTables'; // Import DataTables core module
import 'datatables.net-buttons/js/dataTables.buttons'; // Import DataTables Buttons module
import 'datatables.net-buttons/js/buttons.html5'; // Import Buttons HTML5 export module
import 'datatables.net-buttons/js/buttons.print'; // Import Buttons Print module
declare var $: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css', './report.component.sass']
})
export class ReportComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

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
  observations: CAPObs[];
  depts: CAPDept[];
  appUsers: CAPUsers[];
  siteListObj:any[] = [];
  regionListObj:any[]=[];
  statusListObj:any[]=[];
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
  ngOnInit(): void {
    this.getActions()
  }

  //Crudes
  getActions() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getActionReport(this.user.id).subscribe({
      next: data => {
       
        this.actions = [...data.actions];
        this.prioritys = [...data.priority];
        this.statuss = [...data.status];
        this.regions = [...data.regions];
        this.sites = [...data.sites];
        this.observations = [...data.observation];
        this.depts = [...data.dept];
        this.appUsers = [...data.appUser];
        this.buildTable();
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
buildTable(){
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
  editAction(action: CAPAction) {
    let observation = this.observations.find(a => a.observationId == action.observationId);
    const dialogRef = this.dialog.open(ActionFormComponent, {
      width: '720px',
      data: {
        actionData: action,
        action: "view",
        prioritys: this.prioritys,
        statuss: this.statuss,
        depts: this.depts,
        users: this.appUsers,
        observation: observation
      },
    });
    dialogRef.afterClosed().subscribe((result: CAPAction) => {
      if (result) {
        this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
          next: data => {
            let index = this.actions.findIndex(a => a.actionId === result.actionId);
            this.actions[index] = { ...data };
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

  //Filters List
  filterFn(){
    debugger;
    this.subs.sink = this.dataService.filterReport(this.user.id, this.regionListObj.toString(), this.siteListObj.toString(), this.statusListObj.toString()).subscribe({
          next: data => {
            const table = $('#datatableexample').DataTable();
            table.destroy();
            this.actions = [...data.actions];
            this.buildTable();

   
          },
          error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
        })
  }
  regionList(region:CAPRegion){
debugger;
    let index = this.regionListObj.indexOf(region.regionId);
    if (index==-1) {
      this.regionListObj.push(region.regionId);
    }
   else{
    this.regionListObj.splice(index, 1);
   }
  }
  siteList(site:CAPSites){
    let index = this.siteListObj.indexOf(site.siteId);
    if (index==-1) {
      this.siteListObj.push(site.siteId);
    }
   else{
    this.siteListObj.splice(index, 1);
   }
  }
  statusList(status:CAPStatus){
    debugger;
    let index = this.statusListObj.indexOf(status.statusId);
    if (index==-1) {
      this.statusListObj.push(status.statusId);
    }
   else{
    this.statusListObj.splice(index, 1);
   }   
  }
  // search() {
  //   this.subs.sink = this.dataService.filterReport(this.filterObj, this.user.id).subscribe({
  //     next: data => {

  //       this.actions = [...data.actions];
  //       this.sites = [...data.sites];
  //     },
  //     error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
  //   })
  // }
  //DataTables Fns
  handleSearch(searchValue: string) {
    const table = $('#datatableexample').DataTable();
    table.search(searchValue).draw();
  }
  downloadExcel() {
    const table = $('#datatableexample').DataTable();
    table.button('.buttons-excel').trigger();
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
