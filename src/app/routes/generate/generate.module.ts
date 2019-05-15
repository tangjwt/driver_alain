import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { RunModule } from '../run/run.module';

import { GenerateRoutingModule } from './generate-routing.module';
import { GenerateLayoutComponent } from './generate-layout/generate-layout.component';
import { GenerateContentComponent } from './generate-content/generate-content.component';

@NgModule({
  declarations: [ GenerateLayoutComponent, GenerateContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    GenerateRoutingModule,
    RunModule
  ],
  exports:[
    GenerateContentComponent
  ]
})
export class GenerateModule {}
