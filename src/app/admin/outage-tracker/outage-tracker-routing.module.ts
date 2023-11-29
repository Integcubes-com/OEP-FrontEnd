import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { OutageReadinessComponent } from './outage-readiness/outage-readiness.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { TrackOutagesComponent } from './track-outages/track-outages.component';
import { NextOutagesComponent } from './next-outages/next-outages.component';
import { SiteEquipmentsComponent } from './site-equipments/site-equipments.component';
import { ActionRolesComponent } from './action-roles/action-roles.component';
import { RegionsComponent } from './regions/regions.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes : Routes = [
  {path:'', redirectTo:'outage-readiness',pathMatch:'full'},
  {path:'outage-readiness', component:OutageReadinessComponent},
  {path:'next-outages', component:NextOutagesComponent},
  {path:'site-equipments', component:SiteEquipmentsComponent},
  {path:'track-outages', component:TrackOutagesComponent},
  {path:'action-roles', component:ActionRolesComponent},
  {path:'regions', component:RegionsComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**', component:Page404Component},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class OutageTrackerRoutingModule { }
