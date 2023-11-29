import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiteEquipmentMainComponent } from './site-equipment-main/site-equipment-main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes=[
  {path:'', redirectTo:'site-equipment-main', pathMatch:'full'},
  {path:'site-equipment-main', component:SiteEquipmentMainComponent},
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
export class SiteEquipmentRoutingModule { }
