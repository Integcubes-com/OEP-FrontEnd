import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelEquipmentMainComponent } from './model-equipment-main/model-equipment-main.component';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes=[
  {path:'', redirectTo:'site-equipment-main', pathMatch:'full'},
  {path:'site-equipment-main', component:ModelEquipmentMainComponent},
  {path:'**', component:Page404Component}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModelEquipmentRoutingModule { }
