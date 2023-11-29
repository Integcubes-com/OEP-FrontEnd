import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SCountry, SPStatus, SRegion, SSaveData, STech, SUsers, SitesI, UploadData } from '../../sites.model';
import { SitesService } from '../../sites.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CCluster, CCountry, CRegions, CTechnology, CUsers } from 'src/app/shared/common-interface/common-interface';

@Component({
  selector: 'app-sites-form',
  templateUrl: './sites-form.component.html',
  styleUrls: ['./sites-form.component.sass']
})
export class SitesFormComponent extends UnsubscribeOnDestroyAdapter {
  ud = new UploadData();
  clusters:CCluster[];

  siteForm: FormGroup;
  fileList: File[];
  site: SitesI;
  uploadedFileName: any;
  saveObj: SSaveData = {
    sites: new SitesI({}),
    techlogies: []
  }
  users:CUsers[];
  view: Boolean = false;
  edit: Boolean = false;
  formData: FormData;
  dialogTitle: string;
  siteRegions: CRegions[];
  siteCountry: CCountry[];
  siteTechnology: CTechnology[];
  fileName: string;
  siteTechnologyList: CTechnology[];
  file: File;
  siteProjectStatus: SPStatus[];
  constructor
    (
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<SitesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      private dataService: SitesService,
      private snackBar: MatSnackBar
    ) {
    super();
    this.clusters = [...this.data.cluster]

    dialogRef.disableClose = true;
    if (data.action == "edit") {
      this.edit = true;
      this.dialogTitle = data.site.siteName;
      this.site = { ...data.site };
      this.siteTechnologyList = [...this.data.selectedTechnology]
    }
    else if (data.action == "add") {
      this.dialogTitle = "New Site"
      this.site = new SitesI({});
      this.siteTechnologyList = [];
    }
    else if (data.action == "view") {
      this.dialogTitle = data.site.siteName;
      this.site = { ...data.site };
      this.siteTechnologyList = [...this.data.selectedTechnology];
      this.view = true;
    }
    this.siteRegions = [...this.data.siteRegions];
    this.siteCountry = [...this.data.siteCountry];
    this.siteTechnology = [...this.data.siteTechnology];
    this.siteProjectStatus = [...this.data.siteProjectStatus];
    this.users = [...this.data.users]
    this.siteForm = this.buildForm();
    this.removeValidators();
  }
  removeValidators() {
    if (this.view) {
      for (const key in this.siteForm.controls) {
        this.siteForm.get(key).clearValidators();
        this.siteForm.get(key).updateValueAndValidity();
      }
    }
  }
  downloadTilReport() {
    this.subs.sink = this.dataService.tilFile(this.site.siteId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'tilReport.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
      }
    })
  }
  downloadInsuranceReport() {
    this.subs.sink = this.dataService.insuranceFile(this.site.siteId).subscribe({
      next: data => {
        if (data.body.size < 100) {
          this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
        }
        else {
          const url = window.URL.createObjectURL(data.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'insuranceReport.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        }
      },
      error: err => {
        this.showNotification('black', err, 'bottom', 'center');
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
  buildForm(): FormGroup {
    return this.fb.group({
      siteId: [this.site.siteId, [Validators.required]],
      siteName: [this.site.siteName, [Validators.required]],
      insurenceReport: [""],
      tilsReport: [""],
      clusterId: [this.site.clusterId, [Validators.required]],
      countryId: [this.site.countryId, [Validators.required]],
      country: [this.site.country],
      regionId: [this.site.regionId, [Validators.required]],
      region: [this.site.region],
      s4hanaCode: [this.site.s4hanaCode],
      projectName: [this.site.projectName],
      onmName: [this.site.onmName],
      projectCompany: [this.site.projectCompany],
      siteDescription: [this.site.siteDescription],
      projectStatusId: [this.site.projectStatusId],
      projectStatus: [this.site.projectStatus],
      technologyId: [""],
      projectCOD: [this.site.projectCOD],
      onmContractExpiry: [this.site.onmContractExpiry, [Validators.required]],
      insuranceLastReportDate: [this.site.insuranceLastReportDate],
      insuranceNextAuditDate: [this.site.insuranceNextAuditDate],
      sitePGMId: [this.site.sitePGMId],
      sitePGMName: [this.site.sitePGMName],
      insurancePOCId: [this.site.insurancePOCId],
      insurancePOCName: [this.site.insurancePOC],
      tilPOCId: [this.site.tilPOCId],
      tilPOCName: [this.site.tilPOC],
      siteEMOId: [this.site.siteEMOId],
      siteEMOName: [this.site.siteEMO],
      insuranceSummary: [this.site.insuranceSummary],
      tilsSummary: [this.site.tilsSummary],
      uploadFile1: [""],
      uploadFile2: [""],
    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
  submit() {
    if (this.siteForm.valid) {
      this.site.siteId = this.siteForm.value.siteId;
      this.site.siteName = this.siteForm.value.siteName;
      this.site.insurenceReport = this.siteForm.value.insurenceReport;
      this.site.tilsReport = this.siteForm.value.tilsReport;
      this.site.countryId = this.siteForm.value.countryId;
      this.site.country = this.siteCountry.find(a => a.countryId == this.site.countryId)?.countryTitle;
      this.site.regionId = this.siteForm.value.regionId;
      this.site.region = this.siteRegions.find(a => a.regionId == this.site.regionId)?.regionTitle;
      this.site.projectCompany = this.siteForm.value.projectCompany;
      this.site.siteDescription = this.siteForm.value.siteDescription;
      this.site.projectStatusId = this.siteForm.value.projectStatusId;
      this.site.projectStatus = this.siteProjectStatus.find(a => a.projectStatusId == this.site.projectStatusId)?.projectStatusTitle;
      this.site.projectCOD = this.siteForm.value.projectCOD;
      this.site.onmContractExpiry = this.siteForm.value.onmContractExpiry;
      this.site.insuranceLastReportDate = this.siteForm.value.insuranceLastReportDate;
      this.site.insuranceNextAuditDate = this.siteForm.value.insuranceNextAuditDate;
      this.site.sitePGMId = this.siteForm.value.sitePGMId;
      this.site.sitePGMName = this.users.find(a => a.userId == this.site.sitePGMId)?.userName;
      this.site.insurancePOCId = this.siteForm.value.insurancePOCId;
      this.site.insurancePOC = this.users.find(a => a.userId == this.site.insurancePOCId)?.userName;
      this.site.tilPOCId = this.siteForm.value.tilPOCId;
      this.site.tilPOC = this.users.find(a => a.userId == this.site.tilPOCId)?.userName;
      this.site.siteEMOId = this.siteForm.value.siteEMOId;
      this.site.siteEMO = this.users.find(a => a.userId == this.site.siteEMOId)?.userName;
      this.site.insuranceSummary = this.siteForm.value.insuranceSummary;
      this.site.tilsSummary = this.siteForm.value.tilsSummary;
      this.site.s4hanaCode = this.siteForm.value.s4hanaCode;
      this.site.projectName = this.siteForm.value.projectName;
      this.site.onmName = this.siteForm.value.onmName;
         this.site.clusterId = this.siteForm.value.clusterId
         this.site.clusterTitle = this.clusters.find(a=>a.clusterId ==  this.site.clusterId).clusterTitle
         this.saveObj.sites = { ...this.site };
         this.saveObj.techlogies = [...this.siteTechnologyList];
        }
  }
  removeChip(value: any, name: string): void {
    if (name == 'user') {
      const index = this.siteTechnologyList.indexOf(value);
      if (index >= 0) {
        this.siteTechnologyList.splice(index, 1);
      }
    }
  }
  addChip(val: string, name: string) {
    if (val) {
      if (name == 'user') {
        let u = this.siteTechnology.find(a => a.technologyId == +val)
        this.siteTechnologyList.push(u);
        this.siteForm.patchValue({
          technologyId: ""
        })
      }
    }
  }
  handleUpload(event, value) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadedFileName = this.fileName;
      if (value == "tilsReport") {
        this.siteForm.patchValue({
          tilsReport: this.file
        });
      }
      else if (value == "insurenceReport") {
        this.siteForm.patchValue({
          insurenceReport: this.file
        });
      }
    }
  }
}
