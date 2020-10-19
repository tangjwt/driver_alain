import { Component, OnInit } from '@angular/core';
import { STColumn, STColumnFilterMenu } from '@delon/abc';
import { STPage } from '@delon/abc';
import { EnvUrlManageService } from '../../../services/env-url-manage.service';
import { ProjectManageService } from '../../../services/project-manage.service';
import { EnvManageService } from '../../../services/env-manage.service';
import { SerManageService } from '../../../services/ser-manage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'sn-env-url',
  templateUrl: './env-url.component.html',
})
export class EnvUrlComponent implements OnInit {
  envUrlList: Array<any>;
  projects: Array<any> = [];
  envs: Array<any> = [];
  servers: Array<any> = [];
  envFilter: STColumnFilterMenu[] = [];
  page: STPage = {
    show: true,
    showSize: true,
  };
  columns:STColumn[] = [
    {
      title: 'id',
      index: 'id',
    },
    {
      title: 'projectName',
      index: 'projectName',
    },
    {
      title: 'envName',
      index: 'envName',
      filter: {
        menus: this.envFilter,
      },
    },
    {
      title: 'serviceName',
      index: 'serviceName',
    },
    {
      title: 'serviceUrl',
      index: 'serviceUrl',
    },
    {
      title: 'description',
      index: 'description',
    },
    {
      title: 'operation',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          click: (record: any) => {
            this.getProjectList();
            this.getEnvUrl(record.id);
          },
        },
        {
          text: 'delete',
          icon: 'delete',
          type: 'del',
          click: record => {
            this.delete(record.id);
            this.message.success(`成功删除【${record.name}】`);
          },
        },
      ],
    },
  ];

  envUrlFG: FormGroup = this.fb.group({
    id: [''],
    serviceUrl: ['', Validators.required],
    projectId: ['', Validators.required],
    envId: ['', Validators.required],
    serviceId: ['', Validators.required],
    description: [''],
  });
  isVisible = false;
  isOkLoading = false;
  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    }
  };
  constructor(
    private serviceManage: SerManageService,
    private envUrlService: EnvUrlManageService,
    private environmentService: EnvManageService,
    private projectService: ProjectManageService,
    private message: NzMessageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.envUrlService.getEnvUrlList().subscribe(data => {
      this.envUrlList = data.data ? data.data : [];
      this.envUrlList.forEach(data => {
        const tmp: STColumnFilterMenu = {
          text: data.envName,
          value: data.envName,
        };
        if (this.envFilter.indexOf(tmp) < 0) {
          this.envFilter.push(tmp);
        }
      });
    });
  }

  show() {
    this.getProjectList();
    this.envUrlFG.reset();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    this.envUrlFG.reset();
    // this.init();
    // this.serviceFG.reset();
  }

  handleOk(value: any) {
    this.isOkLoading = true;
    this.envUrlService
      .addOrModify(value)
      .toPromise()
      .then(data => {
        if (data.status == 'STATUS_SUCCESS') {
          this.isOkLoading = false;
          this.isVisible = false;
          this.envUrlFG.reset();
          this.message.success('添加/修改服务地址成功');
          this.ngOnInit();
        } else {
          this.isOkLoading = false;
          this.isVisible = true;
          this.message.error(data.message, {
            nzDuration: 5000,
          });
        }
      });
  }

  getProjectList() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data;
    });
  }

  update(event: any) {
    if (!event) return;
    let current = this.projects.filter(data => data.id == event)[0].name;
    this.environmentService.getEnvListByProject(current).subscribe(data => {
      this.envs = data.data;
    });
    this.serviceManage.getServiceListByProject(current).subscribe(data => {
      this.servers = data.data;
    });
  }

  getEnvUrl(id: string) {
    this.envUrlService.getEnvUrlById(id).subscribe(data => {
      if (data.data.length > 0) {
        this.envUrlFG.reset();
        this.envUrlFG.setValue({
          id: data.data[0].id,
          serviceUrl: data.data[0].serviceUrl,
          projectId: data.data[0].projectId,
          envId: data.data[0].envId,
          serviceId: data.data[0].serviceId,
          description: data.data[0].description
            ? data.data[0].description
            : '',
        });
        this.isVisible = true;
      }
    });
  }

  delete(id: any) {
    this.envUrlService.deleteById(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
