import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebugLayoutComponent } from './debug-layout/debug-layout.component';
import { CaseListComponent} from './manage/case-list/case-list.component';
import { CanDeactivateGuard } from '../../guard/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: DebugLayoutComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'debug',
    component: DebugLayoutComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'list',
    component: CaseListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule { }
