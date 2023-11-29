import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PowerBiComponent } from './power-bi/power-bi.component';

const routes :Routes = [{
path:"", redirectTo:"power-bi", pathMatch:'full'
},
{
  path:"power-bi", component:PowerBiComponent
}]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PowerBiDashboardRoutingModule { }
