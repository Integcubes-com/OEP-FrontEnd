import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { TilsTrackerService } from '../tils-tracker.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TAPBudgetSource, TAPEquipment, TAPPriority, TAPUser, TilActionPackage } from '../tils-tracker-assignment.model';
import { DeleteTilActionComponent } from './dialog/delete-til-action/delete-til-action.component';
import { AssignTilActionComponent } from './dialog/assign-til-action/assign-til-action.component';

@Component({
  selector: 'app-assign-til',
  templateUrl: './assign-til.component.html',
  styleUrls: ['./assign-til.component.sass']
})
export class AssignTilComponent  {
  // extends UnsubscribeOnDestroyAdapter implements OnInit
  //  //Get data from browsers Local Storage
  //  user: User = JSON.parse(localStorage.getItem('currentUser'));
  //  statusList:tataStatus[];
  //  //Common Variables
  //  errorMessage: string;
  //  pageTitle:string;
  //  //Varaibles
  //  action: ActionTrackerEndUser[]
  //  package: TilActionPackage
  //  equipment:TAPEquipment[]
  //  priority:TAPPriority[]
  //  budgetSource:TAPBudgetSource[]
  //  budget:tataBudget[]
  //  part:tatapart[]
  //  finalImplementation:tataFinalImplementation[]
  //  evidence:tataEv[]
  //  users:TAPUser[]
  //  sapPlaning:tataSAP[]
  // constructor(private route: ActivatedRoute, private dataService: TilsTrackerService, private snackBar: MatSnackBar, private dialog: MatDialog) 
  // {
  //   super();
  //  }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     const id = Number(this.route.snapshot.paramMap.get('id'));
  //     if (id) {
  //       this.getActions(id);
  //     }
  //   });
  // }
  // deleteAction(action:ActionTrackerEndUser){
  //   const dialogRef = this.dialog.open(DeleteTilActionComponent, {
  //     width: '400px',
  //     data: {
  //       action: action,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: ActionTrackerEndUser) => {
  //     if (result) {
  //       this.subs.sink = this.dataService.deleteAction(result, this.user.id).subscribe({
  //         next: data => {
  //           let index = this.action.findIndex(a => a.tilActionTrackerId === data.tilActionTrackerId);
  //           this.action.splice(index, 1);
  //           this.showNotification('snackbar-success', "Selected Action" + ' has been deleted sucessfully', 'bottom', 'center');
  //         },
  //         error: err => {
  //           this.errorMessage = err;
  //           this.showNotification('black', err, 'bottom', 'center');
  //         }
  //       })
  //     }
  //   });
  // }
  // newAction(){
  //   const dialogRef = this.dialog.open(AssignTilActionComponent, {
  //     width: '720px',
  //     data: {
  //       action: "",
  //       package: this.package,
  //       equipment:this.equipment,
  //       priority:this.priority,
  //       budgetSource:this.budgetSource,
  //       budget:this.budget,
  //       part:this.part,
  //       finalImplementation:this.finalImplementation,
  //       evidence:this.evidence,
  //       users:this.users,
  //       status:this.statusList,
  //       sapPlaning:this.sapPlaning,
  //       mode:"add"
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: ActionTrackerEndUser) => {
  //     if (result) {
  //       debugger;
  //       this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
  //         next: data => {
  //           this.action.unshift({ ...data });
  //           this.showNotification('snackbar-success', "New Observation has been sucessfully added" + ' has been added sucessfully', 'bottom', 'center');
  //         },
  //         error: err => {
  //           this.errorMessage = err;
  //           this.showNotification('black', err, 'bottom', 'center');
  //         }
  //       })
  //     }
  //   });
  // }
  // editAction(action:ActionTrackerEndUser){
  //   const dialogRef = this.dialog.open(AssignTilActionComponent, {
  //     width: '720px',
  //     data: {
  //       action: action,
  //       package: this.package,
  //       equipment:this.equipment,
  //       priority:this.priority,
  //       budgetSource:this.budgetSource,
  //       budget:this.budget,
  //       part:this.part,
  //       finalImplementation:this.finalImplementation,
  //       evidence:this.evidence,
  //       users:this.users,
  //       sapPlaning:this.sapPlaning,
  //       status:this.statusList,
  //       mode:"edit"
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: ActionTrackerEndUser) => {
  //     if (result) {
  //       debugger;
  //       this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
  //         next: data => {
  //           let index = this.action.findIndex(a => a.tilActionTrackerId === result.tilActionTrackerId);
  //           this.action[index] = { ...data };
  //           this.showNotification('snackbar-success', "Selected observation" + ' has been added sucessfully', 'bottom', 'center');
  //         },
  //         error: err => {
  //           this.errorMessage = err;
  //           this.showNotification('black', err, 'bottom', 'center');
  //         }
  //       })
  //     }
  //   });
  // }
  // getActions(observationId:number){
  //   this.subs.sink = this.dataService.getActions(observationId, this.user.id).subscribe({
  //     next:data=>{
  //       this.action=[...data.action]
  //       this.package={...data.package}
  //       this.pageTitle = this.package.packageId + ") " + this.package.actionTitle;
  //       this.equipment=[...data.equipment]
  //       this.priority=[...data.priority]
  //       this.budgetSource=[...data.budgetSource]
  //       this.budget=[...data.budget]
  //       this.statusList = [...data.statusList]
  //       this.part=[...data.part]
  //       this.finalImplementation=[...data.finalImplementation]
  //       this.evidence=[...data.evidence]
  //       this.users=[...data.users]
  //       this.sapPlaning=[...data.sapPlaning]
  //     },
  //      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
  //   })
  // }
  // //Common Functions
  // showNotification(colorName, text, placementFrom, placementAlign) {
  //   this.snackBar.open(text, "", {
  //     duration: 2000,
  //     verticalPosition: placementFrom,
  //     horizontalPosition: placementAlign,
  //     panelClass: colorName,
  //   });
  // }
}
