import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManageService } from './project-manage.service';
import { AgentManageService } from './agent-manage.service';
import { EnvManageService } from './env-manage.service';
import { EnvUrlManageService } from "./env-url-manage.service";
import { RunService } from "./run.service";
import { TagManageService } from './tag-manage.service';
import { SerManageService } from './ser-manage.service';
import { ScriptManageService } from './script-manage.service';
import { TaskManageService } from './task-manage.service';
import { RunResultService } from './run-result.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectManageService,
    EnvManageService,
    EnvUrlManageService,
    RunService,
    TagManageService,
    SerManageService,
    ScriptManageService,
    TaskManageService,
    RunResultService,
    AgentManageService
  ]
})
export class ServicesModule { }
