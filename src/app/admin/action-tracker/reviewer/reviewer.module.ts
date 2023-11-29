import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilEvaluationComponent } from './til-evaluation/til-evaluation.component';
import { ReviewerRoutingModule } from './reviewer-routing.module';
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
import { MatChipsModule } from '@angular/material/chips';
import { EvaluationFormComponent } from './til-evaluation/dialogs/evaluation-form/evaluation-form.component';
import { ViewFormComponent } from './til-evaluation/dialogs/view-form/view-form.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    TilEvaluationComponent,
    EvaluationFormComponent,
    ViewFormComponent
  ],
  imports: [
    MatChipsModule,
    MatTableExporterModule,
    CommonModule,
    ReviewerRoutingModule,
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
export class ReviewerModule { }
