import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes:Routes = [
  {path:"", redirectTo:"userprofile", pathMatch:"full"},
  {path:"userprofile", component: UserProfileComponent},
  {path:"**", component:Page404Component}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class ProfileRoutingModule { }
