import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionMainComponent } from './region-main/region-main.component';
import { RegionsRoutingModule } from './regions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegionFormComponent } from './region-main/dialogs/region-form/region-form.component';
import { ConfirmDeleteComponent } from './region-main/dialogs/confirm-delete/confirm-delete.component';
import { MatChipsModule } from "@angular/material/chips";
@NgModule({
  declarations: [
    RegionMainComponent,
    RegionFormComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    MatChipsModule,
    CommonModule,
    RegionsRoutingModule,
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
export class RegionsModule { }
