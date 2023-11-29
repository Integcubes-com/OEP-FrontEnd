import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegionMainComponent } from './region-main/region-main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes=[
  {path:'', redirectTo:'regions', pathMatch:"full"},
  {path:'regions', component:RegionMainComponent},
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
export class RegionsRoutingModule { }
