import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyKpiComponent } from './monthly-kpi/monthly-kpi.component';
import { AssignGroupComponent } from './assign-group/assign-group.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';

const routes:Routes = [
  {path:"", redirectTo:"", pathMatch:'full'},
  {path:"monthly", component:MonthlyKpiComponent},
  {path:"assign-group", component:AssignGroupComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"configuration", component:ConfigurationComponent},
  {path:"**", component:Page404Component}
]

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class KpiRoutingModule { }
