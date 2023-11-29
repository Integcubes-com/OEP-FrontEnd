import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path:'profile',
    loadChildren:()=>
    import('./profile/profile.module').then((m)=>m.ProfileModule)
  },
  {
    path:'action-tracker',
    loadChildren:()=>
    import('./action-tracker/action-tracker.module').then((m)=>m.ActionTrackerModule)
  },
  {
    path:'chemistry-action-plan',
    loadChildren:()=>
    import('./chemistry-action-plan/chemistry-action-plan.module').then((m)=>m.ChemistryActionPlanModule)
  },
  {
    path:'mitigation-action-plan',
    loadChildren:()=>
    import('./mitigation-action-plan/mitigation-action-plan.module').then((m)=>m.MitigationActionPlanModule)
  },
  {
    path:'kpi',
    loadChildren:()=>
    import('./kpi/kpi.module').then((m)=>m.KpiModule)
  },
  {
    path:'outage-tracker',
    loadChildren:()=>
    import('./outage-tracker/outage-tracker.module').then((m)=>m.OutageTrackerModule)
  },
  {
    path:'working-hours',
    loadChildren:()=>
    import('./working-hours/working-hours.module').then((m)=>m.WorkingHoursModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
