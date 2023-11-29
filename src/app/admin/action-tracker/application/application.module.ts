import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RoleFormComponent } from './role/dialog/role-form/role-form.component';
import { RoleDeleteComponent } from './role/dialog/role-delete/role-delete.component';
import { RoleTrashComponent } from './role/dialog/role-trash/role-trash.component';
import { MatListModule } from '@angular/material/list';
import { AddUserFormComponent } from './user/dialog/add-user-form/add-user-form.component';
import { DeleteUserComponent } from './user/dialog/delete-user/delete-user.component';
import { UserTrashComponent } from './user/dialog/user-trash/user-trash.component';



@NgModule({
  declarations: [
    RoleComponent,
    UserComponent,
    RoleFormComponent,
    RoleDeleteComponent,
    RoleTrashComponent,
    AddUserFormComponent,
    DeleteUserComponent,
    UserTrashComponent,
  ],
  imports: [
    MatChipsModule,
    MatMenuModule,
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    ComponentsModule,
    SharedModule,
    MatListModule,
    MatTableModule
  ]
})
export class ApplicationModule { }
