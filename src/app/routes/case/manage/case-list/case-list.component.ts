import { Component, OnInit } from '@angular/core';
import { CaseManageService } from '../../../../services/case-manage.service';
import { STPage, STColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'sn-case-list',
  templateUrl: './case-list.component.html',
  styles: [],
})
export class CaseListComponent implements OnInit {
  itemsPerPage = 10;
  results: Array<any> = [];
  totalRecords = 0;
  columns: STColumn[] = [
    {
      title: 'id',
      index: 'id',
      // render: 'id',
    },
    {
      title: 'projectName',
      index: 'projectName',
    },
    {
      title: 'serviceName',
      index: 'serviceName',
    },
    {
      title: 'dataSource',
      index: 'dataSource',
    },
    {
      title: 'caseName',
      index: 'caseName',
    },
    {
      title: 'createTime',
      index: 'createTime',
      type: 'date',
    },
    {
      title: 'priority',
      render: 'priority',
    },
    {
      title: 'operation',
      render: 'operation',
      buttons: [
        {
          text: 'View',
          click: (record: any) => {},
        },
        {
          text: 'Debug',
          icon: 'bug',
          type: 'link',
          click: (record: any) =>{
            this.router.navigate([`/case/${record.id}/debug`]);
          }
        },
      ],
    },
  ];
  page: STPage = {
    show: true,
    front: false,
    showSize: true,
  };
  event: any;

  constructor(
    private caseManageService: CaseManageService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.caseManageService.getCaseList(1, this.itemsPerPage).subscribe(data => {
      this.results =  data.data ? data.data : [];
      this.totalRecords = data.total;
    });
  }

  public onChangeTable(event: any) {
    switch (event.type) {
      case 'ps':
      case 'pi':
        this.pageChange(event);
        break;
      default:
        break;
    }
  }

  pageChange(event: any) {
    this.event = event;
    this.caseManageService.getCaseList(event.pi, event.ps).subscribe(data => {
      this.results = data.data;
      this.totalRecords = data.total;
    });
  }

}
