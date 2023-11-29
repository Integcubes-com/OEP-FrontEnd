import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TilAccessComponent } from './til-access/til-access.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { InsuranceAccessComponent } from './insurance-access/insurance-access.component';

const routes : Routes =[
{path:"", redirectTo:"tils", pathMatch:"full"},
{path:"tils", component: TilAccessComponent},
{path:"insurance", component: InsuranceAccessComponent},
{path:"**", component:Page404Component},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})
export class PocAccessControlRoutingModule { }
