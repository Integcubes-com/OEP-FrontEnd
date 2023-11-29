import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProactiveComponent } from './proactive/proactive.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ProactiveRiskPreventionRoutingModule } from './proactive-risk-prevention-routing.module';
import { AddColumnsComponent } from './proactive/dialogs/add-columns/add-columns.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AddFormComponent } from './proactive/dialogs/add-form/add-form.component';
import { DeleteFormComponent } from './proactive/dialogs/delete-form/delete-form.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    ProactiveComponent,
    AddColumnsComponent,
    AddFormComponent,
    DeleteFormComponent,
    
  ],
  imports: [
    CommonModule,
    MatTableExporterModule,
    ProactiveRiskPreventionRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
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
export class ProactiveRiskPreventionModule { }
