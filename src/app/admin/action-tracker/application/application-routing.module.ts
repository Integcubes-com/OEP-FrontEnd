import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { UserComponent } from './user/user.component';

const routes : Routes = [
  {path:'',redirectTo:'roles', pathMatch:'full'},
  {path:'roles', component:RoleComponent},
  {path:'users', component:UserComponent},
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
export class ApplicationRoutingModule { }
