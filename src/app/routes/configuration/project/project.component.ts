import { Component, OnInit, TemplateRef } from '@angular/core';
import { STColumn } from '@delon/abc';
import { STPage } from '@delon/abc';
import { ProjectManageService } from '../../../services/project-manage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'sn-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
})
export class ProjectComponent implements OnInit {
  page: STPage = {
    show: true,
    showSize: true,
  };
  projects: Array<any> = [];
  columns: STColumn[] = [
    {
      title: 'id',
      index: 'id',
    },
    {
      title: 'name',
      index: 'name',
    },
    {
      title: 'svnPath',
      index: 'svnPath',
    },
    {
      title: 'username',
      index: 'username',
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
            this.getProject(record.id);
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
  projectFG: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    svnPath: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    description: [''],
  });
  isVisible = false;
  isOkLoading = false;

  constructor(
    private projectService: ProjectManageService,
    private message: NzMessageService,
    private modalSrv: NzModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data ? data.data : [];
    });
  }

  show() {
    this.projectFG.reset();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    this.projectFG.reset();
  }

  handleOk(value: any) {
    this.isOkLoading = true;
    this.projectService
      .add(value)
      .toPromise()
      .then(data => {
        if (data.status === 'STATUS_SUCCESS') {
          this.isOkLoading = false;
          this.ngOnInit();
          this.isVisible = false;
          this.message.success('添加/修改项目成功');
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

  getProject(id: string) {
    this.projectFG.reset();
    this.projectService.getById(id).subscribe(data => {
      this.projectFG.setValue({
        id: data.data[0].id,
        name: data.data[0].name,
        svnPath: data.data[0].svnPath,
        username: data.data[0].username,
        password: data.data[0].password,
        description: data.data[0].description
          ? data.data[0].description
          : '',
      });
      this.isVisible = true;
    });
  }

  delete(id: any) {
    this.projectService.deleteById(id).subscribe(data => {
      this.ngOnInit();
    });
  }

  addProject(tpl: TemplateRef<{}>) {
    let isOkLoading = false;
    this.modalSrv.create({
      nzTitle: '添加/修改项目',
      nzContent: tpl,
      nzOkLoading: isOkLoading,
      nzOkDisabled: !this.projectFG.valid,
      nzOnOk: () => {
        isOkLoading = true;
        return this.projectService.getById('1').toPromise();
      },
    });
  }
}
