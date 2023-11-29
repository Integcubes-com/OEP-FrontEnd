import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMitigationComponent } from './add-mitigation/add-mitigation.component';
import { AddActionsComponent } from './add-actions/add-actions.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { SiteControlComponent } from './site-control/site-control.component';

const routes:Routes=[
  {path:'', redirectTo:'add-mitigation', pathMatch:"full"},
  {path:'add-mitigation', component:AddMitigationComponent},
  {path:'add-actions', component:AddActionsComponent},
  {path:'add-programs', component:AddProgramComponent},
  {path:'reviewer', component:ReviewerComponent},
  {path:'site-control', component:SiteControlComponent},
  { path: "**", component: Page404Component },
]

@NgModule({

  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class ModuleRoutingModule { }
