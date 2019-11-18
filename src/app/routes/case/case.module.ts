import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { RunModule } from '../run/run.module';
import { CaseRoutingModule } from './case-routing.module';
import { DebugComponent } from './debug/debug.component';
import { DebugLayoutComponent } from './debug-layout/debug-layout.component';
import { CaseListComponent } from './manage/case-list/case-list.component';

@NgModule({
  declarations: [
    DebugComponent,
    DebugLayoutComponent,
    CaseListComponent
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
