import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelEquipmentMainComponent } from './model-equipment-main/model-equipment-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { ModelEquipmentRoutingModule } from './model-equipment-routing.module';
import { ConfirmDeleteComponent } from './model-equipment-main/dialogs/confirm-delete/confirm-delete.component';
import { ModelFormComponent } from './model-equipment-main/dialogs/model-form/model-form.component';



@NgModule({
  declarations: [
    ModelEquipmentMainComponent,
    ConfirmDeleteComponent,
    ModelFormComponent
  ],
  imports: [
    PerfectScrollbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableExporterModule,
    MatChipsModule,
    CommonModule,
    ModelEquipmentRoutingModule,
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
    SharedModule,  ]
})
export class ModelEquipmentModule { }
