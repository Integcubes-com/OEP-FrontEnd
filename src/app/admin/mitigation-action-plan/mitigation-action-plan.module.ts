import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMitigationComponent } from './add-mitigation/add-mitigation.component';
import { AddActionsComponent } from './add-actions/add-actions.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { ModuleRoutingModule } from './module-routing.module';
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
import { AddProgramFormComponent } from './add-program/dialogs/add-program-form/add-program-form.component';
import { DeleteProgramFormComponent } from './add-program/dialogs/delete-program-form/delete-program-form.component';
import { AddMitigationFromComponent } from './add-mitigation/dialogs/add-mitigation-from/add-mitigation-from.component';
import { DeleteMitigationComponent } from './add-mitigation/dialogs/delete-mitigation/delete-mitigation.component';
import { SiteControlComponent } from './site-control/site-control.component';
import { SiteControlFormComponent } from './site-control/dialog/site-control-form/site-control-form.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';




@NgModule({
  declarations: [
    AddMitigationComponent,
    AddActionsComponent,
    ReviewerComponent,
    AddProgramComponent,
    AddProgramFormComponent,
    DeleteProgramFormComponent,
    AddMitigationFromComponent,
    DeleteMitigationComponent,
    SiteControlComponent,
    SiteControlFormComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
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
export class MitigationActionPlanModule { }
