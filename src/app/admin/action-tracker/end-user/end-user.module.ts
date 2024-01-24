import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndUserRoutingModule } from './end-user-routing.module';
import { EndUserTilComponent } from './end-user-til/end-user-til.component';
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
import { EndUserInsurenceComponent } from './end-user-insurence/end-user-insurence.component';
import { InsuranceFormComponent } from './end-user-insurence/dialog/insurance-form/insurance-form.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TableColmComponent } from './end-user-insurence/dialog/table-colm/table-colm.component';
import { TableColmTilComponent } from './end-user-til/table-colm/table-colm.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReviewTilComponent } from './review-til/review-til.component';
import { ReviewInsuranceComponent } from './review-insurance/review-insurance.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};


@NgModule({
  declarations: [
    EndUserTilComponent,
    EndUserInsurenceComponent,
    InsuranceFormComponent,
    TableColmComponent,
    TableColmTilComponent,
    ReviewTilComponent,
    ReviewInsuranceComponent
  ],
  imports: [
    MatTableExporterModule,
    MatExpansionModule,
    MatMenuModule,
    MatChipsModule,
    CommonModule,
    EndUserRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    PerfectScrollbarModule,

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
    MatDatepickerModule,
    MatNativeDateModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class EndUserModule { }
