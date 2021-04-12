import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { AgentComponent } from './agent/agent.component';

import { AgentRoutingModule } from './agent-routing.module';


@NgModule({
  declarations: [
    AgentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
