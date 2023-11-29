import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsurenceRecommendation } from '../../insurence.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddInsurenceService } from '../../add-insurence.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-view-insurence',
  templateUrl: './view-insurence.component.html',
  styleUrls: ['./view-insurence.component.sass']
})
export class ViewInsurenceComponent extends UnsubscribeOnDestroyAdapter{

  insurence:InsurenceRecommendation;
  dialogTitle:string;
  constructor(public dialogRef: MatDialogRef<ViewInsurenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, 
    private dataService: AddInsurenceService,)
  {
    super();
    this.insurence = {...this.data.recommend};
    this.dialogTitle = this.insurence.referenceNumber;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  downloadReport(){
    this.subs.sink = this.dataService.downloadReport(this.insurence.recommendationId).subscribe({
      next: data => { 
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = this.insurence.reportName.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download =this.insurence.reportName;
          a.click();
          window.URL.revokeObjectURL(url);
          this.showNotification('snackbar-success', "File Downloaded Sucessfully", 'bottom', 'center');
        }
        
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
}
