import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';
import { TagsComponent } from './tags/tags.component';
import { EnvironmentComponent } from './environment/environment.component';
import { ScriptComponent } from './script/script.component';
import { EnvUrlComponent } from './env-url/env-url.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule
  ],
  declarations: [
    ProjectComponent,
    ServiceComponent,
    TagsComponent,
    EnvironmentComponent,
    ScriptComponent,
    EnvUrlComponent,
    AgentComponent
  ],
  providers: [
  ]
})
export class ConfigurationModule { }
