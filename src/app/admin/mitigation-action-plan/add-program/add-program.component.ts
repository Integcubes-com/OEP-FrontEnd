import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { AddProgramService } from './add-program.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { OMA_Technology, OMA_program, submitProgramObj } from './program.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProgramFormComponent } from './dialogs/add-program-form/add-program-form.component';
import { DeleteProgramFormComponent } from './dialogs/delete-program-form/delete-program-form.component';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.sass']
})
export class AddProgramComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Varaibles 
  programs:OMA_program[];
  allTechnologies:OMA_Technology[];
  //common variables
  isTableLoading: boolean;
  errorMessage:string;

  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private snackBar: MatSnackBar, private dataService: AddProgramService, public dialog: MatDialog,) { super() }

  displayedColumns: string[] = ['id', 'programTitle','actions'];
  dataSource: MatTableDataSource<OMA_program>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<OMA_program>(this.programs);
    this.getInterface();
    this.getPrograms();
  }
  getInterface():void{
    this.subs.sink = this.dataService.getTechnologies(this.user.id).subscribe({
      next: data => {
        this.allTechnologies = [...data];
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  getPrograms(): void {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getPrograms(this.user.id).subscribe({
      next: data => {
        this.programs = [...data];
        this.dataSource.data = [...this.programs];
        this.isTableLoading = false;
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  viewProgram(program:OMA_program){
    this.subs.sink = this.dataService.getSelectedTechnologies(this.user.id, program.programId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddProgramFormComponent, {
          width: '750px',
          data: {
            program:program,
            technologies: this.allTechnologies,
            selectedTechnology:data,
            action: "view",
          },
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  deleteProgram(program:OMA_program) {
    const dialogRef = this.dialog.open(DeleteProgramFormComponent, {
      width: '300px',
      data: {
        program:program,
      }
    });
    dialogRef.afterClosed().subscribe((result: OMA_program) => {
      if (result) {
        this.subs.sink = this.dataService.deleteProgram(result).subscribe({
          next: data => {
            this.getPrograms();
           this.showNotification('snackbar-success', result.programTitle + ' has been deleted sucessfully', 'bottom', 'center');
          },
          error: err => {
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    })
  }
  updateProgram(program:OMA_program){
    this.subs.sink = this.dataService.getSelectedTechnologies(this.user.id, program.programId).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddProgramFormComponent, {
          width: '750px',
          data: {
            program:program,
            technologies: this.allTechnologies,
            selectedTechnology:data,
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result:submitProgramObj) => {
          if (result) {
            this.subs.sink = this.dataService.saveProgram(result, this.user.id).subscribe({
              next:data=>{
                this.showNotification('snackbar-success', result.program.programTitle+' has been updated sucessfully', 'bottom', 'center');
                this.getPrograms();
              },
              error:err=>{
                this.errorMessage = err;
                this.showNotification('black', err, 'bottom', 'center');
              }
            })
          }
        });
      },
      error:err=>{
        this.errorMessage = err;
        this.showNotification('black', err, 'bottom', 'center');
      }
    })

  }
  addProgram(){
    const dialogRef = this.dialog.open(AddProgramFormComponent, {
      width: '750px',
      data: {
        program:'',
        technologies: this.allTechnologies,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:submitProgramObj) => {
      if (result) {
        this.subs.sink = this.dataService.saveProgram(result, this.user.id).subscribe({
          next:data=>{
            this.showNotification('snackbar-success', result.program.programTitle+' has been added sucessfully', 'bottom', 'center');
            this.getPrograms();
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
