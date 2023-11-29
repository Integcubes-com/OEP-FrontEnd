import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OMA_program } from '../add-program/program.model';
import { AddMitigationService } from '../add-mitigation/add-mitigation.service';
import { AddMitigationFromComponent } from '../add-mitigation/dialogs/add-mitigation-from/add-mitigation-from.component';
import { DeleteMitigationComponent } from '../add-mitigation/dialogs/delete-mitigation/delete-mitigation.component';
import { OMA_TechAccount, OMA_Status, OMA_MitigationAction, OMA_Priority, OMA_KeyPhase, OMA_MitigationActionSendApi, OMA_MitigationResult, OMA_Filter } from '../add-mitigation/mitigation.model';
import { CSites, CTechnology } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
declare var $: any;
@Component({
  selector: 'app-add-actions',
  templateUrl: './add-actions.component.html',
  styleUrls: ['./add-actions.component.sass']
})
export class AddActionsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  sites:CSites[];
  filterObj:OMA_Filter={
    priority: -1,
    site: -1,
    technology: -1,
    status: -1,
    program: -1
  }
  excludePipes = [];
  technologys:CTechnology[];
  keyPhases: OMA_KeyPhase[];
  techAccountabilities: OMA_TechAccount[];
  programs: OMA_program[];
  statuss: OMA_Status[];
  mitigationResult: OMA_MitigationResult[];
  prioritys: OMA_Priority[];
  displayFilter: Boolean = false;
  //common variables
  isTableLoading: boolean;
  errorMessage: string;
  // programListObj:any[] = [];
  // priorityListObj: any[] = [];
  // statusListObj: any[] = [];
  // technologyListObj:any[] = [];
  // siteListObj:any[] =[];
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: AddMitigationService,private dataService2: CommonService, public dialog: MatDialog,) { super() }
//Get Data
  ngOnInit(): void {
    this.getinterfaces();
    this.getTechnology(-1);
   
  }
  getTechnology(techId:number){
    this.subs.sink = this.dataService2.getTechnologyOM(this.user.id,-1,techId).subscribe({
      next:data=>{
        this.technologys = [...data]
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getinterfaces(): void {
    this.subs.sink = this.dataService2.getSitesSpec(this.user.id,-1,-1).subscribe({
      next:data=>{
        this.sites = [...data];
        if(this.sites.length >0){
          // this.sites[0].isSelected = true;
          // this.siteListObj.push(this.sites[0].siteId);
          this.filterObj.site = this.sites[0].siteId;
        }
        this.getMitigationActions();
      },
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') }
    })

    this.isTableLoading = true;
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
      next: data => {
        this.prioritys = [...data.prioritys];
        this.statuss = [...data.status];
        this.programs = [...data.programs];
        this.techAccountabilities = [...data.techAccountabilities];
        this.keyPhases = [...data.keyPhase];
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  getMitigationActions(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getMitigationResult(this.user.id, this.filterObj).subscribe({
      next: data => {
        this.mitigationResult = [...data];
        const table = $('#datatableexample').DataTable();
        if(table){
          table.destroy();

        }
        this.buildTable();
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  editMitigationAction(mitigationResult: OMA_MitigationResult) {
    this.subs.sink = this.dataService.getEditMitigation(this.user.id, mitigationResult.actionId).subscribe({
      next: data => {
        const dialogRef = this.dialog.open(AddMitigationFromComponent, {
          width: '780px',
          data: {
            programs: this.programs,
            statuss: this.statuss,
            mitigationResult: mitigationResult,
            prioritys: this.prioritys,
            keyPhases: this.keyPhases,
            techAccountabilities: this.techAccountabilities,
            selectedKeyPhases: data,
            action: "action",
          },
        });
        dialogRef.afterClosed().subscribe((result: OMA_MitigationResult) => {
          if (result) {
            this.subs.sink = this.dataService.saveMitigationResult(result, this.user.id).subscribe({
              next: data => {
                const table = $('#datatableexample').DataTable();
                table.destroy();
                this.showNotification('snackbar-success', result.actionTitle + ' has been updated sucessfully', 'bottom', 'center');
                this.getMitigationActions();
              },
              error: err => {
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error: err => {
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })

  }

  toggleFilter() {
    this.displayFilter = !this.displayFilter;
  }
  //Filter
  // filterFn(){
  //   this.isTableLoading = true;
  //   this.subs.sink = this.dataService.getMitigationResult(this.user.id, this.siteListObj.toString(), this.technologyListObj.toString(), this.statusListObj.toString(),this.priorityListObj.toString(), this.programListObj.toLocaleString()).subscribe({
  //     next: data => {
  //       const table = $('#datatableexample').DataTable();
  //       table.destroy();
  //       this.mitigationResult = [...data];
  //       this.buildTable();
  //       // this.dataSource.data = [...this.mitigationActions];
  //       this.isTableLoading = false;
  //     },
  //     error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
  //   })
  // }
  // priorityList(priority: OMA_Priority) {
  //   let index = this.priorityListObj.indexOf(priority.priorityId);
  //   if (index == -1) {
  //     this.priorityListObj.push(priority.priorityId);
  //   }
  //   else {
  //     this.priorityListObj.splice(index, 1);
  //   }
  // }
  // siteList(site:CSites){
  //   let index = this.siteListObj.indexOf(site.siteId);
  //   if (index == -1) {
  //     this.siteListObj.push(site.siteId);
  //   }
  //   else {
  //     this.siteListObj.splice(index, 1);
  //   }
  // }
  // technologyList(technology:CTechnology){
  //   let index = this.technologyListObj.indexOf(technology.technologyId);
  //   if (index == -1) {
  //     this.technologyListObj.push(technology.technologyId);
  //   }
  //   else {
  //     this.technologyListObj.splice(index, 1);
  //   }
  // }
  // programList(program: OMA_program){
  //   let index = this.programListObj.indexOf(program.programId);
  //   if (index == -1) {
  //     this.programListObj.push(program.programId);
  //   }
  //   else {
  //     this.programListObj.splice(index, 1);
  //   }
  // }
  // statusList(status: OMA_Status) {
  //   let index = this.statusListObj.indexOf(status.statusId);
  //   if (index == -1) {
  //     this.statusListObj.push(status.statusId);
  //   }
  //   else {
  //     this.statusListObj.splice(index, 1);
  //   }
  // }
  //Table
  downloadExcel() {
    const table = $('#datatableexample').DataTable();
    table.button('.buttons-excel').trigger();
  }
  buildTable() {
    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 50,
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

  //Common
  handleSearch(searchValue: string) {
    const table = $('#datatableexample').DataTable();
    table.search(searchValue).draw();
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
