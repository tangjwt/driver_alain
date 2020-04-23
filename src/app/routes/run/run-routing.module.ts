import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunSetListComponent } from './run-result/run-set-list/run-set-list.component';
import { RunSetDetailComponent } from './run-result/run-set-detail/run-set-detail.component';
import { RunSetStatisticComponent } from './run-result/run-set-statistic/run-set-statistic.component';
import { RunSetStatisticCompareComponent } from './run-result/run-set-statistic-compare/run-set-statistic-compare.component';
import { dataComponent } from './run-result/result-list/result-list.component';
import { ResultDetailComponent } from './run-result/result-detail/result-detail.component';
import { RunComponent } from './run/run.component';
import { TaskListComponent } from './run-task/task-list/task-list.component';
import { TaskAddOrModifyComponent } from './run-task/task-add-or-modify/task-add-or-modify.component';
import { ResultDetailCompareComponent } from './run-result/result-detail-compare/result-detail-compare.component';

const routes: Routes = [
  {
    path: '',
    component: RunSetListComponent
  },
  {
    path: 'result',
    component: RunSetListComponent
  },
  {
    path: 'result/:id',
    component: RunSetListComponent
  },
  {
    path: 'result/detail/:id',
    component: RunSetDetailComponent
  },
  {
    path: 'result/:id/statistic',
    component: RunSetStatisticComponent
  },
  {
    path: 'result/compare/:originId/:destId',
    component: RunSetStatisticCompareComponent
  },
  {
    path: 'result/casedetail/:originId/:destId',
    component: ResultDetailCompareComponent
  },
  {
    path: 'result/:id/cases',
    component: dataComponent
  },
  {
    path: 'result/:originId/:originStatus/:destId/:destStatus/cases',
    component: dataComponent
  },
  {
    path: 'result/casedetail/:id',
    component: ResultDetailComponent
  },
  {
    path: 'result/:id/debug',
    loadChildren: () => import('app/routes/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'runonce',
    component: RunComponent
  },
  {
    path: 'task',
    component: TaskListComponent
  },
  {
    path: 'task/addormodify',
    component: TaskAddOrModifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunRoutingModule { }
