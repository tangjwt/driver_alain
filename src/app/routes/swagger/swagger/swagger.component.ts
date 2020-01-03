import { ElementRef, Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'sn-swagger',
  templateUrl: './swagger.component.html',
  styles: [],
})
export class SwaggerComponent implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit() {
    const ui = SwaggerUI({
      url: environment.SERVER_URL + '/driver/openapi.json',
      dom_id: '#swagger-container',
      deepLinking: true,
      presets: [SwaggerUI.presets.apis],
      layout: "BaseLayout"
    });
  }
}
