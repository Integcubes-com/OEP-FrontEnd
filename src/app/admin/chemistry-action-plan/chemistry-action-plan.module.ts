import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation/observation.component';
import { ActionComponent } from './action/action.component';
import { ReportComponent } from './report/report.component';
import { ChemistryActionPlanRoutingModule } from './chemistry-action-plan-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
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
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteObservationComponent } from './observation/dialogs/delete-observation/delete-observation.component';
import { ObservationFormComponent } from './observation/dialogs/observation-form/observation-form.component';
import { ObservationActionComponent } from './observation/observation-action/observation-action.component';
import { ActionFormComponent } from './observation/observation-action/dialogs/action-form/action-form.component';
import { DeleteActionComponent } from './observation/observation-action/dialogs/delete-action/delete-action.component';
import { LatestStatusComponent } from './latest-status/latest-status.component';
import { DeleteLatestStatusComponent } from './latest-status/dialog/delete-latest-status/delete-latest-status.component';
import { AddLatestStatusComponent } from './latest-status/dialog/add-latest-status/add-latest-status.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { DocumentsComponent } from './documents/documents.component';
import { AddPdfComponent } from './documents/dialogs/add-pdf/add-pdf.component';
import { DeletePdfComponent } from './documents/dialogs/delete-pdf/delete-pdf.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};
export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    ObservationComponent,
    ActionComponent,
    ReportComponent,
    DeleteObservationComponent,
    ObservationFormComponent,
    ObservationActionComponent,
    ActionFormComponent,
    DeleteActionComponent,
    LatestStatusComponent,
    DeleteLatestStatusComponent,
    AddLatestStatusComponent,
    DocumentsComponent,
    AddPdfComponent,
    DeletePdfComponent
  ],
  imports: [
    CommonModule,
    ChemistryActionPlanRoutingModule,
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
export class ChemistryActionPlanModule { }
