import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceAccessComponent } from './insurance-access/insurance-access.component';
import { TilAccessComponent } from './til-access/til-access.component';
import { PocAccessControlRoutingModule } from './poc-access-control-routing.module';
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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { InsuranceAccessFormComponent } from './insurance-access/dialogs/insurance-access-form/insurance-access-form.component';


@NgModule({
  declarations: [
    InsuranceAccessComponent,
    TilAccessComponent,
    InsuranceAccessFormComponent,
    
  ],
  imports: [
    CommonModule,
    PocAccessControlRoutingModule,
    MatTableExporterModule,
    MatMenuModule,
    MatChipsModule,
    FormsModule,
    MatAutocompleteModule,
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
export class PocAccessControlModule { }
