import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';
import { STPage, STColumn } from '@delon/abc';

@Component({
  selector: 'sn-run-set-statistic',
  templateUrl: './run-set-statistic.component.html',
  styleUrls: ['./run-set-statistic.component.scss']
})
export class RunSetStatisticComponent implements OnInit {
  results: Array<any> = [];
  page: STPage = {
    show: false
  };
  groupField='priority';
  id:any;
  columns: STColumn[] = [
    {
      // title: '服务名称',
      index: 'field',
      renderTitle: 'group'
    },
    {
      title: '通过',
      index: 'pass',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', this.getParam('pass',row.field)])
    },
    {
      title: '失败',
      index: 'fail',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', this.getParam('fail',row.field)])
    },
    {
      title: '错误',
      index: 'error',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', this.getParam('error',row.field)])
    },
    {
      title: '忽略',
      index: 'skip',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', this.getParam('skip',row.field)])
    },
    {
      title: '总和',
      index: 'total',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', this.getParam('',row.field)])
    },
  ];
  constructor(private route: ActivatedRoute, private router: Router, private runResultService: RunResultService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.runResultService.getRunResultStatistic(this.id,this.groupField).subscribe(data => {
        this.results = data.data;
      });
    }
    );
  }

  reStatistic(event: any){
    this.runResultService.getRunResultStatistic(this.id,event).subscribe(data => {
      this.results = data.data;
    });
  }

  getParam(status:string,field:string){
    if(this.groupField==='priority'){
      return { status: status, priority: field};
    }else{
      return { status: status, serviceName: field};
    }
  }

}
