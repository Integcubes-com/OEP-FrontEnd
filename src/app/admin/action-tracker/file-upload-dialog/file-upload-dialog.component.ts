import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DocumnetUpload, ReturnedDocumnet } from './file-upload.model';
import { InsurenceTracker } from '../insurence/insurence-tracker/insurence-tracker.model';
import { User } from 'src/app/core/models/user';
import { FileUploadDialogService } from './file-upload-dialog.service';
import { ActionTrackerEndUser } from '../end-user/end-user-til/til-tracker.model';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.sass']
})
export class FileUploadDialogComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  isLoading:boolean=false;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  actionTracker: InsurenceTracker;
  actionTil: ActionTrackerEndUser
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
    if(this.data.action=='insurance'){
      this.actionTracker = { ...this.data.actionTracker }
    }
    if(this.data.action=='til'){
      this.actionTil = { ...this.data.actionTracker }
    }
  }

  ngOnInit(): void {
    this.isLoading=true;

    if(this.data.action=='insurance'){
      this.subs.sink = this.dataService.getAttachedFileList(this.actionTracker.insurenceActionTrackerId,this.user.id).subscribe({
        next:data=>{
          this.docList = [...data];
          this.isLoading = false;
        },
        error:err=>{
          this.showNotification('black', err, 'bottom', 'center') 
        }
       })
    }
    else if(this.data.action=='til'){
      this.subs.sink = this.dataService.getAttachedFileListTil(this.actionTil.tapId,this.actionTil.siteEquipmentId,this.user.id).subscribe({
        next:data=>{
          this.docList = [...data];
          this.isLoading = false;

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
    else if(this.data.action=='insurance'){
      this.subs.sink = this.dataService.saveDocument(this.uploadDoc, this.actionTracker.insurenceActionTrackerId, this.user.id).subscribe({
        next:data=>{
          this.ngOnInit();
          this.uploadDoc = new DocumnetUpload({})
        },
        error:err=>{ this.showNotification('black', err, 'bottom', 'center') },
      })
    }
    else if(this.data.action=='til'){
      this.subs.sink = this.dataService.saveDocumentTil(this.uploadDoc, this.actionTil.tapId, this.actionTil.siteEquipmentId, this.user.id).subscribe({
        next:data=>{
          this.ngOnInit();
          this.uploadDoc = new DocumnetUpload({})
        },
        error:err=>{ this.showNotification('black', err, 'bottom', 'center') },
      })
    } 
    
  }
  downloadReport(uploadDoc:any){
    this.subs.sink = this.dataService.downloadReport(uploadDoc.filePath).subscribe({
      next: data => { 
        if(data.body.size < 100){
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else{
          const fileExtension = uploadDoc.filePath.split('.').pop();
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
    if(this.data.action=='insurance'){
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

      else if(this.data.action=='til'){
        this.subs.sink = this.dataService.deleteDocumentTil(uploadDoc).subscribe({
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
