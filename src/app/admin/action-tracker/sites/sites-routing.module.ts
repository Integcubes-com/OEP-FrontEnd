import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { SitesMainComponent } from './sites-main/sites-main.component';
const routes:Routes=[
  {path:'', redirectTo:'sites', pathMatch:'full'},
  {path:'sites', component:SitesMainComponent},
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
export class SitesRoutingModule { }
