import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OT_OutageRediness } from '../../outage-readiness.model';

@Component({
  selector: 'app-add-phase-form',
  templateUrl: './add-phase-form.component.html',
  styleUrls: ['./add-phase-form.component.sass']
})
export class AddPhaseFormComponent{
  phase:OT_OutageRediness;
  dialogTitle:string;
  phaseForm:FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddPhaseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { 
    if(this.data.action == "add"){
      this.phase = new OT_OutageRediness({});
      this.dialogTitle = "New Phase";
    }
    if(this.data.action == "edit"){
      this.phase = {...this.data.phase};
      this.dialogTitle = "Phase" + " " +this.phase.phaseNumber + " " + this.phase.phaseTitle;
    }
    this.phaseForm = this.buildForm();

  }
  buildForm():FormGroup{
    return this.fb.group({
      phaseId:[this.phase.phaseId, [Validators.required]],
      phaseNumber:[this.phase.phaseNumber, [Validators.required, Validators.pattern(/^-?[0-9]+$/)]],
      phaseTitle:[this.phase.phaseTitle, [Validators.required]],
      phaseDescription:[this.phase.phaseDescription],
    })
  }
  submit() {
    if(this.phaseForm.valid){
      this.phase.phaseNumber = +this.phaseForm.value.phaseNumber;
      this.phase.phaseTitle = this.phaseForm.value.phaseTitle;
      this.phase.phaseDescription = this.phaseForm.value.phaseDescription;
      this.dialogRef.close(this.phase);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }


}
