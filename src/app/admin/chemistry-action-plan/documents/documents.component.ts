import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DocumentsService } from './documents.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CAP_Documents } from './document.model';
import { User } from 'src/app/core/models/user';
import { CAPRegion, CAPSites } from '../observation/observation.model';
import { AddPdfComponent } from './dialogs/add-pdf/add-pdf.component';
import { DeletePdfComponent } from './dialogs/delete-pdf/delete-pdf.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.sass']
})
export class DocumentsComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {



  //Commmon Variables
  isTableLoading:Boolean;
  errorMessage:string;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  //Custom Variables
  documents:CAP_Documents[];
  regions:CAPRegion[];
  sites:CAPSites[];
  constructor(private snackBar: MatSnackBar, private dataService: DocumentsService, public dialog: MatDialog) { super()}
  displayedColumns: string[] = ['id',  'regionTitle','siteTitle', 'docName', 'actions'];
  dataSource: MatTableDataSource<CAP_Documents>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CAP_Documents>(this.documents);
    this.getInterfaces();
    this.getData();
  }
  addDocument(){
    const dialogRef = this.dialog.open(AddPdfComponent, {
      width: '750px',
      data: {
        documnets:"",
        regions: this.regions,
        sites:this.sites,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:CAP_Documents) => {
      if (result) {
        this.subs.sink = this.dataService.saveDocument(result, this.user.id).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', result.docName+' has been added sucessfully', 'bottom', 'center');
            this.getData();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  deleteDocument(doc:CAP_Documents){
    const dialogRef = this.dialog.open(DeletePdfComponent, {
      data: {
        documnets:doc,
      },
    });
    dialogRef.afterClosed().subscribe((result:CAP_Documents) => {
      if (result) {
        this.subs.sink = this.dataService.deleteDocument(result, this.user.id).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', result.docName+' has been deleted sucessfully', 'bottom', 'center');
            this.getData();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  downloadReport(doc:CAP_Documents) {
    this.subs.sink = this.dataService.downloadFile(doc.docId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const fileExtension = doc.docName.split('.').pop();

        
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${doc.docName}.${fileExtension}`;
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
  updateDocument(doc:CAP_Documents){
    const dialogRef = this.dialog.open(AddPdfComponent, {
      width: '750px',
      data: {
        documnets:doc,
        regions: this.regions,
        sites:this.sites,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result:CAP_Documents) => {
      if (result) {
        this.subs.sink = this.dataService.saveDocument(result, this.user.id).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', result.docName+' has been updated sucessfully', 'bottom', 'center');
            this.getData();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  getInterfaces():void{
    this.subs.sink = this.dataService.getRegions(this.user.id).subscribe({
      next: data => {
      this.regions= [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
    this.subs.sink = this.dataService.getSites(this.user.id, -1).subscribe({
      next: data => {
        this.sites = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getData(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getDocuments(this.user.id).subscribe({
      next: data => {
        this.documents = [...data];
        this.dataSource.data = [...this.documents];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
