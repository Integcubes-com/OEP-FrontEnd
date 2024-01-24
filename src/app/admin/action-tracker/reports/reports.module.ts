import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceRecommendationComponent } from './insurance-recommendation/insurance-recommendation.component';
import { InsuranceTrackerComponent } from './insurance-tracker/insurance-tracker.component';
import { TilsComponent } from './tils/tils.component';
import { TilsTrackerComponent } from './tils-tracker/tils-tracker.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ReportsRoutingModule } from './reports-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SiteEquipmentComponent } from './site-equipment/site-equipment.component';
import { TilDetailComponent } from './til-detail/til-detail.component';
import { TilActionComponent } from './til-action/til-action.component';



@NgModule({
  declarations: [
    InsuranceRecommendationComponent,
    InsuranceTrackerComponent,
    TilsComponent,
    TilsTrackerComponent,
    SiteEquipmentComponent,
    TilDetailComponent,
    TilActionComponent
  ],
  imports: [
    MatTableExporterModule,
    MatChipsModule,
    CommonModule,
    ReportsRoutingModule,
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
export class ReportsModule { }
