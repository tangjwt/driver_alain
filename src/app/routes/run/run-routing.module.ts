import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunSetListComponent } from './run-result/run-set-list/run-set-list.component';
import { RunSetDetailComponent } from './run-result/run-set-detail/run-set-detail.component';

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
    path: 'result/detail/:id',
    component: RunSetDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunRoutingModule { }
