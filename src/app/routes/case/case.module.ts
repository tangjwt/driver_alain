import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { RunModule } from '../run/run.module';
import { CaseRoutingModule } from './case-routing.module';
import { DebugComponent } from './debug/debug.component';
import { DebugLayoutComponent } from './debug-layout/debug-layout.component';

@NgModule({
  declarations: [
    DebugComponent,
    DebugLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CaseRoutingModule,
    RunModule
  ],
  exports: [
    DebugComponent
  ]
})
export class CaseModule { }
