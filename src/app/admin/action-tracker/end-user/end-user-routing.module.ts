import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EndUserTilComponent } from './end-user-til/end-user-til.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { EndUserInsurenceComponent } from './end-user-insurence/end-user-insurence.component';

const routes:Routes=[

  {path:'', redirectTo:'end-user-til-track', pathMatch:'full'},
  {path:'til-track', component:EndUserTilComponent},
  {path:'insurence-track', component:EndUserInsurenceComponent},
  {path:'**', component:Page404Component},

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class EndUserRoutingModule { }
