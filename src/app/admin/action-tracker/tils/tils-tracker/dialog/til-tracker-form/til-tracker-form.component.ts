import { Component, ElementRef, Inject, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TILs } from '../../../add-tils/add-tils.model';
import { TilsFormComponent } from '../../../add-tils/dialog/tils-form/tils-form.component';
import { TilActionPackage, TAPEquipment, TAPPriority, TAPBudgetSource, TAPReviewStatus, TAPActionClosure, TAPOutage, TASubmitObj } from '../../tils-tracker-assignment.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TilsTrackerService } from '../../tils-tracker.service';
import { User } from 'src/app/core/models/user';
import { CRegions, CSites } from 'src/app/shared/common-interface/common-interface';
import { CommonService } from 'src/app/shared/common-service/common.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-til-tracker-form',
  templateUrl: './til-tracker-form.component.html',
  styleUrls: ['./til-tracker-form.component.sass']
})
export class TilTrackerFormComponent extends UnsubscribeOnDestroyAdapter {
  @ViewChild('teamMembersPanelOrigin') private _teamMembersPanelOrigin: ElementRef;
  @ViewChild('teamMembersPanel') private _teamMembersPanel: TemplateRef<any>;
  dialogTitle: string = '';

  actionForm: FormGroup;

  tils: TILs[];
  submitObject: TASubmitObj = {
    action: new TilActionPackage({}),
    // user: [],
    equipment: []
  }
  view: Boolean = false;
  //Get data from browsers Local Storage
  user: User = JSON.parse(localStorage.getItem('currentUser'));
  userList: any[];
  actionPackage: TilActionPackage;
  equipments: TAPEquipment[];
  equipmentList: TAPEquipment[];
  prioritys: TAPPriority[];
  selectedEq: TAPEquipment[];
  sites: CSites[];
  regions: CRegions[];
  // apiUsers: TAPUser[]
  budgetSources: TAPBudgetSource[]
  reviewStatuss: TAPReviewStatus[]
  actionClosure: TAPActionClosure[]
  outages: TAPOutage[]
  private _teamMembersPanelOverlayRef: OverlayRef;

  constructor
    (
      private _viewContainerRef: ViewContainerRef,

      private _overlay: Overlay,
      private dataService: TilsTrackerService,
      private dataService2: CommonService,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<TilsFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
    super();
    if (this.data.action == "edit") {
      this.dialogTitle = this.data.actionPacakage.actionTitle;
      this.actionPackage = { ...this.data.actionPacakage };
      // if (this.data.actionUsers) {
      //   this.userList = [...this.data.actionUsers];
      // }
      if (this.data.actionEquipment) {
        this.equipmentList = [...this.data.actionEquipment];
      }
    }
    else if (this.data.action == "view") {
      this.view = true;
      this.dialogTitle = this.data.actionPacakage.actionTitle;
      this.actionPackage = { ...this.data.actionPacakage };
      // if (this.data.actionUsers) {
      //   this.userList = [...this.data.actionUsers];
      // }
      if (this.data.actionEquipment) {
        this.equipmentList = [...this.data.actionEquipment];
      }
    }
    else if (this.data.action == "add") {
      this.dialogTitle = "New Recommendation";
      this.actionPackage = new TilActionPackage({});
      this.equipmentList = [];
    }
    this.submitObject.action = { ...this.actionPackage }
    this.tils = [...data.tils]
    this.equipments = [...data.equipments];
    debugger;
    this.selectedEq = this.equipments;

    this.prioritys = [...data.prioritys];
    this.sites = [...data.sites];
    let site : CSites={
      regionId: 0,
      regionTitle: '',
      siteId: -11,
      siteTitle: 'Group',
      isSelected: false
    }
    this.sites.push(site)
    this.regions = [...data.regions];
    this.budgetSources = [...data.budgetSources];
    this.reviewStatuss = [...data.reviewStatuss];
    this.actionClosure = [...data.actionClosure];
    this.outages = [...data.outages]
    this.actionForm = this.buildForm();
    this.removeValidators();
  }
  changeSelection(checked: boolean, site: any) {
    if (checked) {
      let eq = this.equipments.filter(a => a.siteId === site.siteId);
      eq.forEach(item => {
        if (item.isGroup === 1) {
          let arr = item.groupedEquipments?.split(',');
          if (arr) {
            arr.forEach(element => {
              let equis = this.equipments.find(a => a.equipmentId === +element);
              if (equis && !this.equipmentList.includes(equis)) {
                this.equipmentList.push(equis);
              }
            });
          }
        }
        else if (!this.equipmentList.includes(item)) {
          this.equipmentList.push(item);
        }
      });
    } else {
      this.equipmentList = this.equipmentList.filter(item => item.siteId !== site.siteId);
    }
  }
  
  removeValidators() {
    if (this.view) {
      for (const key in this.actionForm.controls) {
        this.actionForm.get(key).clearValidators();
        this.actionForm.get(key).updateValueAndValidity();
      }
    }
  }
  toggleTeamMembersSelection(checked: boolean,eq:TAPEquipment){
      if(eq.isGroup == 1){
        let arr = eq.groupedEquipments?.split(',');
        arr.forEach(element => {
         let equis = this.equipments.find(a=>a.equipmentId == +element)
         let index = this.equipmentList.findIndex(a => a.equipmentId == equis.equipmentId);
         if (index > -1) {
           this.equipmentList.splice(index, 1);
         }
         else {
           this.equipmentList.push(equis);
         }
        });
      }
      else {
        let index = this.equipmentList.findIndex(a => a.equipmentId == eq.equipmentId);
        if (index > -1) {
          this.equipmentList.splice(index, 1);
        }
        else {
          this.equipmentList.push(eq);
        }
      }
    
  }
  checkerSites(site:any):boolean{
    return this.equipmentList.some(a=>a.siteId == site.siteId)
  }
  checker(eq:TAPEquipment):boolean{
    return this.equipmentList.some(a=>a.equipmentId == eq.equipmentId)
  }
  buildForm(): FormGroup {
    return this.fb.group({
      packageId: [this.actionPackage.packageId, [Validators.required]],
      tilId: [this.actionPackage.tilId, [Validators.required]],
      tilNumber: [this.actionPackage.tilNumber],
      // regionId:[this.actionPackage.regionId, [Validators.required]],
      // regionTitle:[this.actionPackage.regionTitle],
      // siteId: [this.actionPackage.siteId, [Validators.required]],
      // siteTitle:[this.actionPackage.siteTitle],
      equipmentIds: [""],
      actionTitle: [this.actionPackage.actionTitle, [Validators.required]],
      actionClosureGuidelinesId: [this.actionPackage.actionClosureGuidelinesId],
      actionClosureGuidelinesTitle: [this.actionPackage.actionCategory],
      unitStatusId: [this.actionPackage.outageId],
      unitStatusTitle: [this.actionPackage.unitStatus],
      actionDescription: [this.actionPackage.actionDescription],
      expectedBudget: [this.actionPackage.expectedBudget],
      budgetSourceId: [this.actionPackage.budgetSourceId],
      budgetSourceTitle: [this.actionPackage.budegetSource],
      patComments: [this.actionPackage.patComments],
      // attachmentId: [this.actionPackage.attachmentId],
      // siteEquipmentIds: [this.actionPackage.siteEquipmentIds,],
      priorityId: [this.actionPackage.priorityId],
      priorityTitle: [this.actionPackage.priorityTitle],
      // recurrence: [this.actionPackage.recurrence, [Validators.required]],
      reviewStatusId: [this.actionPackage.reviewStatusId],
      reviewStatus: [this.actionPackage.reviewStatus],
    })
  }
  getEq(event: number) {
    if (event) {
      let regionId = +event
      this.subs.sink = this.dataService.getEq(regionId, this.user.id).subscribe({
        next: data => { this.selectedEq = [...data] },
        error: err => { this.showNotification('black', err, 'bottom', 'center'); }
      })
    }
  }
  getSites(event: number) {
    if (event) {
      let regionId = +event
      this.subs.sink = this.dataService2.getSites(this.user.id, regionId, -1).subscribe({
        next: data => { this.sites = [...data] },
        error: err => { this.showNotification('black', err, 'bottom', 'center'); }
      })
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
  submit() {
    // this.submitObject.user = [...this.userList];
    this.submitObject.equipment = [...this.equipmentList];
    this.submitObject.action.packageId = this.actionForm.value.packageId;
    this.submitObject.action.tilId = this.actionForm.value.tilId;
    this.submitObject.action.tilNumber = this.tils.find(a => a.tilId == this.submitObject.action.tilId)?.tilNumber
    this.submitObject.action.actionTitle = this.actionForm.value.actionTitle;
    this.submitObject.action.actionClosureGuidelinesId = this.actionForm.value.actionClosureGuidelinesId;
    this.submitObject.action.actionCategory = this.actionClosure.find(a => a.acId == this.submitObject.action.actionClosureGuidelinesId)?.title
    this.submitObject.action.outageId = this.actionForm.value.unitStatusId
    this.submitObject.action.unitStatus = this.outages.find(a => a.outageTypeId == this.submitObject.action.outageId)?.title
    this.submitObject.action.actionDescription = this.actionForm.value.actionDescription;
    this.submitObject.action.expectedBudget = this.actionForm.value.expectedBudget;
    this.submitObject.action.budgetSourceId = this.actionForm.value.budgetSourceId;
    this.submitObject.action.budegetSource = this.budgetSources.find(a => a.budgetSourceId == this.submitObject.action.budgetSourceId)?.budgetSourceTitle
    this.submitObject.action.patComments = this.actionForm.value.patComments;
    // this.submitObject.action.attachmentId = this.actionForm.value.attachmentId;
    // this.submitObject.action.siteEquipmentIds = this.actionForm.value.siteEquipmentIds;
    this.submitObject.action.priorityId = this.actionForm.value.priorityId;
    this.submitObject.action.priorityTitle = this.prioritys.find(a => a.priorityId == this.submitObject.action.priorityId)?.priorityTitle
    // this.submitObject.action.recurrence = this.actionForm.value.recurrence;
    this.submitObject.action.reviewStatusId = this.actionForm.value.reviewStatusId;
    this.submitObject.action.reviewStatus = this.reviewStatuss.find(a => a.reviewStatusId == this.submitObject.action.reviewStatusId)?.reviewStatusTitle
    // this.submitObject.action.regionId = this.actionForm.value.regionId;
    // this.submitObject.action.regionTitle = this.regions.find(r=>r.regionId == this.submitObject.action.regionId)?.regionTitle
    // this.submitObject.action.siteId = this.actionForm.value.siteId;
    // this.submitObject.action.siteTitle = this.sites.find(r=>r.siteId == this.submitObject.action.siteId)?.siteTitle

  }
  removeChip(value: any, name: string): void {

    // if (name == 'user') {
    //   const index = this.userList.indexOf(value);
    //   if (index >= 0) {
    //     this.userList.splice(index, 1);
    //   }
    // }
    if (name == 'equipment') {
      const index = this.equipmentList.indexOf(value);
      if (index >= 0) {
        this.equipmentList.splice(index, 1);
      }
    }


  }
  addChip(val: string, name: string) {
    if (val) {
      // if (name == 'user') {
      //   let u = this.apiUsers.find(a => a.userId == +val)
      //   this.userList.push(u);
      //   this.actionForm.patchValue({
      //     userId: ""
      //   })
      // }
      if (name == 'equipment') {
        let u = this.equipments.find(a => a.equipmentId == +val)
        this.equipmentList.push(u);
        this.actionForm.patchValue({
          equipmentIds: ""
        })
      }
    }
  }
  openTeamMembersPanel() {
    this._teamMembersPanelOverlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._teamMembersPanelOrigin.nativeElement)
        .withFlexibleDimensions(true)
        .withViewportMargin(64)
        .withLockedPosition(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          }
        ])
    });
    this._teamMembersPanelOverlayRef.attachments().subscribe(() => {
      this._teamMembersPanelOverlayRef.overlayElement.querySelector('input').focus();
    });
    const templatePortal = new TemplatePortal(this._teamMembersPanel, this._viewContainerRef);
    this._teamMembersPanelOverlayRef.attach(templatePortal);
    this._teamMembersPanelOverlayRef.backdropClick().subscribe(() => {
      if (this._teamMembersPanelOverlayRef && this._teamMembersPanelOverlayRef.hasAttached()) {
        this._teamMembersPanelOverlayRef.detach();

        // Reset the teamMembers filter
        // this.filteredTeamMembers = this.selectedTeamMembers;
      }

      if (templatePortal && templatePortal.isAttached) {
        templatePortal.detach();
      }
    });
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  filterTeamMembers(event) {
    const value = (event.target.value || '').toLowerCase(); // Handle null or undefined case
    if (!this.equipments) {
        return; // Handle case where this.equipments is not defined
    }
    this.selectedEq = this.equipments.filter(tag => 
        tag.unit && tag.unit.toLowerCase().includes(value)
    );
}
}
