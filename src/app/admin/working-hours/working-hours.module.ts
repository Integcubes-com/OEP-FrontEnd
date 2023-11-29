import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsComponent } from './equipments/equipments.component';
import { NextOutagesComponent } from './next-outages/next-outages.component';
import { WorkingCalComponent } from './working-cal/working-cal.component';
import { WorkingHoursRoutingModule } from './working-hours-routing.module';
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
import { AddNextOutagesComponent } from './next-outages/dialogs/add-next-outages/add-next-outages.component';
import { DeleteNextOutagesComponent } from './next-outages/dialogs/delete-next-outages/delete-next-outages.component';
import { ConfirmDeleteComponent } from './equipments/dialogs/confirm-delete/confirm-delete.component';
import { SiteEquipmentFormComponent } from './equipments/dialogs/site-equipment-form/site-equipment-form.component';
import { DeleteCalcComponent } from './working-cal/dialogs/delete-calc/delete-calc.component';
import { AddCalcComponent } from './working-cal/dialogs/add-calc/add-calc.component';
import { AddHoursComponent } from './working-cal/dialogs/add-hours/add-hours.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ContractOutagesComponent } from './contract-outages/contract-outages.component';
import { AddContractOutageComponent } from './contract-outages/dialogs/add-contract-outage/add-contract-outage.component';
import { DeleteContractOutageComponent } from './contract-outages/dialogs/delete-contract-outage/delete-contract-outage.component';
import { Timeline2Component } from './timeline2/timeline2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActualOutagesComponent } from './actual-outages/actual-outages.component';
import { ActualOutageFormComponent } from './actual-outages/dialog/actual-outage-form/actual-outage-form.component';



@NgModule({
  declarations: [
    EquipmentsComponent,
    NextOutagesComponent,
    WorkingCalComponent,
    AddNextOutagesComponent,
    DeleteNextOutagesComponent,
    ConfirmDeleteComponent,
    SiteEquipmentFormComponent,
    DeleteCalcComponent,
    AddCalcComponent,
    AddHoursComponent,
    TimelineComponent,
    ContractOutagesComponent,
    AddContractOutageComponent,
    DeleteContractOutageComponent,
    Timeline2Component,
    DashboardComponent,
    ActualOutagesComponent,
    ActualOutageFormComponent,
    
  ],
  imports: [
    WorkingHoursRoutingModule,
    CommonModule,
    SharedModule,
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
  ]
})
export class WorkingHoursModule { }
