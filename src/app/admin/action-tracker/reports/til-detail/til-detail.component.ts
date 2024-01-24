import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TilDetailReport } from './til-detail.model';
import { MatTableDataSource } from '@angular/material/table';
import { TilDetailReportService } from './til-detail.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-til-detail',
  templateUrl: './til-detail.component.html',
  styleUrls: ['./til-detail.component.sass']
})
export class TilDetailComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isTableLoading: boolean;
  detailReport: TilDetailReport[];
  dataSource: MatTableDataSource<TilDetailReport>;
  displayedColumns: string[] = ['id', 'siteName', 'unit', 'actions', 'closed', 'opened', 'inProgress'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: TilDetailReportService,
    private snackBar: MatSnackBar) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TilDetailReport>(this.detailReport);

    this.isTableLoading = true;

    this.subs.sink = this.dataService.getActionTracker().subscribe({
      next: data => {
        this.detailReport = [...data];
        this.dataSource.data = [...this.detailReport];
        this.isTableLoading = false;

      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
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
