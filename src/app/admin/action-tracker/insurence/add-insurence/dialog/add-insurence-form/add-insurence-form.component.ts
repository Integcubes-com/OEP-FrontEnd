import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsurenceRecommendation, IRDocumentType, IRecommendationType, IRInsurenceStatus, IRNomacStatus, IRPriority, IRProactive, IRSource } from '../../insurence.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';

@Component({
  selector: 'app-add-insurence-form',
  templateUrl: './add-insurence-form.component.html',
  styleUrls: ['./add-insurence-form.component.sass'],

})
export class AddInsurenceFormComponent extends UnsubscribeOnDestroyAdapter {
  errorMessage:string;
  file: File;
  dialogTitle: string;
  recommendationForm: FormGroup;
  priorities: IRPriority[];
  nomacStatuss: IRNomacStatus[];
  insurenceStatuss: IRInsurenceStatus[];
  sites: CSites[];
  proactives: IRProactive[];
  regions: CRegions[];
  sources: IRSource[];
  mode: string;
  documents: IRDocumentType[];
  recommendationTypes: IRecommendationType[];
  recommendation: InsurenceRecommendation;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  constructor
    (
      private snackBar: MatSnackBar,
      private dataService: CommonService,
      public dialogRef: MatDialogRef<AddInsurenceFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
    super();
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.recommend.title;
      this.recommendation = { ...this.data.recommend };
      this.mode = 'edit';
    }
    else if (this.data.action == "view") {
      this.dialogTitle = this.data.recommend.title;
      this.recommendation = { ...this.data.recommend };
      this.mode = 'view';
    }
    else if (this.data.action == "add") {
      this.dialogTitle = "New Recommendation";
      this.recommendation = new InsurenceRecommendation({});
      this.mode = 'add';
    }
    this.nomacStatuss = [...data.nomacStatus]
    this.priorities = [...data.priority];
    this.insurenceStatuss = [...data.insurenceStatus];
    this.sites = [...data.site];
    this.proactives = [...data.proactive];
    this.regions = [...data.region];
    this.documents = [...data.documentType];
    this.sources = [...data.source];
    this.recommendationTypes = [...data.recommendationType];
    this.recommendationForm = this.buildForm();
    // if(this.data.action === 'add'){
    //   this.recommendationForm.get('insurenceStatusId').disable();
    // }
    this.recommendationForm.get('nomacStatusId').disable();
    this.recommendationForm.get('targetDate').disable();
    this.recommendationForm.updateValueAndValidity();
    this.removeValidators()
  }
  removeValidators() {
    if (this.data.action == "view") {
      for (const key in this.recommendationForm.controls) {
        this.recommendationForm.get(key).clearValidators();
        this.recommendationForm.get(key).updateValueAndValidity();
      }
    }
  }
  buildForm(): FormGroup {
    return this.fb.group({
      recommendationId: [this.recommendation.recommendationId, [Validators.required]],
      title: [this.recommendation.title],
      insuranceRecommendation: [this.recommendation.insuranceRecommendation],
      referenceNumber: [this.recommendation.referenceNumber],
      priorityId: [this.recommendation.priorityId,],
      priority: [this.recommendation.priorityTitle],
      insurenceStatusId: [this.recommendation.insurenceStatusId],
      insurenceStatus: [this.recommendation.insurenceStatusTitle],
      nomacStatusId: [this.recommendation.nomacStatusId],
      nomacStatus: [this.recommendation.nomacStatusTitle],
      latestStatus: [this.recommendation.latestStatus],
      targetDate: [this.recommendation.targetDate],
      siteUpdates: [this.recommendation.siteUpdates],
      pcComments: [this.recommendation.pcComments],
      type: [this.recommendation.type],
      expectedBudget: [this.recommendation.expectedBudget],
      siteId: [this.recommendation.siteId, [Validators.required]],
      siteTitle: [this.recommendation.title],
      significance: [this.recommendation.significance],
      proactiveId: [this.recommendation.proactiveId],
      proactive: [this.recommendation.proactiveReference],
      regionId: [this.recommendation.regionId, [Validators.required]],
      region: [this.recommendation.regionTitle],
      sourceId: [this.recommendation.sourceId],
      source: [this.recommendation.sourceTitle],
      documentTypeId: [this.recommendation.documentTypeId],
      documentType: [this.recommendation.documentTypeTitle],
      year: [this.recommendation.year],
      recommendationTypeId: [this.recommendation.recommendationTypeId],
      recommendationType: [this.recommendation.recommendationTypeTitle],
      report: [this.recommendation.report],
      reportPath: [""],
      insuranceReport: [""],

    })
  }
  submit() {
    if (this.recommendationForm.valid) {
      this.recommendation.recommendationId = this.recommendationForm.value.recommendationId;
      this.recommendation.title = this.recommendationForm.value.title;
      this.recommendation.insuranceRecommendation = this.recommendationForm.value.insuranceRecommendation;
      this.recommendation.referenceNumber = this.recommendationForm.value.referenceNumber;
      this.recommendation.priorityId = this.recommendationForm.value.priorityId;
      this.recommendation.priorityTitle = this.priorities.find(data => data.priorityId == this.recommendation.priorityId)?.priorityTitle;
      this.recommendation.latestStatus = this.recommendationForm.value.latestStatus;
      this.recommendation.targetDate = this.recommendation.targetDate;
      this.recommendation.siteUpdates = this.recommendationForm.value.siteUpdates;
      this.recommendation.pcComments = this.recommendationForm.value.pcComments;
      this.recommendation.type = this.recommendationForm.value.type;
      this.recommendation.expectedBudget = this.recommendationForm.value.expectedBudget;
      this.recommendation.siteId = this.recommendationForm.value.siteId;
      this.recommendation.siteTitle = this.sites.find(data => data.siteId == this.recommendation.siteId)?.siteTitle;
      this.recommendation.significance = this.recommendationForm.value.significance;

      this.recommendation.proactiveId = this.recommendationForm.value.proactiveId;
      this.recommendation.proactiveTitle = this.proactives.find(data => data.proactiveId == this.recommendation.proactiveId)?.proactivetitle;
      this.recommendation.proactiveReference = this.proactives.find(data => data.proactiveId == this.recommendation.proactiveId)?.proactiveReference;

      this.recommendation.regionId = this.recommendationForm.value.regionId;
      this.recommendation.regionTitle = this.regions.find(data => data.regionId == this.recommendation.regionId)?.regionTitle;

      this.recommendation.sourceId = this.recommendationForm.value.sourceId;
      this.recommendation.sourceTitle = this.sources.find(data => data.sourceId == this.recommendation.sourceId)?.sourceTitle;

      this.recommendation.documentTypeId = this.recommendationForm.value.documentTypeId;
      this.recommendation.documentTypeTitle = this.documents.find(data => data.documentId == this.recommendation.documentTypeId)?.documnetTitle;
      this.recommendation.report = this.recommendationForm.value.report;
      this.recommendation.year = this.recommendationForm.value.year;

      this.recommendation.recommendationTypeId = this.recommendationForm.value.recommendationTypeId;
      this.recommendation.recommendationTypeTitle = this.recommendationTypes.find(data => data.typeId == this.recommendation.recommendationTypeId)?.typeTitle;


      this.recommendation.insuranceReport = this.recommendationForm.value.insuranceReport;
      if (this.data.action != "add") {
        this.recommendation.insurenceStatusId = this.recommendationForm.value.insurenceStatusId;
        this.recommendation.nomacStatusId = this.recommendationForm.value.nomacStatusId;
      }
      this.recommendation.insurenceStatusTitle = this.insurenceStatuss.find(data => data.insurenceStatusId == this.recommendation.insurenceStatusId)?.insurenceStatusTitle;
      this.recommendation.nomacStatusTitle = this.nomacStatuss.find(data => data.nomacStatusId == this.recommendation.nomacStatusId)?.nomacStatusTitle;
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // downloadReport() {
  //   this.subs.sink = this.dataService.downloadReport(this.recommendation.recommendationId).subscribe({
  //     next: data => {
  //       debugger;
  //       if (data.body.size < 100) {
  //         this.showNotification('snackbar-info', "No file attached with the form", 'bottom', 'center');
  //       }
  //       else {
  //         const url = window.URL.createObjectURL(data.body);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'insuranceReport.pdf';
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       }

  //     },
  //     error: err => {
  //       this.showNotification('black', err, 'bottom', 'center');
  //     }
  //   })
  // }
  handleUpload(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.recommendationForm.patchValue({
        insuranceReport: this.file
      });
    }
  }
  getSites(regionId:number){
    this.subs.sink = this.dataService.getUpdatedSites(this.user.id,regionId,-1,-1).subscribe({
      next:data=>{this.sites = [...data]},
      error:err=>{this.errorMessage = err; this.showNotification('black', err, 'bottom', 'center')}
    })
  }
}
