import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesMainComponent } from './sites-main/sites-main.component';
import { SitesRoutingModule } from './sites-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SitesFormComponent } from './sites-main/dialogs/sites-form/sites-form.component';
import { ConfirmDeleteComponent } from './sites-main/dialogs/confirm-delete/confirm-delete.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableExporterModule } from "mat-table-exporter";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ColumnFilterComponent } from './sites-main/dialogs/column-filter/column-filter.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    SitesMainComponent,
    SitesFormComponent,
    ConfirmDeleteComponent,
    ColumnFilterComponent,
  ],
  imports: [
    MatTableExporterModule,
    MatChipsModule,
    CommonModule,
    SitesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    PerfectScrollbarModule,
  ]
})
export class SitesModule { }
