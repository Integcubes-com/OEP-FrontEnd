import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OT_OutageRediness, OT_SelectedOutages } from '../../outage-readiness.model';

@Component({
  selector: 'app-add-duration-form',
  templateUrl: './add-duration-form.component.html',
  styleUrls: ['./add-duration-form.component.sass']
})
export class AddDurationFormComponent {
  selectedOutages:OT_SelectedOutages[]
  phase:OT_OutageRediness
  dialogTitle:string;
  constructor(
    public dialogRef: MatDialogRef<AddDurationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
    this.selectedOutages = [...this.data.selectedOutages]
    this.phase = {...this.data.phase}
    this.dialogTitle = "Activity Start miestone"
    this.selectedOutages.map(a=>a.phaseId = this.phase.phaseId);
   }
   submit() {
    this.dialogRef.close(this.selectedOutages);
  }
  onNoClick() {
    this.dialogRef.close();
  }


}
