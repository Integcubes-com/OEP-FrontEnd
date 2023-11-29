import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OT_outageTracker } from '../../track-outages.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrackOutagesService } from '../../track-outages.service';

@Component({
  selector: 'app-track-outages-form',
  templateUrl: './track-outages-form.component.html',
  styleUrls: ['./track-outages-form.component.sass']
})
export class TrackOutagesFormComponent {
  // extends UnsubscribeOnDestroyAdapter 
//   action:OT_outageTracker
//   actionForm:FormGroup
//   dialogTitle:string
//   constructor(
//     public dialogRef: MatDialogRef<TrackOutagesFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar, private dataService: TrackOutagesService
//   ) {
//   super()
//     this.action = {...this.data?.outageAction}
//     this.dialogTitle = this.action.siteTitle + "-" +this.action.unit + " " + this.action.outageTitle +" " + this.action.phaseTitle
//     this.actionForm = this.buildForm();
//     this.removeValidators();
//    }
//    removeValidators() {
//     if (this.data.action == "view") {
//       for (const key in this.actionForm.controls) {
//         this.actionForm.get(key).disable();
//         this.actionForm.get(key).clearValidators();
//         this.actionForm.get(key).updateValueAndValidity();
//       }
//     }
//   }
//    buildForm():FormGroup{
//     return this.fb.group({
//       siteTitle:[{value:this.action.siteTitle, disabled:true}],
//       phaseNumber: [{value:this.action.phaseNumber, disabled:true}],
//       unit:[{value:this.action.unit, disabled:true}],
//       phaseReadDesc: [{value:this.action.phaseReadDesc, disabled:true}],
//       outageTitle: [{value:this.action.outageTitle, disabled:true}],
//       nextOutageDate:[{value:this.action.nextOutageDate, disabled:true}],
//       remarks: [this.action.remarks, [Validators.required]],
//       progress: [this.action.progress, [Validators.required,  
//         Validators.pattern(/^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/),
//       Validators.min(0),
//       Validators.max(100)]],
//       notApplicable:[this.action.notApplicable, [Validators.required]],
//       fileUpload:["", [Validators.required]]
//     })
//   }

//   downloadReport() {
//     this.subs.sink = this.dataService.downloadReport(this.action.potId).subscribe({
//       next: data => {
//         if (data.body.size < 100) {
//           this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
//         }
//         else {
//           const url = window.URL.createObjectURL(data.body);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `${this.action.fileName}`;
//           a.click();
//           window.URL.revokeObjectURL(url);
//         }

//       },
//       error: err => {
//         this.showNotification('black', err, 'bottom', 'center');
//       }
//     })
//   }
//   showNotification(colorName, text, placementFrom, placementAlign) {
//     this.snackBar.open(text, "", {
//       duration: 2000,
//       verticalPosition: placementFrom,
//       horizontalPosition: placementAlign,
//       panelClass: colorName,
//     });
//   }
//   techSelect(event) {
//     if (event.checked == true) {
//       this.actionForm.get('fileUpload').clearValidators();
// this.actionForm.get('fileUpload').updateValueAndValidity();
//     }
//     else {
//       this.actionForm.get('fileUpload').setValidators(Validators.required);
// this.actionForm.get('fileUpload').updateValueAndValidity();
//     }
//   }
//   submit() {
//     if(this.actionForm.valid){
//       this.action.remarks = this.actionForm.value.remarks;
//       this.action.progress = +this.actionForm.value.progress;
//       this.action.notApplicable = this.actionForm.value.notApplicable;
//       this.action.file = this.actionForm.value.fileUpload;
//       this.dialogRef.close(this.action);
//     }
//   }
//   onNoClick() {
//     this.dialogRef.close();
//   }

}
