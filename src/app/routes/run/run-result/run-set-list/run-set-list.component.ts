import { Component, OnInit} from '@angular/core';
import { RunResultService } from '../../../../services/run-result.service';
import { RunService } from '../../../../services/run.service';
import { Router, ActivatedRoute } from '@angular/router';
import { STPage, STColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RunSetDetailComponent } from '../run-set-detail/run-set-detail.component';

@Component({
  selector: 'sn-run-set-list',
  templateUrl: './run-set-list.component.html',
  styleUrls: ['./run-set-list.component.scss'],
})
export class RunSetListComponent implements OnInit {

  itemsPerPage = 10;
  page: STPage = {
    show: true,
    front: false,
    showSize: true
  };
  results: Array<any> = [];
  selectedRows: Array<any>;
  totalRecords: number;
  columns: STColumn[] = [
    {
      title: 'compare',
      index: 'id',
      type: 'checkbox'
    },
    {
      title: 'id',
      render: 'id'
    },
    {
      title: 'project',
      index: 'project'
    },
    {
      title: 'env',
      index: 'env'
    },
    {
      title: 'service',
      index: 'service'
    },
    {
      title: 'url',
      index: 'runUrl',
      width: '100'
    },
    {
      title: 'dataSource',
      index: 'dataSource'
    },
    {
      title: 'succesed',
      renderTitle: 'succesedTitle',
      render: 'succesed'
    },
    {
      title: 'status',
      index: 'status',
      type: 'tag',
      tag: {
        FINISHED : {text : 'FINISHED', color: 'green'},
        ERROR: { text: 'ERROR', color: 'red' },
        FAIL: { text: 'FAIL', color: 'red' },
        RUNNING: { text: 'RUNNING', color: 'blue' },
        CANCELED: { text: 'CANCELED', color: 'orange' }
      }
    },
    // {
    //   title: 'pass',
    //   index: 'isPass',
    //   hide: true
    // },
    {
      title: 'runnedPercent',
      renderTitle: 'runnedPercentTitle',
      render: 'runnedPercent'
    },
    {
      title: 'runTime',
      index: 'runTime',
      type: 'date',
      className: 'text-nowrap',
    },
    {
      title: 'operation',
      buttons:[
        {
          text: 'Detail',
          type: 'drawer',
          drawer: {
            title: 'Detail',
            component: RunSetDetailComponent,
            paramsName: 'id',
            params: (record: any) => record
          }
          // type: 'link',
          // click: (record: any) =>{
          //   this.router.navigate([`/run/result/detail/${record.id}`]);
          // }
        }
      ]
    }
  ];
  id: string;
  taskId: string;
  detailInfo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private runResultService: RunResultService,
    private runService: RunService,
    private message: NzMessageService,
    private modalService: NzModalService
    ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.runResultService.getSubRunSetList(this.id, 1, this.itemsPerPage).subscribe(data => {
          this.results = data.resultList;
          this.totalRecords = data.count;
        });
      } else if (params.has('taskId')) {
        this.taskId = params.get('taskId');
        if (!this.columns.includes({title: 'pass',index: 'isPass'})){
          this.columns.splice(8, 0, {title: 'pass', index: 'isPass'});
        }
        this.runResultService.getRunSetListByTask(this.taskId, 1, this.itemsPerPage).subscribe(data => {
          this.results = data.resultList;
          this.totalRecords = data.count;
        });
      } else {
        // if (this.columns.includes({title: 'pass',index: 'isPass'})){
        //   this.columns.splice(8, 1);
        // }
        this.runResultService.getRunSetList(1, this.itemsPerPage).subscribe(data => {
          this.results = data.resultList;
          this.totalRecords = data.count;
          this.id = null;
        });
      }
    });
  }

  onChangeTable(event: any) {
    switch (event.type) {
      case 'ps':
      case 'pi':
        this.pageChange(event);
        break;
      case 'checkbox':
        this.selectedRows = event.checkbox;
        break;
      default:
        break;
    }
  }

  jump(id: any){
    this.runResultService.hasSubRunSetList(id).subscribe(data => {
      const hasSub = data.status;
      // 有子run set的情况下，跳转到子run set列表页面
      if (hasSub == 'STATUS_SUCCESS') {
        // sub run_set 点浏览器回退按钮，回退到run_set列表界面
        // window.history.pushState({},'List','/run/result');
        this.router.navigate(['/run/result/', { id : id }]);
      } else {
        this.router.navigate([`/run/result/${id}/statistic`]);
      }
    });
  }

  compareResult() {
    const orgin = this.selectedRows[0];
    const dest = this.selectedRows[1];
    if (orgin.project === dest.project && orgin.service === dest.service && orgin.dataSource === dest.dataSource) {
      this.router.navigate(['/run/result/compare', orgin.id, dest.id]);
    } else {
      this.message.error('project、service、dataSource一致的运行结果才能执行对比!');
    }
  }

  cancel() {
    const orgin = this.selectedRows[0];
    this.runService.cancelByRunsetId(orgin.id).subscribe(result => {
      this.message.success(result.status);
      this.ngOnInit();
    });
  }

  rerun() {
    const orgin = this.selectedRows[0];
    this.runService.rerunByRunsetId(orgin.id).subscribe(result => {
      this.message.success(result.status);
      this.ngOnInit();
    });
  }

  showDeleteConfirm() {
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '<b style="color: red;">确认删除？</b>',
      nzOkType: 'danger',
      nzOnOk: () => {
        let orgin = '';
        this.selectedRows.forEach(row => orgin += row.id + ',');
        if (orgin.endsWith(',')) {
          orgin = orgin.substring(0, orgin.length - 1);
        }
        this.runResultService.deleteByRunsetId(orgin).subscribe(result => {
          this.message.success(result.status);
          // this.ngOnInit();  需要调用pageChange
        });
      }
    });
  }
  pageChange(event: any){
    if (this.id) {
      this.runResultService.getSubRunSetList(this.id, event.pi, event.ps).subscribe(data => {
        this.results = data.resultList;
        this.totalRecords = data.count;
      });
    } else if (this.taskId) {
      this.runResultService.getRunSetListByTask(this.taskId, event.pi, event.ps).subscribe(data => {
        this.results = data.resultList;
        this.totalRecords = data.count;

      });
    } else {
      this.runResultService.getRunSetList(event.pi, event.ps).subscribe(data => {
        this.results = data.resultList;
        this.totalRecords = data.count;
      });
    }
  }

}
