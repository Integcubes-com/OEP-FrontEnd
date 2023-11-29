import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SiteNextOutagesMainComponent } from './site-next-outages-main/site-next-outages-main.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes: Routes = [
  {
    path: "", redirectTo: 'site-next-outages', pathMatch: 'full'
  },
  { path: "site-next-outages", component: SiteNextOutagesMainComponent },
  { path: "**", component: Page404Component }
]

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
RouterModule
  ],
})
export class SiteNextOutagesRoutingModule { }
