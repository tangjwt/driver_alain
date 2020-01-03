import { Component, OnInit } from '@angular/core';
import { TaskManageService } from '../../../../services/task-manage.service';
import { STPage, STColumn } from '@delon/abc';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sn-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  itemsPerPage = 10;
  results: Array<any> = [];
  totalRecords = 0;
  columns: STColumn[] = [
    {
      title: 'id',
      render: 'id',
    },
    {
      title: 'taskName',
      index: 'taskName',
    },
    {
      title: 'lastRunTime',
      index: 'lastRunTime',
      type: 'date',
    },
    {
      title: 'nextRunTime',
      index: 'nextRunTime',
      type: 'date',
    },
    {
      title: 'status',
      index: 'status',
    },
    {
      title: 'operation',
      render: 'operation',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          click: (record: any) => {},
        },
        {
          text: 'delete',
          icon: 'delete',
          type: 'del',
          click: record => {},
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
    private taskService: TaskManageService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.taskService.getTaskList(1, this.itemsPerPage).subscribe(data => {
      this.results =  data.data ? data.data : [];
      this.totalRecords = data.count;
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
    this.taskService.getTaskList(event.pi, event.ps).subscribe(data => {
      this.results = data.data;
      this.totalRecords = data.count;
    });
  }

  public pause(id: string) {
    this.taskService.pause(id).subscribe(result => {
      this.freshTable();
      if (result.status == 'STATUS_SUCCESS') {
        this.message.success('任务暂停成功');
      } else {
        this.message.warning(result.status);
      }
    });
  }

  freshTable() {
    if (this.event) {
      this.pageChange(this.event);
    } else {
      this.ngOnInit();
    }
  }

  public resume(id: string) {
    console.log('resume' + id);
    this.taskService.resume(id).subscribe(result => {
      this.freshTable();
      if (result.status == 'STATUS_SUCCESS') {
        this.message.success('任务恢复成功');
      } else {
        this.message.warning(result.status);
      }
    });
  }

  public runOnce(id: string) {
    this.taskService.runOnce(id).subscribe(result => {
      this.freshTable();
      if (result.status == 'STATUS_SUCCESS') {
        this.message.success('任务运行成功');
      } else {
        this.message.warning(result.status);
      }
    });
  }

  public delete(id: string) {
    this.taskService.delete(id).subscribe(result => {
      this.freshTable();
      if (result.status == 'STATUS_SUCCESS') {
        this.message.success('任务删除成功');
      } else {
        this.message.warning(result.status);
      }
    });
  }

  public modify(id: string) {
    this.router.navigate(['/run/task/addormodify', { id: id }]);
  }
}
