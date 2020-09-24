import { Component, Input, OnInit } from '@angular/core';

import { CaseManageService } from '../../../../services/case-manage.service';
@Component({
  selector: 'sn-case-detail',
  templateUrl: './case-detail.component.html',
  styles: [
  ]
})
export class CaseDetailComponent implements OnInit {
  detail:any;
  @Input() id;

  constructor(private caseManageService: CaseManageService) { }

  ngOnInit(): void {
    this.caseManageService.getCaseById(this.id).subscribe(data => {
      if (data.data) {
        this.detail = data.data;
      }
    });
  }

}
