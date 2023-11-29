import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OMA_program } from '../add-program/program.model';
import { AddMitigationService } from './add-mitigation.service';
import { AddMitigationFromComponent } from './dialogs/add-mitigation-from/add-mitigation-from.component';
import { DeleteMitigationComponent } from './dialogs/delete-mitigation/delete-mitigation.component';
import { OMA_KeyPhase, OMA_TechAccount, OMA_Status, OMA_MitigationAction, OMA_Priority, OMA_MitigationActionSendApi } from './mitigation.model';

@Component({
  selector: 'app-add-mitigation',
  templateUrl: './add-mitigation.component.html',
  styleUrls: ['./add-mitigation.component.sass']
})
export class AddMitigationComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  
  keyPhases:OMA_KeyPhase[];
  techAccountabilities: OMA_TechAccount[]
  programs:OMA_program[];
  statuss:OMA_Status[];
  mitigationActions:OMA_MitigationAction[];
  prioritys:OMA_Priority[];
  //common variables
  isTableLoading: boolean;
  errorMessage:string;

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: AddMitigationService, public dialog: MatDialog,) { super() }

  displayedColumns: string[] = ['id', 'programTitle','actionTitle','priorityTitle','objectiveOutcome','targetDate', 'actions'];
  dataSource: MatTableDataSource<OMA_MitigationAction>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<OMA_MitigationAction>(this.mitigationActions);
    this.getinterfaces();
    this.getMitigationActions();
  }
  getinterfaces(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
      next: data => {
        this.prioritys = [...data.prioritys];
        this.statuss = [...data.status];
        this.programs = [...data.programs];
        this.keyPhases = [...data.keyPhase];
        this.techAccountabilities= [...data.techAccountabilities];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getMitigationActions(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getMitigationActions(this.user.id).subscribe({
      next: data => {
        this.mitigationActions = [...data];
        this.dataSource.data = [...this.mitigationActions];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }

  addMitigationAction(){
    const dialogRef = this.dialog.open(AddMitigationFromComponent, {
      width: '780px',
      data: {
        programs:this.programs,
        statuss:this.statuss,
        mitigationAction: "",
        prioritys: this.prioritys,
        keyPhases: this.keyPhases,
        techAccountabilities: this.techAccountabilities,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:OMA_MitigationActionSendApi) => {
      if (result) {
        this.subs.sink = this.dataService.saveMitigation(result, this.user.id).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', result.mitigationAction.actionTitle+' has been added sucessfully', 'bottom', 'center');
            this.getMitigationActions();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  editMitigationAction(mitigationAction: OMA_MitigationAction){
    this.subs.sink = this.dataService.getEditMitigation(this.user.id, mitigationAction.actionId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddMitigationFromComponent, {
          width: '780px',
          data: {
            programs:this.programs,
            statuss:this.statuss,
            mitigationAction: mitigationAction,
            prioritys: this.prioritys,
            keyPhases: this.keyPhases,
            techAccountabilities: this.techAccountabilities,
            selectedKeyPhases:data,
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result:OMA_MitigationActionSendApi) => {
          if (result) {
            this.subs.sink = this.dataService.saveMitigation(result, this.user.id).subscribe({
              next:data=>{
                this.showNotification('snackbar-success', result.mitigationAction.actionTitle+' has been updated sucessfully', 'bottom', 'center');
                this.getMitigationActions();
              },
              error:err=>{
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })

  }
  viewMitigationAction(mitigationAction: OMA_MitigationAction) {
    this.subs.sink = this.dataService.getEditMitigation(this.user.id, mitigationAction.actionId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddMitigationFromComponent, {
          width: '780px',
          data: {
            programs:this.programs,
            statuss:this.statuss,
            mitigationAction: mitigationAction,
            prioritys: this.prioritys,
            keyPhases: this.keyPhases,
            techAccountabilities: this.techAccountabilities,
            selectedKeyPhases:data,
            action: "view",
          },
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })

  }
  deleteMitigationAction(mitigationAction:OMA_MitigationAction) {
    const dialogRef = this.dialog.open(DeleteMitigationComponent, {
      width: '300px',
      data: {
        mitigationAction:mitigationAction,
      }
    });
    dialogRef.afterClosed().subscribe((result: OMA_MitigationAction) => {
      if (result) {
        this.subs.sink = this.dataService.deleteMitigation(result, this.user.id).subscribe({
          next: data => {
            this.getMitigationActions();
           this.showNotification('snackbar-success', result.programTitle + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
