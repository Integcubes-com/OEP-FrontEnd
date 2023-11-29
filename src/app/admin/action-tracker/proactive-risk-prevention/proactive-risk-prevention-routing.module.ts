import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { ProactiveComponent } from './proactive/proactive.component';

const routes:Routes=[
  {path:'', redirectTo:'proactive-risk-prevention', pathMatch:"full"},
  {path:'proactive-risk-prevention', component:ProactiveComponent},
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
export class ProactiveRiskPreventionRoutingModule { }
