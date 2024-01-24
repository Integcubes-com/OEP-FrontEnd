import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTilsComponent } from './add-tils/add-tils.component';
import { TilsTrackerComponent } from './tils-tracker/tils-tracker.component';
import { TilsRoutingModule } from './tils-routing.module';
import { TilsFormComponent } from './add-tils/dialog/tils-form/tils-form.component';
import { TilsFormDeleteComponent } from './add-tils/dialog/tils-form-delete/tils-form-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
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
import { TilTrackerFormComponent } from './tils-tracker/dialog/til-tracker-form/til-tracker-form.component';
import { TilTrackerDeleteComponent } from './tils-tracker/dialog/til-tracker-delete/til-tracker-delete.component';
import { ViewActionPackageComponent } from './tils-tracker/dialog/view-action-package/view-action-package.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableExporterModule } from "mat-table-exporter";
import { AssignTilComponent } from './tils-tracker/assign-til/assign-til.component';
import { DeleteTilActionComponent } from './tils-tracker/assign-til/dialog/delete-til-action/delete-til-action.component';
import { AssignTilActionComponent } from './tils-tracker/assign-til/dialog/assign-til-action/assign-til-action.component';
import { TableColsComponent } from './add-tils/dialog/table-cols/table-cols.component';
import { CopyAlertComponent } from './tils-tracker/dialog/copy-alert/copy-alert.component';



@NgModule({
  declarations: [
    AddTilsComponent,
    TilsTrackerComponent,
    TilsFormComponent,
    TilsFormDeleteComponent,
    TilTrackerFormComponent,
    TilTrackerDeleteComponent,
    ViewActionPackageComponent,
    AssignTilComponent,
    DeleteTilActionComponent,
    AssignTilActionComponent,
    TableColsComponent,
    CopyAlertComponent,

  ],
  imports: [
   
    MatTableExporterModule,
    MatChipsModule,
    MatMenuModule,
    CommonModule,
    TilsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class TilsModule { }
