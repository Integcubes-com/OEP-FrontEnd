import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndUserTilComponent } from './end-user-til/end-user-til.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { EndUserInsurenceComponent } from './end-user-insurence/end-user-insurence.component';
import { ReviewTilComponent } from './review-til/review-til.component';
import { ReviewInsuranceComponent } from './review-insurance/review-insurance.component';

const routes:Routes=[

  {path:'', redirectTo:'end-user-til-track', pathMatch:'full'},
  {path:'til-track', component:EndUserTilComponent},
  {path:'insurence-track', component:EndUserInsurenceComponent},
  {path:'tils-review', component:ReviewTilComponent},
  {path:'insurence-review', component:ReviewInsuranceComponent},
  {path:'**', component:Page404Component},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class EndUserRoutingModule { }
