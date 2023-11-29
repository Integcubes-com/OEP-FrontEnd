import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteNextOutagesRoutingModule } from './site-next-outages-routing.module';
import { SiteNextOutagesMainComponent } from './site-next-outages-main/site-next-outages-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { AddNextOuatgeComponent } from './site-next-outages-main/dialog/add-next-ouatge/add-next-ouatge.component';
import { DeleteNextOutagesComponent } from './site-next-outages-main/dialog/delete-next-outages/delete-next-outages.component';



@NgModule({
  declarations: [
    SiteNextOutagesMainComponent,
    AddNextOuatgeComponent,
    DeleteNextOutagesComponent
  ],
  imports: [
    CommonModule,
    SiteNextOutagesRoutingModule,
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
export class SitesNextOutagesModule { }
