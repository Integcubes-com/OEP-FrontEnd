import { Component, OnInit, ViewChild } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ModelEquipment, SESiteEquipmentOME, SESiteEquipmentType } from './model.type';
import { ModelEquipmentService } from './model-equipment.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { ModelFormComponent } from './dialogs/model-form/model-form.component';

@Component({
  selector: 'app-model-equipment-main',
  templateUrl: './model-equipment-main.component.html',
  styleUrls: ['./model-equipment-main.component.sass']
})
export class ModelEquipmentMainComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

 //Common Variables
 errorMessage:string;
 isTableLoading: boolean;
 //Get data from browsers Local Storage
 user: User = JSON.parse(localStorage.getItem('currentUser'));
oem:SESiteEquipmentOME[]=[];
type:SESiteEquipmentType[]=[]
 //Varaibles
 models: ModelEquipment[];
 constructor(private snackBar: MatSnackBar, private dataService: ModelEquipmentService, public dialog: MatDialog,) { super() }
 displayedColumns: string[] = ['id', 'title', 'oemTitle', 'typeTitle', 'actions'];
 dataSource: MatTableDataSource<ModelEquipment>;
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }
 ngOnInit(): void {
   this.dataSource = new MatTableDataSource<ModelEquipment>(this.models);
   this.getInterfaces();
   this.getModelEquipment();
 }
 getInterfaces():void{
   this.subs.sink = this.dataService.getInterface(this.user.id).subscribe({
     next: data => {
      this.oem = [...data.equipFleetoem];
      this.type = [...data.equipFleetType];
     },
     error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
   })
 }
 getModelEquipment(): void {
   this.isTableLoading = true;
   this.subs.sink = this.dataService.getModelEquipments(this.user.id).subscribe({
     next: data => {
       this.models = [...data];
       this.dataSource.data = [...this.models];
       this.isTableLoading = false;
     },
     error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
   })
 }
 deleteModel(reg: ModelEquipment) {
   const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
     data: {
       model: reg
     }
   });
   dialogRef.afterClosed().subscribe((result: ModelEquipment) => {
     if (result) {
       this.subs.sink = this.dataService.delete(this.user.id, result).subscribe({
         next: data => {
         this.getModelEquipment();
          this.showNotification('snackbar-success', result.title + ' has been deleted sucessfully', 'bottom', 'center');
         },
         error: err => {
           this.errorMessage = err;
           this.showNotification('black', err, 'bottom', 'center');
         }
       })
     }
   })
 }
 addModel() {
   const dialogRef = this.dialog.open(ModelFormComponent, {
     width: '750px',
     data: {
       model:new ModelEquipment({}),
       oem:this.oem,
       type:this.type,
       action: "add",
     },
   });
   dialogRef.afterClosed().subscribe((result:ModelEquipment) => {
     if (result) {
       this.subs.sink = this.dataService.saveModel(this.user.id,result).subscribe({
         next:data=>{       
           this.showNotification('snackbar-success', result.title+' has been added sucessfully', 'bottom', 'center');
           this.getModelEquipment();
         },
         error:err=>{
           this.errorMessage = err;
           this.showNotification('black', err, 'bottom', 'center');
         }
       })
     }
   });
 }
  viewModel(reg: ModelEquipment) {
    const dialogRef = this.dialog.open(ModelFormComponent, {
      width: '750px',
      data: {
        model: reg,
        oem: this.oem,
        type: this.type,
        action: "view",
      },
    });
  }
 updateModel(reg:ModelEquipment) {
       const dialogRef = this.dialog.open(ModelFormComponent, {
         width: '750px',
         data: {
           model: reg,
           oem:this.oem,
           type:this.type,
           action: "edit",
         },
       });
       dialogRef.afterClosed().subscribe((result:ModelEquipment) => {
         if (result) {
           this.subs.sink = this.dataService.saveModel(this.user.id,result).subscribe({
             next:data=>{
              this.showNotification('snackbar-success', result.title+' has been added sucessfully', 'bottom', 'center');
              this.getModelEquipment();
             },
             error:err=>{
               this.errorMessage = err;
               this.showNotification('black', err, 'bottom', 'center');
             }
           })
         }
       });

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
