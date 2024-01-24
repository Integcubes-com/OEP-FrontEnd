import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
  [{
    path: 'reviewer',
    loadChildren: () => import('./reviewer/reviewer.module').then((m) => m.ReviewerModule)
  },
  {
    path: 'regions',
    loadChildren: () => import('./regions/regions.module').then((m) => m.RegionsModule)
  },
  {
    path: 'sites',
    loadChildren: () => import('./sites/sites.module').then((m) => m.SitesModule)
  },
  {
    path: 'track-actions',
    loadChildren: () => import('./end-user/end-user.module').then((m) => m.EndUserModule)
  },
  { path: 'tils', loadChildren: () => import('./tils/tils.module').then((m) => m.TilsModule) },
  { path: 'insurence', loadChildren: () => import('./insurence/insurence.module').then((m) => m.InsurenceModule) },
  { path: 'site-equipment', loadChildren: () => import('./site-equipment/site-equipment.module').then((m) => m.SiteEquipmentModule) },
  { path: 'application', loadChildren: () => import('./application/application.module').then((m) => m.ApplicationModule) },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule) },
  { path: 'site-next-outages', loadChildren: () => import('./sites-next-outages/sites-next-outages.module').then((m) => m.SitesNextOutagesModule) },
  {
    path:'poc-access-control',
    loadChildren:()=>
    import('./poc-access-control/poc-access-control.module').then((m)=>m.PocAccessControlModule)
  },
  {
    path:'countries',
    loadChildren:()=>
    import('./countries/countries.module').then((m)=>m.CountriesModule)
  },
  {
    path:'power-bi-dashboard',
    loadChildren:()=>
    import('./power-bi-dashboard/power-bi-dashboard.module').then((m)=>m.PowerBiDashboardModule)
  },
  {
    path:'cluster',
    loadChildren:()=>
    import('./cluster/cluster.module').then((m)=>m.ClusterModule)
  },
  {
    path:'proactive-risk-prevention',
    loadChildren:()=>
    import('./proactive-risk-prevention/proactive-risk-prevention.module').then((m)=>m.ProactiveRiskPreventionModule)
  },
  {
    path:'model-equipment',
    loadChildren:()=>
    import('./model-equipment/model-equipment.module').then((m)=>m.ModelEquipmentModule)
  },

  ]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ActionTrackerRoutingModule { }
