import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTilsComponent } from './add-tils/add-tils.component';
import { TilsTrackerComponent } from './tils-tracker/tils-tracker.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AssignTilComponent } from './tils-tracker/assign-til/assign-til.component';

const routes:Routes=[
  {path:'', redirectTo:'add-tils', pathMatch:'full'},
  {path:'add-tils', component:AddTilsComponent},
  {path:'til-tracker', component:TilsTrackerComponent},
  {path:'til-tracker/:id', component:AssignTilComponent},
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
export class TilsRoutingModule { }
