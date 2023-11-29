import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddInsurenceComponent } from './add-insurence/add-insurence.component';
import { InsurenceTrackerComponent } from './insurence-tracker/insurence-tracker.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes=[
  {path:'', redirectTo:'add-insurence', pathMatch:'full'},
  {path:'add-insurence', component:AddInsurenceComponent},
  {path:'insurence-tracker', component:InsurenceTrackerComponent},
  {path:'**', component:Page404Component}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class InsurenceRoutingModule { }
