import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInsurenceComponent } from './add-insurence/add-insurence.component';
import { InsurenceTrackerComponent } from './insurence-tracker/insurence-tracker.component';
import { InsurenceRoutingModule } from './insurence-routing.module';
import { AddInsurenceFormComponent } from './add-insurence/dialog/add-insurence-form/add-insurence-form.component';
import { ConfirmDeleteComponent } from './add-insurence/dialog/confirm-delete/confirm-delete.component';

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
import { InsurenceTrackerFormComponent } from './insurence-tracker/dialogs/insurence-tracker-form/insurence-tracker-form.component';
import { ConfirmDeleteComponentAT } from './insurence-tracker/dialogs/confirm-delete/confirm-delete.component';
import { ViewInsurenceComponent } from './add-insurence/dialog/view-insurence/view-insurence.component';
import { ViewActionComponent } from './insurence-tracker/dialogs/view-action/view-action.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { AddColumnsComponent } from './add-insurence/dialog/add-columns/add-columns.component';
// import { OMExcludePipePipe } from 'src/app/_pipes/omexclude-pipe.pipe';




@NgModule({
  declarations: [
    AddInsurenceComponent,
    InsurenceTrackerComponent,
    AddInsurenceFormComponent,
    ConfirmDeleteComponent,
    InsurenceTrackerFormComponent,
    ConfirmDeleteComponent,
    ConfirmDeleteComponentAT,
    ViewInsurenceComponent,
    ViewActionComponent,
    AddColumnsComponent,
    
  ],
  imports: [
    MatTableExporterModule,
    MatMenuModule,
    MatChipsModule,
    FormsModule,
    CommonModule,
    InsurenceRoutingModule,
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
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,


  ]
})
export class InsurenceModule { }
