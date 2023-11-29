import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { InsuranceRecommendationComponent } from './insurance-recommendation/insurance-recommendation.component';
import { InsuranceTrackerComponent } from './insurance-tracker/insurance-tracker.component';
import { TilsTrackerComponent } from './tils-tracker/tils-tracker.component';
import { TilsComponent } from './tils/tils.component';
import { SiteEquipmentComponent } from './site-equipment/site-equipment.component';

const routes:Routes=[
  {path:'', redirectTo:'insurance-recommendation', pathMatch:'full'},
  {path:'insurance-recommendation', component:InsuranceRecommendationComponent},
  {path:'insurance-tracker', component:InsuranceTrackerComponent},
  {path:'tils', component:TilsComponent},
  {path:'tils-tracker', component:TilsTrackerComponent},
  {path:'site-equipment', component:SiteEquipmentComponent},

  {path:'**', component:Page404Component}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ReportsRoutingModule { }
