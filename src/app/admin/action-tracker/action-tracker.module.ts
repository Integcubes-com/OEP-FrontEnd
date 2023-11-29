import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTrackerRoutingModule } from './action-tracker-routing.module';
import { FleetEquipmentComponent } from './common-dialogs/fleet-equipment/fleet-equipment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    FleetEquipmentComponent,
    FileUploadDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ActionTrackerRoutingModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class ActionTrackerModule { }
