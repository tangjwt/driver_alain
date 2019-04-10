import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ProgressPipe } from '../../common/progress.pipe';

import { RunRoutingModule } from './run-routing.module';
import { RunSetListComponent } from './run-result/run-set-list/run-set-list.component';
import { RunSetDetailComponent } from './run-result/run-set-detail/run-set-detail.component';
import { TaskListComponent } from './run-task/task-list/task-list.component';

@NgModule({
  declarations: [
    RunSetListComponent,
    RunSetDetailComponent,
    TaskListComponent,
    ProgressPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RunRoutingModule
  ]
})
export class RunModule { }
