import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OT_IActionOwner, OT_OutageReadDesc, OT_OutageRediness, OT_SaveOutageReadDesc } from '../../outage-readiness.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutageReadinessService } from '../../outage-readiness.service';

@Component({
  selector: 'app-outage-readiness-form',
  templateUrl: './outage-readiness-form.component.html',
  styleUrls: ['./outage-readiness-form.component.sass']
})
export class OutageReadinessFormComponent{

  apiObj:OT_SaveOutageReadDesc={
    ownerList: [],
    outageReadDesc: new OT_OutageReadDesc({}),
    userName: ''
  }

  phase:OT_OutageRediness
  phaseDescription:OT_OutageReadDesc
  dialogTitle:string
  phaseForm:FormGroup
  actionOwners:OT_IActionOwner[]
  selectedOwners:OT_IActionOwner[]
  constructor(
    public dialogRef: MatDialogRef<OutageReadinessFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.dialogTitle = "Outage Readiness Actions";
    this.phase= {...this.data.phase}
    this.actionOwners=[...this.data.actionOwners]
    if(this.data.action == "add"){
      this.phaseDescription = new OT_OutageReadDesc({})
      this.phaseDescription.phaseId = this.phase.phaseId
      this.selectedOwners = [];
    }
    if(this.data.action == "edit"){
      this.phaseDescription = {...this.data.phaseDescription}
      this.selectedOwners=[...this.data.selectedOwners]
    }
    this.phaseForm = this.buildForm();
   }
   buildForm():FormGroup{
    return this.fb.group({
      phaseReadId:[this.phaseDescription.phaseReadId, [Validators.required]],
      phaseId:[this.phaseDescription.phaseId, [Validators.required]],
      phaseNumber:[this.phaseDescription.phaseReadNum, [Validators.required, Validators.pattern(/^-?[0-9]+$/)]],
      phaseDescription:[this.phaseDescription.phaseReadDesc, [Validators.required] ],
      actionOwner:[""],
    })
  }
  submit() {
    if(this.phaseForm.valid){
      this.phaseDescription.phaseReadDesc = this.phaseForm.value.phaseDescription;
      this.phaseDescription.phaseReadNum = +this.phaseForm.value.phaseNumber;
      this.apiObj.ownerList = [...this.selectedOwners];
      this.apiObj.outageReadDesc = {...this.phaseDescription};
      this.dialogRef.close(this.apiObj);
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  removeChip(value: any): void {
      const index = this.selectedOwners.indexOf(value);
      if (index >= 0) {
        this.selectedOwners.splice(index, 1);
      }

  }
  addChip(val: string) {
    if (val) {
        let u = this.actionOwners.find(a => a.actionOwnerId == +val)
        this.selectedOwners.push(u);
        this.phaseForm.patchValue({
          actionOwner: ""
        })
    }
  }
}
