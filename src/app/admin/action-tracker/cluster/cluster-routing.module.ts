import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClusterMainComponent } from './cluster-main/cluster-main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes = [
  {path:'', redirectTo:'cluster', pathMatch:'full'},
  {path:'cluster', component:ClusterMainComponent},
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
export class ClusterRoutingModule { }
