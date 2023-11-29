import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CFleetEquipment } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-fleet-equipment',
  templateUrl: './fleet-equipment.component.html',
  styleUrls: ['./fleet-equipment.component.sass']
})
export class FleetEquipmentComponent  {
  dialogTitle:string;
  fleetEquipment:CFleetEquipment;
  constructor
  (
    public dialogRef: MatDialogRef<FleetEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    debugger;
    this.fleetEquipment = {...this.data.fleetEquipment};
    this.dialogTitle = this.fleetEquipment.fleetEquipmentTtile
   
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
