import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBiComponent } from './power-bi/power-bi.component';
import { PowerBiDashboardRoutingModule } from './power-bi-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ExtraPagesRoutingModule } from 'src/app/extra-pages/extra-pages-routing.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    PowerBiComponent
  ],
  imports: [
    CommonModule,
    PowerBiDashboardRoutingModule,
    CommonModule,
    ExtraPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ComponentsModule,
  ]
})
export class PowerBiDashboardModule { }
