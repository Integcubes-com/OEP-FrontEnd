import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DocumnetUpload, ReturnedDocumnet } from './file-upload.model';
import { User } from 'src/app/core/models/user';
import { FileUploadDialogService } from './file-upload-dialog.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.sass']
})
export class FileUploadDialogComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  uploadDoc:DocumnetUpload={
    name: null,
    remarks: null,
    file: null,
  }
  docList:any[] =[]
  constructor(
    private dataService: FileUploadDialogService,
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) {
    super()
  }

  ngOnInit(): void {
    if(this.data.action=='mitigation'){
      this.subs.sink = this.dataService.getAttachedFileList(this.user.id,this.data.siteId, this.data.technologyId, this.data.actionId).subscribe({
        next:data=>{
          this.docList = [...data];
        },
        error:err=>{
          this.showNotification('black', err, 'bottom', 'center') 
        }
       })
    }

  }
  onNoClick() {
    this.dialogRef.close(this.docList)
  }
 

  onFileChange(event) {
    this.uploadDoc.file = event.target.files[0];
  }
  
  submit(){
    if(this.uploadDoc.name  == null || !(this.uploadDoc.file instanceof File) || this.uploadDoc.remarks == null){

       this.showNotification('snackbar-danger','Please fill in the above fields','bottom','center')
    }
    else if(this.data.action=='mitigation'){
      this.subs.sink = this.dataService.saveDocument(this.uploadDoc, this.data.actionId,this.data.siteId, this.data.technologyId,  this.user.id).subscribe({
        next:data=>{
          this.ngOnInit();
          this.uploadDoc = new DocumnetUpload({})
        },
        error:err=>{ this.showNotification('black', err, 'bottom', 'center') },
      })
    } 
  }
  downloadReport(uploadDoc:any){
    this.subs.sink = this.dataService.downloadReport(uploadDoc.path).subscribe({
      next: data => { 
        debugger;
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = uploadDoc.path.split('.').pop();
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${uploadDoc.name}.${fileExtension}`;
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
  deleteFile(uploadDoc:any){
    if(this.data.action=='mitigation'){
      this.subs.sink = this.dataService.deleteDocument(uploadDoc).subscribe({
        next:data=>{
          let i = this.docList.indexOf(uploadDoc);
          if(i>-1){
            this.docList.splice(i,1);
          }
        },
        error:err=>{ 
          this.showNotification('black', err, 'bottom', 'center') }
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
