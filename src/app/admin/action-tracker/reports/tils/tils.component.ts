import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ViewFormComponent } from '../../reviewer/til-evaluation/dialogs/view-form/view-form.component';
import { TFilterObj, TAPIData, TILs, TComponent, TDocType, TEquipment, TSeverity, TSeverityTiming, TFocus, TReviewForum, TReviewStatus, TSite, TSource, tbEquipemnt } from '../../tils/add-tils/add-tils.model';
import { AddTilsService } from '../../tils/add-tils/add-tils.service';
import { User } from 'src/app/core/models/user';
import { TableColsComponent } from '../../tils/add-tils/dialog/table-cols/table-cols.component';

@Component({
  selector: 'app-tils',
  templateUrl: './tils.component.html',
  styleUrls: ['./tils.component.sass']
})
export class TilsComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {
  
  filterObj:TFilterObj={
    startDate: null,
    endDate: null,
    documentId: -1,
    statusId: -1,
    formId: -1
  }
  errorMessage: string;
  isTableLoading: boolean;
  apiObj: TAPIData;
  documentFilterList: any[] = [];
  reviewStatusFilterList: any[] = [];
  reviewFormFilterList: any[] = [];
  til: TILs;
  tils: TILs[];
  displayFilter:Boolean = false;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  tilComponents: TComponent[];
  tilDocTypes: TDocType[];
  tilEquipments: TEquipment[];
  tilSeveritys: TSeverity[];
  tilTimings: TSeverityTiming[];
  tilFocuss: TFocus[];
  tilReviewForums: TReviewForum[];
  tilReviewStatuss: TReviewStatus[];
  tilSites: TSite[];
  tilSources: TSource[];
  tbEquipemnt :tbEquipemnt[];

  tilFocusFilterList: any[] = [];
  soverityFilterList: any[] = [];
  tbEquipmentFilterList: any[]=[];
  constructor(private dataService: AddTilsService, private snackBar: MatSnackBar, public dialog: MatDialog) { super() }
  displayedColumns: string[] = ['id', 'tilNumber', 'tilTitle', 'oemTimingTitle', 'documentTypeTitle', 'sourceTitle', 'reviewForumtitle', 'report'];  dataSource: MatTableDataSource<TILs>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  toggleFilter(){
    this.displayFilter = !this.displayFilter;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TILs>(this.tils);
    this.getTils();
    this.getInterfaces();
  }
  addColumns(){
    const dialogRef = this.dialog.open(TableColsComponent, {
      width: '750px',
      data: {
        column: this.displayedColumns,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.displayedColumns = [...result];
    });
  }
  getTils() {
    this.isTableLoading = true;
    this.subs.sink = this.dataService.getTilsList(this.user.id,this.documentFilterList.toString(), this.reviewStatusFilterList.toString(), this.reviewFormFilterList.toString(),this.tilFocusFilterList.toString(), this.soverityFilterList.toString(),this.tbEquipmentFilterList.toString()).subscribe({
      next: data => {
        this.tils = [...data.tils]
        this.dataSource.data = [...this.tils];
        this.isTableLoading = false;
      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }
    //PDF Download

    downloadReport(til: TILs) {
      this.subs.sink = this.dataService.downloadReport(til.tilId).subscribe({
        next: data => {
          if (data.body.size < 100) {
            this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
          }
          else {
            const fileExtension = til.reportName.split('.').pop();
            const url = window.URL.createObjectURL(data.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${til.reportName}`;
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
  getInterfaces() {
    this.subs.sink = this.dataService.getInterfaces(this.user.id).subscribe({
      next: data => {
        this.tilDocTypes = [...data.tilDocType];
        this.tilComponents = [...data.tilComponent];
        this.tilSeveritys = [...data.oemSeverity];
        this.tilTimings = [...data.oemSeverityTiming];
        this.tilFocuss = [...data.tilFocus];
        this.tilSources = [...data.tilSource];
        this.tilReviewForums = [...data.reviewForum];
        this.tilReviewStatuss = [...data.reviewStatus];
        this.tbEquipemnt = [...data.tbEquipemnt]

      },
      error: err => { this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center') },
    })
  }

  viewTil(til: TILs) {
    const dialogRef = this.dialog.open(ViewFormComponent, {
      width: '750px',
      data: {
        til: til,
      },
    });
    dialogRef.afterClosed().subscribe((result: TILs) => {
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
    //Filters
    focusListFn(source: TFocus) {
      let index = this.tilFocusFilterList.indexOf(source.focusId);
      if (index == -1) {
        this.tilFocusFilterList.push(source.focusId);
      }
      else {
        this.tilFocusFilterList.splice(index, 1);
      }
    }
    severityListFn(source: TSeverity) {
      let index = this.soverityFilterList.indexOf(source.oemSeverityId);
      if (index == -1) {
        this.soverityFilterList.push(source.oemSeverityId);
      }
      else {
        this.soverityFilterList.splice(index, 1);
      }
    }
    documentListFn(source: TDocType) {
      let index = this.documentFilterList.indexOf(source.typeId);
      if (index == -1) {
        this.documentFilterList.push(source.typeId);
      }
      else {
        this.documentFilterList.splice(index, 1);
      }
    }

    reviewStatusListFn(status: TReviewStatus) {
      let index = this.reviewStatusFilterList.indexOf(status.reviewStatusId);
      if (index == -1) {
        this.reviewStatusFilterList.push(status.reviewStatusId);
      }
      else {
        this.reviewStatusFilterList.splice(index, 1);
      }
    }

    reviewFormListFn(company: TReviewForum) {
      let index = this.reviewFormFilterList.indexOf(company.reviewFormId);
      if (index == -1) {
        this.reviewFormFilterList.push(company.reviewFormId);
      }
      else {
        this.reviewFormFilterList.splice(index, 1);
      }
    }
    EquipmentListFn(eq: tbEquipemnt) {
      let index = this.tbEquipmentFilterList.indexOf(eq.tilEquipmentId);
      if (index == -1) {
        this.tbEquipmentFilterList.push(eq.tilEquipmentId);
      }
      else {
        this.tbEquipmentFilterList.splice(index, 1);
      }
    }
    filterFn() {
      this.getTils();
    }

    clearFn() {
      this.documentFilterList.length = 0;
      this.reviewStatusFilterList.length = 0;
      this.reviewFormFilterList.length = 0;
      this.tilFocusFilterList.length = 0;
      this.soverityFilterList.length = 0;
      this.tbEquipmentFilterList.length = 0;

      this.tilDocTypes.map(a => a.isSelected = false)
      this.tilReviewStatuss.map(a => a.isSelected = false)
      this.tilReviewForums.map(a => a.isSelected = false)
      this.tilFocuss.map(a => a.isSelected = false)
      this.tilSeveritys.map(a => a.isSelected = false)
      this.tbEquipemnt.map(a => a.isSelected = false)

    }
}
