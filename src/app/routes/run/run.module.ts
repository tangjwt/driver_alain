import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';

import { RunRoutingModule } from './run-routing.module';
import { RunSetListComponent } from './run-result/run-set-list/run-set-list.component';
import { RunSetDetailComponent } from './run-result/run-set-detail/run-set-detail.component';
import { TaskListComponent } from './run-task/task-list/task-list.component';
import { RunSetStatisticComponent } from './run-result/run-set-statistic/run-set-statistic.component';
import { RunSetStatisticCompareComponent } from './run-result/run-set-statistic-compare/run-set-statistic-compare.component';
import { dataComponent } from './run-result/result-list/result-list.component';
import { ResultDetailComponent } from './run-result/result-detail/result-detail.component';
import { RunComponent } from './run/run.component';
import { TaskAddOrModifyComponent } from './run-task/task-add-or-modify/task-add-or-modify.component';
import { TreeviewModule } from 'ngx-treeview';
import { ResultDetailCompareComponent } from './run-result/result-detail-compare/result-detail-compare.component';


@NgModule({
  declarations: [
    RunSetListComponent,
    RunSetDetailComponent,
    TaskListComponent,
    RunSetStatisticComponent,
    RunSetStatisticCompareComponent,
    dataComponent,
    ResultDetailComponent,
    RunComponent,
    TaskAddOrModifyComponent,
    ResultDetailCompareComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TreeviewModule.forRoot(),
    RunRoutingModule
  ],
  exports: [
    ResultDetailComponent
  ]
})
export class RunModule { }
