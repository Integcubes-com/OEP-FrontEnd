import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './equipments/equipments.component';
import { NextOutagesComponent } from './next-outages/next-outages.component';
import { WorkingCalComponent } from './working-cal/working-cal.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ContractOutagesComponent } from './contract-outages/contract-outages.component';
import { Timeline2Component } from './timeline2/timeline2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActualOutagesComponent } from './actual-outages/actual-outages.component';

const routes:Routes = [
  {path:'', redirectTo:'site-equipments', pathMatch:'full'},
  {path:'site-equipments', component:EquipmentsComponent},
  {path:'next-outages', component:NextOutagesComponent},
  {path:'working-calc', component:WorkingCalComponent},
  {path:'timeline', component:TimelineComponent},
  {path:'contract-outages', component:ContractOutagesComponent},
  {path:'timeline2', component:Timeline2Component},
  {path:'dashboard', component:DashboardComponent},
  {path:'actual-outages', component:ActualOutagesComponent},
  {path:'**', component:Page404Component}

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class WorkingHoursRoutingModule { }
