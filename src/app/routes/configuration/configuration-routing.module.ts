import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';
import { TagsComponent } from './tags/tags.component';
import { EnvironmentComponent } from './environment/environment.component';
import { ScriptComponent } from './script/script.component';
import { EnvUrlComponent } from './env-url/env-url.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent
  },
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'tag',
    component: TagsComponent
  },
  {
    path: 'env',
    component: EnvironmentComponent
  },
  {
    path: 'script',
    component: ScriptComponent
  },
  {
    path: 'url',
    component: EnvUrlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
