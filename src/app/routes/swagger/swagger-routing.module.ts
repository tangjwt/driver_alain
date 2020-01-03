import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwaggerComponent } from './swagger/swagger.component';


const routes: Routes = [
  {
    path: '',
    component: SwaggerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwaggerRoutingModule { }
