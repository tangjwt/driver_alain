import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  
})
export class DashboardModule { }
