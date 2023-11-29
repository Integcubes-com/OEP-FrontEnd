import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutageReadinessComponent } from './outage-readiness/outage-readiness.component';
import { OutageReadinessFormComponent } from './outage-readiness/dialogs/outage-readiness-form/outage-readiness-form.component';
import { OutageTrackerRoutingModule } from './outage-tracker-routing.module';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { AddPhaseFormComponent } from './outage-readiness/dialogs/add-phase-form/add-phase-form.component';
import { DeletePhaseComponent } from './outage-readiness/dialogs/delete-phase/delete-phase.component';
import { AddDurationFormComponent } from './outage-readiness/dialogs/add-duration-form/add-duration-form.component';
import { DeletePhaseDescComponent } from './outage-readiness/dialogs/delete-phase-desc/delete-phase-desc.component';
import { NextOutagesComponent } from './next-outages/next-outages.component';
import { SiteEquipmentsComponent } from './site-equipments/site-equipments.component';
import { TrackOutagesComponent } from './track-outages/track-outages.component';
import { AddNextOutagesComponent } from './next-outages/dialogs/add-next-outages/add-next-outages.component';
import { DeleteNextOutagesComponent } from './next-outages/dialogs/delete-next-outages/delete-next-outages.component';
import { ActionRolesComponent } from './action-roles/action-roles.component';
import { AddActionRoleFormComponent } from './action-roles/dialogs/add-action-role-form/add-action-role-form.component';
import { DeleteActionRoleComponent } from './action-roles/dialogs/delete-action-role/delete-action-role.component';
import { TrackOutagesFormComponent } from './track-outages/dialogs/track-outages-form/track-outages-form.component';
import { TrackOutagesForm2Component } from './track-outages/dialogs/track-outages-form2/track-outages-form2.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { RegionsComponent } from './regions/regions.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    OutageReadinessComponent,
    OutageReadinessFormComponent,
    AddPhaseFormComponent,
    DeletePhaseComponent,
    AddDurationFormComponent,
    DeletePhaseDescComponent,
    NextOutagesComponent,
    SiteEquipmentsComponent,
    TrackOutagesComponent,
    AddNextOutagesComponent,
    DeleteNextOutagesComponent,
    ActionRolesComponent,
    AddActionRoleFormComponent,
    DeleteActionRoleComponent,
    TrackOutagesFormComponent,
    TrackOutagesForm2Component,
    FileUploadDialogComponent,
    RegionsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    OutageTrackerRoutingModule,
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
  ]
})
export class OutageTrackerModule { }
