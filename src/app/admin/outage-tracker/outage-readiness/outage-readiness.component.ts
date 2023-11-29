import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OutageReadinessService } from './outage-readiness.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPhaseFormComponent } from './dialogs/add-phase-form/add-phase-form.component';
import { User } from 'src/app/core/models/user';
import { OT_IActionOwner, OT_OutageReadDesc, OT_OutageRediness, OT_SaveOutageReadDesc, OT_SelectedOutages, OT_SiteOutages } from './outage-readiness.model';
import { MatAccordion } from '@angular/material/expansion';
import { DeletePhaseComponent } from './dialogs/delete-phase/delete-phase.component';
import { AddDurationFormComponent } from './dialogs/add-duration-form/add-duration-form.component';
import { OutageReadinessFormComponent } from './dialogs/outage-readiness-form/outage-readiness-form.component';
import { DeletePhaseDescComponent } from './dialogs/delete-phase-desc/delete-phase-desc.component';

@Component({
  selector: 'app-outage-readiness',
  templateUrl: './outage-readiness.component.html',
  styleUrls: ['./outage-readiness.component.sass']
})
export class OutageReadinessComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  phaseDescription:OT_OutageReadDesc[];
  phases:OT_OutageRediness[];
  actionOwner:OT_IActionOwner[];
  // siteOutages:OT_SiteOutages[];
  //Common
  errorMessage:string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: OutageReadinessService, public dialog: MatDialog) {super() }

  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit(): void {
    this.getReadDesc();
    this.getPhases();
    this.getInterfaces();
  }

  //get fns
  getReadDesc(){
    this.subs.sink = this.dataService.getPhasesDesc(this.user.id).subscribe(
      {  
        next:data=>{
          this.phaseDescription = [...data];
        },
        error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
      }
    )
  }
  getInterfaces(){
    this.subs.sink = this.dataService.getInterface(this.user.id).subscribe(
      {  
        next:data=>{
          this.actionOwner = [...data];
        },
        error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
      }
    )
  }
  getPhases(){
    this.subs.sink = this.dataService.getPhases(this.user.id).subscribe(
  {  
    next:data=>{
      this.phases = [...data];
      setTimeout(() => {
        this.accordion.openAll();
      }, 0);
    },
    error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
  }
    )
  }
  //Phase Cruds
  addPhase(){
    const dialogRef = this.dialog.open(AddPhaseFormComponent, {
      width: '600px',
      data: {
       action:"add"
      },
    });
    dialogRef.afterClosed().subscribe((result:OT_OutageRediness) => {
      if (result){
       this.subs.sink = this.dataService.savePhases(this.user.id, result).subscribe({
        next:data=>{
          this.showNotification('snackbar-success', result.phaseTitle +"has been Saved Sucessfully", 'bottom', 'center')
          this.getPhases();
        },
        error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},

       })
      }
    });
  }
  editPhase( phase:OT_OutageRediness){
    const dialogRef = this.dialog.open(AddPhaseFormComponent, {
      width: '600px',
      data: {
        action:"edit",
        phase:phase
      },
    });
    dialogRef.afterClosed().subscribe((result:OT_OutageRediness) => {
      if (result){
        this.subs.sink = this.dataService.savePhases(this.user.id, result).subscribe({
         next:data=>{
          this.showNotification('snackbar-success', result.phaseTitle +"has been Updated Sucessfully", 'bottom', 'center')
           this.getPhases();
         },
         error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
 
        })
       }
    });
  }
  deletePhase( phase:OT_OutageRediness){
    const dialogRef = this.dialog.open(DeletePhaseComponent, {

      data: {
        phase:phase
      },
    });
    dialogRef.afterClosed().subscribe((result:OT_OutageRediness) => {
      if (result){
       this.subs.sink = this.dataService.deletePhases(this.user.id, result).subscribe({
        next:data=>{
          this.showNotification('snackbar-success', result.phaseTitle +"has been Deleted Sucessfully", 'bottom', 'center')
          this.getPhases();
        },
        error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},

       })
      }
    });
  }
  //Duration Cruds
  addDuration(phase:OT_OutageRediness){
    this.subs.sink = this.dataService.seledtedOutages(this.user.id,phase.phaseId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddDurationFormComponent, {
          width: '600px',
          data: {
            selectedOutages:[...data],
            phase:{...phase}
          },
        });
        dialogRef.afterClosed().subscribe((result:OT_SelectedOutages[]) => {
          if (result){
           this.subs.sink = this.dataService.savePhaseDuration(this.user.id, result).subscribe({
            next:data=>{
              this.showNotification('snackbar-success', "Activity Start Milestone Updated Sucessfully", 'bottom', 'center')
              this.getPhases();
            },
            error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    
           })
          }
        });
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},

    })

  }
  //Description Cruds
  addReadiness(phase:OT_OutageRediness){
    const dialogRef = this.dialog.open(OutageReadinessFormComponent, {
      width: '600px',
      data: {
       action:"add",
       phase:{...phase},
       actionOwners:[...this.actionOwner]
      },
    });
    dialogRef.afterClosed().subscribe((result:OT_SaveOutageReadDesc) => {
      if (result){
       this.subs.sink = this.dataService.savePhaseDesc(this.user.id, result).subscribe({
        next:data=>{
          this.showNotification('snackbar-success', "Activity Start Milestone Updated Sucessfully", 'bottom', 'center')
          this.getReadDesc();
        },
        error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},

       })
      }
    });
  }
  editPhaseDesc(phase:OT_OutageRediness, phaseDesc:OT_OutageReadDesc){
    this.subs.sink = this.dataService.getSelectedOwners(this.user.id, phaseDesc.phaseReadId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(OutageReadinessFormComponent, {
          width: '600px',
          data: {
           action:"edit",
           phase:{...phase},
           phaseDescription:{...phaseDesc},
           actionOwners:[...this.actionOwner],
           selectedOwners:[...data]
          },
        });
        dialogRef.afterClosed().subscribe((result:OT_SaveOutageReadDesc) => {
          if (result){
           this.subs.sink = this.dataService.savePhaseDesc(this.user.id, result).subscribe({
            next:data=>{
              this.showNotification('snackbar-success', "Activity Start Milestone Updated Sucessfully", 'bottom', 'center')
              this.getReadDesc();
            },
            error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    
           })
          }
        });
      },
      error:err=>{this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')}
    })

  }
  deletePhaseDesc(phase:OT_OutageRediness, phaseDesc:OT_OutageReadDesc){
    const dialogRef = this.dialog.open(DeletePhaseDescComponent, {
      width: '300px',
      data: {
        phase:{...phase},
        phaseDescription:{...phaseDesc}
      },
    });
    dialogRef.afterClosed().subscribe((result:OT_OutageReadDesc) => {
      if (result){
        this.subs.sink = this.dataService.deletePhaseDesc(this.user.id, result).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', "Activity Start Milestone Deleted Sucessfully", 'bottom', 'center')
            this.getReadDesc();
          },
          error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
  
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
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
}
