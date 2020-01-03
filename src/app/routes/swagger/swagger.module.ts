import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwaggerRoutingModule } from './swagger-routing.module';
import { SwaggerComponent } from './swagger/swagger.component';


@NgModule({
  declarations: [SwaggerComponent],
  imports: [
    CommonModule,
    SwaggerRoutingModule
  ],
  exports: [
    SwaggerComponent
  ]
})
export class SwaggerModule { }
