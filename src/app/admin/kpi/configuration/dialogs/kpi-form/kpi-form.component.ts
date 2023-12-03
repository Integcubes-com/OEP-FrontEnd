import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { KPIConfigurations, KPIIndicatorGroup, KPIIndicator, formulaType } from '../../configuration.model';
import { ConfigurationService } from '../../configuration.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-kpi-form',
  templateUrl: './kpi-form.component.html',
  styleUrls: ['./kpi-form.component.sass']
})
export class KpiFormComponent extends UnsubscribeOnDestroyAdapter {

  dialogTitle: string;
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  kpi: KPIIndicator;
  form: FormGroup;
  group: KPIIndicatorGroup[];
  indicator: KPIIndicator[]
  formulaType: formulaType[];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<KpiFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dataService: ConfigurationService,
    private snackBar: MatSnackBar
  ) {
    super()
    this.getGroup();
    this.dialogTitle = 'New KPI'
    this.kpi = { ...this.data.kpi };
    this.form = this.buildForm();
    this.removeValidators();
  }
  removeValidators() {
    if (this.data.action === 'view') {
      for (const key in this.form.controls) {
        this.form.get(key).clearValidators();
        this.form.get(key).disable();
        this.form.get(key).updateValueAndValidity();
      }
    }
  }
  getGroup() {
    this.subs.sink = this.dataService.getIndicatorGroup(this.user.id).subscribe({
      next: data => {
        this.group = [...data]
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center')
      }
    })
  }
  getIndicator(groupId: number) {
    this.subs.sink = this.dataService.getIndicator(this.user.id, groupId).subscribe({
      next: data => {
        this.indicator = [...data]
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center')
      }
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
  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    if (this.form.valid) {
      this.kpi = { ...this.form.value };
      this.dialogRef.close(this.kpi);
    }
  }
  buildForm(): FormGroup {
    return this.fb.group({
      indicatorId: [this.kpi.groupId, [Validators.required]],
      groupId: [this.kpi.groupId, [Validators.required]],
      indicatorCode: [this.kpi.indicatorCode, [Validators.required]],
      indicatorTitle: [this.kpi.indicatorTitle, [Validators.required]],
      isDisplay: [this.kpi.isDisplay, [Validators.required]],
      isParent: [this.kpi.isParent, [Validators.required]],
    })
  }
}
