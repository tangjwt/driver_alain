import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateLayoutComponent } from './generate-layout/generate-layout.component';
import { CanDeactivateGuard } from '../../guard/can-deactivate.guard';
const routes: Routes = [
  {
    path: '',
    component: GenerateLayoutComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
