import { Component, Inject, OnInit } from '@angular/core';
import { OMA_program, OMA_Technology, submitProgramObj } from '../../program.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-program-form',
  templateUrl: './add-program-form.component.html',
  styleUrls: ['./add-program-form.component.sass']
})
export class AddProgramFormComponent  {
  submitObj:submitProgramObj={
    program: new OMA_program({}),
    technologiesSubmit: []
  }
  program:OMA_program;
  allTechnologies:OMA_Technology[];
  technologyList : OMA_Technology[];
  programForm:FormGroup;
  dialogTitle:string;
  constructor(
    private fb: FormBuilder,
      public dialogRef: MatDialogRef<AddProgramFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 

    if (this.data.action == 'add') {
      this.program = new OMA_program({});
      this.dialogTitle = "New program";
      this.technologyList = [];
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.program = {...this.data.program};
      this.dialogTitle = this.program.programTitle;
      this.technologyList = [...this.data.selectedTechnology];
    }
    this.allTechnologies = [...this.data.technologies];
    this.programForm = this.buildform();
  }
  buildform():FormGroup{
    return this.fb.group({
      programId:[this.program.programId,[Validators.required]],
      programTitle:[this.program.programTitle, [Validators.required]],
      technologies:[''],
    })
  }
  removeChip(value: any): void {
      const index = this.technologyList.indexOf(value);
      if (index >= 0) {
        this.technologyList.splice(index, 1);
      }
  }
  addChip(val: string) {
    if (val) {
        let u = this.allTechnologies.find(a => a.technologyId == +val)
        this.technologyList.push(u);
        this.programForm.patchValue({
          technologies: ""
        })
    }
  }
  submit() {
    this.submitObj.technologiesSubmit = [...this.technologyList];
    this.submitObj.program.programId = this.programForm.value.programId;
    this.submitObj.program.programTitle = this.programForm.value.programTitle;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
