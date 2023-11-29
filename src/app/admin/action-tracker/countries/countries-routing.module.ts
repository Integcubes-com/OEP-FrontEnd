import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddCountriesComponent } from './add-countries/add-countries.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes = [
  {path:'', redirectTo:'countries', pathMatch:'full'},
  {path:'countries', component:AddCountriesComponent},
  {path:'**', component:Page404Component}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CountriesRoutingModule { }
