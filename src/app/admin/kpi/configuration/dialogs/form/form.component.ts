import { Component, Inject, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { KPIConfigurations, KPIIndicator, KPIIndicatorGroup, formulaType } from '../../configuration.model';
import { ConfigurationService } from '../../configuration.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
function nonZeroValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;
    if (isNaN(value) || value === 0) {
      return { 'nonZero': true }; // Validation failed
    }
    return null; // Validation passed
  };
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent extends UnsubscribeOnDestroyAdapter {
  dialogTitle: string;
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  siteId: number;
  kpi: KPIConfigurations;
  sites: CSites[];
  form: FormGroup;
  group: KPIIndicatorGroup[];
  indicator: KPIIndicator[]
  formulaType: formulaType[];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dataService2: CommonService,
    private dataService: ConfigurationService,
    private snackBar: MatSnackBar
  ) {
    super()
    this.getGroup();
    this.getSites();
    this.getFormula();
    this.getIndicator(-1);
    this.dialogTitle = this.data.kpi.measurementTitle ? this.data.kpi.measurementTitle : 'New Configuration'
    this.kpi = { ...this.data.kpi };
    this.siteId = this.data.siteId;
    this.form = this.buildForm();
    this.removeValidators();
  }
  getFormula() {
    this.subs.sink = this.dataService.getFormula(this.user.id).subscribe({
      next: data => {
        this.formulaType = [...data];
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
  }
  getSites() {
    this.subs.sink = this.dataService2.getKPISites(this.user.id, -1, -1).subscribe({
      next: data => {
        this.sites = [...data];
      },
      error: err => { this.showNotification('black', err, 'bottom', 'center') }
    })
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
      infoId: [this.kpi.infoId, [Validators.required]],
      siteId: [this.siteId, [Validators.required]],
      groupId: [this.kpi.groupId, [Validators.required]],
      indicatorId: [this.kpi.indicatorId, [Validators.required]],
      infoWeight: [this.kpi.infoWeight, [Validators.required]],
      factor: [this.kpi.factor, [Validators.required, nonZeroValidator()]],
      unit: [this.kpi.unit, [Validators.required]],
      formulaType: [this.kpi.formulaType, [Validators.required]],
      measurementTitle: [this.kpi.measurementTitle, [Validators.required]],
      annualTargetTitle: [this.kpi.annualTargetTitle, [Validators.required]],
      classificationTitle: [this.kpi.classificationTitle, [Validators.required]],
    })
  }
}
