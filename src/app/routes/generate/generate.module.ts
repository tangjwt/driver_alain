import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { RunModule } from '../run/run.module';

import { GenerateRoutingModule } from './generate-routing.module';
import { GenerateLayoutComponent } from './generate-layout/generate-layout.component';
import { GenerateContentComponent } from './generate-content/generate-content.component';
import { CanDeactivateGuard } from '../../guard/can-deactivate.guard';

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
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class GenerateModule {}
