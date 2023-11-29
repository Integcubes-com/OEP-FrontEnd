import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentsService } from '../../documents.service';
import { CAPRegion, CAPSites } from '../../../observation/observation.model';
import { CAP_Documents } from '../../document.model';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';

@Component({
  selector: 'app-add-pdf',
  templateUrl: './add-pdf.component.html',
  styleUrls: ['./add-pdf.component.sass']
})
export class AddPdfComponent extends UnsubscribeOnDestroyAdapter {
  dialogTitle:string;
 document:CAP_Documents;
  regions:CAPRegion[];
  sites:CAPSites[];
  file: File;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  pdfForm:FormGroup;
  constructor(
    private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<AddPdfComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private dataService: DocumentsService,
  ) { 
    super();
    debugger;
    if (this.data.action == "edit") {
      this.document = {...this.data.documnets};
      this.dialogTitle = this.data.documnets.docName;
    
    }
    else if (this.data.action == "add") {
      this.document = new CAP_Documents({});
      this.dialogTitle = "New File";
    }
    this.regions = [...this.data.regions];
    this.sites = [...this.data.sites];
    this.pdfForm = this.buildForm();
    if (this.data.action == "edit") {

      this.pdfForm.get('doc').clearValidators();
    }
  }
  buildForm(): FormGroup {
    return this.fb.group({
      documnetId: [this.document.docId, [Validators.required]],
      documentName:[""],
      regionId: [this.document.regionId, [Validators.required]],
      siteId: [this.document.siteId, [Validators.required]],
      doc:["", [Validators.required]],
      documentFile: [""],
    })
  }

  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    if (this.pdfForm.valid) {
      debugger;
     this.document.docId = this.pdfForm.value.documnetId;
     this.document.docName = this.pdfForm.value.documentName;
     this.document.siteId = this.pdfForm.value.siteId;
     this.document.siteTitle = this.sites.find(a=>a.siteId ==  this.document.siteId).siteTitle;
     this.document.regionId = this.pdfForm.value.regionId;
     this.document.regionTitle = this.regions.find(a=>a.regionId ==  this.document.regionId).regionTitle;
     this.document.file = this.pdfForm.value.documentFile;
    }
  }
  getSites(event:number){
    if(event){
      let regionId = +event
      this.subs.sink = this.dataService.getSites(this.user.id,regionId).subscribe({
        next:data=>{this.sites=[...data]},
        error:err=>{this.showNotification('black', err, 'bottom', 'center');}
      })
    }
}
handleUpload(event) {
  debugger;
  if (event.target.files.length > 0) {
    debugger;
    this.file = event.target.files[0];
    let uploadedFileName = this.file.name;
      this.pdfForm.patchValue({
        documentFile: this.file,
        documentName:uploadedFileName
    })
  }
}
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
}
