import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiRoutingModule } from './kpi-routing.module';
import { AssignGroupComponent } from './assign-group/assign-group.component';
import { MonthlyKpiComponent } from './monthly-kpi/monthly-kpi.component';
import { AssignGroupFormComponent } from './assign-group/dialogs/assign-group-form/assign-group-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { UniquePipe } from 'src/app/_pipes/unique.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DeleteComponent } from './configuration/dialogs/delete/delete.component';
import { FormComponent } from './configuration/dialogs/form/form.component';
import { KpiFormComponent } from './configuration/dialogs/kpi-form/kpi-form.component';



@NgModule({
  declarations: [
    AssignGroupComponent,
    MonthlyKpiComponent,
    AssignGroupFormComponent,
    UniquePipe,
    DashboardComponent,
    ConfigurationComponent,
    DeleteComponent,
    FormComponent,
    KpiFormComponent,
  ],
  imports: [
    CommonModule,
    KpiRoutingModule,

    MatTableExporterModule,
    MatMenuModule,
    MatChipsModule,

    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    PerfectScrollbarModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
  ],

})
export class KpiModule { }
