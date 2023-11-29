import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { WH_Outages, WH_ContractOutage, WH_IEquipments } from '../../contract-outages.model';
import { ContractOutagesService } from '../../contract-outages.service';

@Component({
  selector: 'app-add-contract-outage',
  templateUrl: './add-contract-outage.component.html',
  styleUrls: ['./add-contract-outage.component.sass']
})
export class AddContractOutageComponent extends UnsubscribeOnDestroyAdapter {

  sites: CSites[];
  nextOutages: WH_Outages[];
  siteNextOutages: WH_ContractOutage;
  dialogTitle: string;
  outageForm; FormGroup;
  equipments: WH_IEquipments[]
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddContractOutageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private dataService: ContractOutagesService
  ) {
    super();
    if (this.data.action == 'add') {
      this.siteNextOutages = new WH_ContractOutage({});
      this.dialogTitle = "New Contract Outage";
    }
    else if (this.data.action == 'edit' || this.data.action == 'view') {
      this.siteNextOutages = { ...this.data.siteNextOutage };
      this.dialogTitle = this.siteNextOutages.outageTitle;
    }
    this.sites = [...this.data.sites]
    this.equipments = [...this.data.equipments]
    this.nextOutages = [...this.data.nextOutages]
    this.outageForm = this.buildform();
    this.removeValidators();
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.outageForm.controls) {
        this.outageForm.get(key).disable();
        this.outageForm.get(key).clearValidators();
        this.outageForm.get(key).updateValueAndValidity();
      }
    }
  }
  buildform(): FormGroup {
    return this.fb.group({
      contractOutageId: [this.siteNextOutages.contractOutageId, [Validators.required]],
      siteId: [this.siteNextOutages.siteId, [Validators.required]],
      equipmentId: [this.siteNextOutages.equipmentId, [Validators.required]],
      outageTypeId: [this.siteNextOutages.outageId, [Validators.required]],
      nextOutageDate: [this.siteNextOutages.nextOutageDate, [Validators.required]]
    })
  }
  submit() {
    this.siteNextOutages.contractOutageId = this.outageForm.value.contractOutageId;
    this.siteNextOutages.siteId = this.outageForm.value.siteId;
    this.siteNextOutages.siteTitle = this.sites.find(a => a.siteId == this.siteNextOutages.siteId)?.siteTitle;
    this.siteNextOutages.outageId = this.outageForm.value.outageTypeId;
    this.siteNextOutages.outageTitle = this.nextOutages.find(a => a.outageId == this.siteNextOutages.outageId)?.outageTitle;
    this.siteNextOutages.nextOutageDate = this.outageForm.value.nextOutageDate;
    this.siteNextOutages.equipmentId = this.outageForm.value.equipmentId;
    this.siteNextOutages.unit = this.equipments.find(a => a.equipmentId == this.siteNextOutages?.equipmentId)?.unit;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  getEquipments(siteId: number) {

    this.subs.sink = this.dataService.getEquipments(+siteId).subscribe({
      next: data => {
        this.equipments = [...data];

      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') },
    })
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
