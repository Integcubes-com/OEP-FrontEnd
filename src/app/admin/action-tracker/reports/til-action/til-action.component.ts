import { Component, OnInit, ViewChild } from '@angular/core';
import { TilActionService } from './til-action.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { TilActionReport } from './til-action.model';

@Component({
  selector: 'app-til-action',
  templateUrl: './til-action.component.html',
  styleUrls: ['./til-action.component.sass']
})
export class TilActionComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isTableLoading: boolean;
  detailReport: TilActionReport[];
  dataSource: MatTableDataSource<TilActionReport>;
  displayedColumns: string[] = ['id','regionTitle', 'clusterTitle', 'siteName', 'unit', 'tilNumber','statusTitle'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private dataService: TilActionService,
    private snackBar: MatSnackBar) { super() }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<TilActionReport>(this.detailReport);

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
