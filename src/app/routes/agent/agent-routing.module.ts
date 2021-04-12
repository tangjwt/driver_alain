import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentComponent } from './agent/agent.component';

const routes: Routes = [
  {
    path: '',
    component: AgentComponent
  },
  {
    path: 'list',
    component: AgentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
