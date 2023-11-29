import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { ObservationComponent } from './observation/observation.component';
import { ReportComponent } from './report/report.component';
import { ObservationActionComponent } from './observation/observation-action/observation-action.component';
import { LatestStatusComponent } from './latest-status/latest-status.component';
import { DocumentsComponent } from './documents/documents.component';

const routes:Routes=[
  {path:'', redirectTo:'observation', pathMatch:'full'},
  {path:'observation', component:ObservationComponent},
  {path:'observation/:id', component:ObservationActionComponent},
  {path:'action', component:ActionComponent},
  {path:'report', component:ReportComponent},
  {path:'latest-status', component:LatestStatusComponent},
  {path:'documents', component:DocumentsComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ChemistryActionPlanRoutingModule { }
