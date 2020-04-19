import { Component, OnInit } from '@angular/core';
import { RunResultService } from '../../../../services/run-result.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { STPage } from '@delon/abc';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'sn-result-list',
  templateUrl: './result-list.component.html'
})
export class dataComponent implements OnInit {

  itemsPerPage = 15;
  page: STPage = {
    show: true,
    front: false,
    showSize: true
  };
  results: Array<any> = [];
  totalRecords = 0;
  columns: STColumn[] = [
    {
      title: 'id',
      render: 'id',
    },
    {
      title: 'name',
      index: 'caseName'
    },
    {
      title: 'serviceName',
      index: 'serviceName',
    },
    {
      title: 'path',
      index: 'caseFilePath',
    },
    {
      title: 'tag',
      index: 'tag',
    },
    {
      title: 'priority',
      render: 'priority'
    },
    {
      title: 'status',
      index: 'status'
    },
    {
      title: 'subStatus',
      index: 'subStatus',
    }
  ];
  id: string;
  originId: string;
  destId: string;
  originStatus: string;
  destStatus: string;
  status: string;
  serviceName: string;
  finished = false;
  compare = { title: 'compare', render: 'compare'};
  compareId = { title: 'compareId', render: 'compareId'}
  constructor(private route: ActivatedRoute, private runResultService: RunResultService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params.originId && params.destId) {
      this.originId = params.originId;
      this.destId = params.destId;
      this.originStatus = params.originStatus;
      this.destStatus = params.destStatus;
      if (!this.columns.includes(this.compare)){
        this.columns.splice(0, 0, this.compare);
        this.columns.splice(2, 0, this.compareId);
      }
      // this.columns[0].hide = false;
      // this.columns[1].title = 'orginId';
      // this.columns[2].title = 'destId';
      // this.columns[2].hide = false;
      this.runResultService.getCompareRundata(this.originId, this.destId, this.originStatus, this.destStatus, 1, this.itemsPerPage).subscribe(data => {
        this.results = data.data;
        this.totalRecords = data.total;
        this.finished = true;
      });
    } else {
      this.id = params.id;
      // this.columns[0].hide = true;
      // this.columns[2].hide = true;
      this.status = this.route.snapshot.params.status;
      this.serviceName = this.route.snapshot.params.serviceName;
      this.runResultService.getRundata(this.id, this.status,this.serviceName, 1, this.itemsPerPage).subscribe(data => {
        this.results = data.data;
        this.totalRecords = data.total;
        this.finished = true;
        console.log(data);

      });
    }
  }

  public onChangeTable(event: any) {
    if (this.originId && this.destId) {
      this.runResultService.getCompareRundata(this.originId, this.destId, this.originStatus, this.destStatus, event.paging.currentPage, this.itemsPerPage).subscribe(data => {
        this.results = data.data;
        this.totalRecords = data.total;
      });
    } else {
      this.runResultService.getRundata(this.id, this.status,this.serviceName, event.paging.currentPage, this.itemsPerPage).subscribe(data => {
        this.results = data.data;
        this.totalRecords = data.total;
      });
    }
  }


}
