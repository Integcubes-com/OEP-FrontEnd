import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ObervationService } from '../obervation.service';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CAPAction, CAPDept, CAPObs, CAPPriority, CAPStatus, CAPUsers } from '../observation.model';
import { DeleteActionComponent } from './dialogs/delete-action/delete-action.component';
import { ActionFormComponent } from './dialogs/action-form/action-form.component';

@Component({
  selector: 'app-observation-action',
  templateUrl: './observation-action.component.html',
  styleUrls: ['./observation-action.component.sass']
})
export class ObservationActionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Common Variables
  isTableLoading: boolean;
  errorMessage: string;

  //Component Variables
  actions: CAPAction[];
  depts: CAPDept[];
  prioritys: CAPPriority[];
  statuss: CAPStatus[];
  users: CAPUsers[];
  pageTitle: string;
  observation: CAPObs;


  constructor(private route: ActivatedRoute, private dataService: ObervationService, private snackBar: MatSnackBar, private dialog: MatDialog) 
  { 
    super();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     const id = Number(this.route.snapshot.paramMap.get('id'));
  //     if (id) {
  //       this.getActions(id);
  //     }
  //   });
  // }
  // getActions(observationId:number){
  //   this.subs.sink = this.dataService.getObservationActions(observationId, this.user.id).subscribe({
  //     next:data=>{
  //       this.actions = [...data.actions];
  //       this.depts = [...data.dept];
  //       this.prioritys = [...data.priority];
  //       this.users = [...data.appUser];
  //       this.observation = {...data.observation};
  //       this.statuss=[...data.status];
  //       this.pageTitle = this.observation.observationId +") " +this.observation.observationTitle;
  //     },
  //      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
  //   })
  // }
  // editAction(action:CAPAction){
  //   const dialogRef = this.dialog.open(ActionFormComponent, {
  //     width: '720px',
  //     data: {
  //       actionData: action,
  //       action: "edit",
  //       depts: this.depts,
  //       prioritys: this.prioritys,
  //       statuss: this.statuss,
  //       users: this.users,
  //       observation:this.observation
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: CAPAction) => {
  //     if (result) {
  //       this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
  //         next: data => {
  //           let index = this.actions.findIndex(a => a.actionId === result.actionId);
  //           this.actions[index] = { ...data };
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
  // newAction(){
  //   const dialogRef = this.dialog.open(ActionFormComponent, {
  //     width: '720px',
  //     data: {
  //       actionData: "",
  //       action: "add",
  //       depts: this.depts,
  //       prioritys: this.prioritys,
  //       statuss: this.statuss,
  //       users: this.users,
  //       observation:this.observation
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: CAPAction) => {
  //     if (result) {
  //       this.subs.sink = this.dataService.saveAction(result, this.user.id).subscribe({
  //         next: data => {
  //           this.actions.unshift({ ...data });
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
  // deleteAction(action:CAPAction){
  //   const dialogRef = this.dialog.open(DeleteActionComponent, {
  //     width: '400px',
  //     data: {
  //       action: action,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: CAPAction) => {
  //     if (result) {
  //       this.subs.sink = this.dataService.deleteAction(result, this.user.id).subscribe({
  //         next: data => {
  //           let index = this.actions.findIndex(a => a.actionId === result.actionId);
  //           this.actions.splice(index, 1);
  //           this.showNotification('snackbar-success', "Selected observation" + ' has been deleted sucessfully', 'bottom', 'center');
  //         },
  //         error: err => {
  //           this.errorMessage = err;
  //           this.showNotification('black', err, 'bottom', 'center');
  //         }
  //       })
  //     }
  //   });
  // }
  //   //Common Functions
  //   showNotification(colorName, text, placementFrom, placementAlign) {
  //     this.snackBar.open(text, "", {
  //       duration: 2000,
  //       verticalPosition: placementFrom,
  //       horizontalPosition: placementAlign,
  //       panelClass: colorName,
  //     });
  //   }
}
