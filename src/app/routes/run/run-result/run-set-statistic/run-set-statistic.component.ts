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
  columns: STColumn[] = [
    {
      title: '服务名称',
      index: 'field',
    },
    {
      title: '通过',
      index: 'pass',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', { status: 'pass', serviceName: row.field}])
    },
    {
      title: '失败',
      index: 'fail',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', { status: 'fail', serviceName: row.field}])
    },
    {
      title: '错误',
      index: 'error',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', { status: 'error', serviceName: row.field}])
    },
    {
      title: '忽略',
      index: 'skip',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', { status: 'skip', serviceName: row.field}])
    },
    {
      title: '总和',
      index: 'total',
      type: 'link',
      click: row => this.router.navigate(['/run/result', row.runSetId, 'cases', { serviceName: row.field}])
    },
  ];
  constructor(private route: ActivatedRoute, private router: Router, private runResultService: RunResultService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.runResultService.getRunResultStatistic(id).subscribe(data => {
        this.results = data.resultList;
      });
    }
    );
  }

}
