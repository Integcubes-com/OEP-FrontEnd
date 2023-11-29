import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TilEvaluationComponent } from './til-evaluation/til-evaluation.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes=[
  {
    path:'', redirectTo:'til-evaluation', pathMatch:'full'
  },
  {
    path:'til-evaluation', component:TilEvaluationComponent
  },
  {
    path:'**', component:Page404Component
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ReviewerRoutingModule { }
