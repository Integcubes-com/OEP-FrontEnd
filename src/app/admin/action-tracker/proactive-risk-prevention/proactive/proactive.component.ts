import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ProactiveService } from './proactive.service';
import { ProactiveApproachStatus, ProactiveCategory, ProactiveCriticality, ProactiveExposure, ProactiveProactiveSource, ProactiveProactiveTheme, ProactiveProjectPhase, ProactiveRiskPrevention, ProactiveSaveObj } from './proactive.model';
import { AddColumnsComponent } from './dialogs/add-columns/add-columns.component';
import { AddFormComponent } from './dialogs/add-form/add-form.component';
import { DeleteFormComponent } from './dialogs/delete-form/delete-form.component';

@Component({
  selector: 'app-proactive',
  templateUrl: './proactive.component.html',
  styleUrls: ['./proactive.component.sass']
})
export class ProactiveComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  //Common Variables
  errorMessage: string;
  isTableLoading: boolean;
  
  proactiveCriticality: ProactiveCriticality[];
  proactiveCategory: ProactiveCategory[];
  proactiveExposure: ProactiveExposure[];
  proactiveApproachStatus: ProactiveApproachStatus[];
  proactiveProjectPhase: ProactiveProjectPhase[];
  proactiveProactiveSource: ProactiveProactiveSource[];
  proactiveProactiveTheme: ProactiveProactiveTheme[]


  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));

  //Varaibles
  proactive: ProactiveRiskPrevention[]
  constructor(private snackBar: MatSnackBar, private dataService: ProactiveService, public dialog: MatDialog,) { super() }
  displayedColumns: string[] = ['id', 'proactivetitle','proactiveReference', 'recommendations', 'sites','actions'];
  dataSource: MatTableDataSource<ProactiveRiskPrevention>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  addColumns(){
    const dialogRef = this.dialog.open(AddColumnsComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ProactiveRiskPrevention>(this.proactive);
    this.getProactives();
    this.getInterfaces();
  }
  getInterfaces() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next:data=>{
        this.proactiveCriticality=[...data.proactiveCriticality]
        this.proactiveCategory=[...data.proactiveCategory]
        this.proactiveExposure=[...data.proactiveExposure]
        this.proactiveApproachStatus=[...data.proactiveApproachStatus]
        this.proactiveProjectPhase=[...data.proactiveProjectPhase]
        this.proactiveProactiveSource=[...data.proactiveProactiveSource]
        this.proactiveProactiveTheme=[...data.proactiveProactiveTheme]
      },
      error: err => {this.errorMessage = err;this.showNotification('black', err, 'bottom', 'center')},
    })
  }
  updateRisk(proactive:ProactiveRiskPrevention){
    this.subs.sink = this.dataService.getSpecificItem(proactive).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddFormComponent, {
          width: '750px',
          data: {
            proactiveCriticality :this.proactiveCriticality,
            proactiveCategory:this.proactiveCategory,
            proactiveExposure:this.proactiveExposure,
            proactiveApproachStatus:this.proactiveApproachStatus,
            proactiveProjectPhase:this.proactiveProjectPhase,
            proactiveProactiveSource :this.proactiveProactiveSource,
            proactiveProactiveTheme:this.proactiveProactiveTheme,
            proactive:{...proactive},
            selectedList:[...data],
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result:ProactiveSaveObj) => {
          if (result) {
            this.subs.sink = this.dataService.saveProactive(result, this.user.id).subscribe({
              next:data=>{       
                this.showNotification('snackbar-success', result.proactive.proactiveReference+' has been added sucessfully', 'bottom', 'center');
                this.getProactives();
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
  deleteRisk(proactive:ProactiveRiskPrevention){
    const dialogRef = this.dialog.open(DeleteFormComponent, {
      data: {
      'proactive':proactive
      },
    });
    dialogRef.afterClosed().subscribe((result:ProactiveRiskPrevention) => {
      if (result) {
        this.subs.sink = this.dataService.deleteProactive(result).subscribe({
          next:data=>{       
            this.showNotification('snackbar-success', result.proactiveReference+' has been added sucessfully', 'bottom', 'center');
            this.getProactives();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  viewRisk(proactive:ProactiveRiskPrevention){
    this.subs.sink = this.dataService.getSpecificItem(proactive).subscribe({
      next:data=>{
        const dialogRef = this.dialog.open(AddFormComponent, {
          width: '750px',
          data: {
            proactiveCriticality :this.proactiveCriticality,
            proactiveCategory:this.proactiveCategory,
            proactiveExposure:this.proactiveExposure,
            proactiveApproachStatus:this.proactiveApproachStatus,
            proactiveProjectPhase:this.proactiveProjectPhase,
            proactiveProactiveSource :this.proactiveProactiveSource,
            proactiveProactiveTheme:this.proactiveProactiveTheme,
            proactive:{...proactive},
            selectedList:[...data],
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
  addRisk(){
    const dialogRef = this.dialog.open(AddFormComponent, {
      width: '750px',
      data: {
        proactiveCriticality :this.proactiveCriticality,
        proactiveCategory:this.proactiveCategory,
        proactiveExposure:this.proactiveExposure,
        proactiveApproachStatus:this.proactiveApproachStatus,
        proactiveProjectPhase:this.proactiveProjectPhase,
        proactiveProactiveSource :this.proactiveProactiveSource,
        proactiveProactiveTheme:this.proactiveProactiveTheme,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:ProactiveSaveObj) => {
      if (result) {
        this.subs.sink = this.dataService.saveProactive(result, this.user.id).subscribe({
          next:data=>{       
            this.showNotification('snackbar-success', result.proactive.proactiveReference+' has been added sucessfully', 'bottom', 'center');
            this.getProactives();
          },
          error:err=>{
            this.errorMessage = err;
            this.showNotification('black', err, 'bottom', 'center');
          }
        })
      }
    });
  }
  getProactives() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getProactives(this.user.id).subscribe({
      next:data=>{
        this.proactive = [...data];
        this.dataSource.data = [...this.proactive];
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


