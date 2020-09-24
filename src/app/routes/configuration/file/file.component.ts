import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { STColumn } from '@delon/abc';
import { STPage } from '@delon/abc';

import { ProjectManageService } from '../../../services/project-manage.service';
import { SerManageService } from '../../../services/ser-manage.service';
import { FileManageService } from '../../../services/file-manage.service';

import { NzMessageService } from 'ng-zorro-antd';
import { UploadFile } from 'ng-zorro-antd/upload';
import { UploadXHRArgs } from 'ng-zorro-antd';

@Component({
  selector: 'sn-file',
  templateUrl: './file.component.html',
  styles: [],
})
export class FileComponent implements OnInit {
  files: Array<any> = [];
  servers: Array<any> = [];
  isVisible = false;
  isOkLoading = false;
  projects: Array<any> = [];
  projectName:any;
  serviceName:any;
  uploadUrl:any ;
  page: STPage = {
    show: true,
    showSize: true,
  };
  columns: STColumn[] = [
    {
      title: 'project',
      index: 'project',
    },
    {
      title: 'service',
      index: 'service',
    },
    {
      title: 'objectName',
      index: 'objectName',
    },
    {
      title: 'lastModified',
      type: 'date',
      index: 'lastModified',
    },
    {
      title: 'size',
      index: 'size',
      format: (record, col, index: number) => {
        let num:any = (record['size'] / 1024).toFixed(2);
        if (num < 1024) return num + 'KB';
        else {
          num = (num / 1024).toFixed(2);
          return num + 'MB'; 
        }
      },
    },
    {
      title: { text: 'etag', optional: '(ETAG)' },
      index: 'etag',
    },
    {
      title: 'operation',
      buttons: [
        {
          text: 'Download',
          icon: 'download',
          type: 'link',
          click: async (record: any) => {
            // this.getEnv(record.id)
            const data = await this.getDownloadUrl(
              record.project,
              record.service,
              record.objectName,
            );
            window.location.href = data.data;
          },
        },
        {
          text: 'Delete',
          icon: 'delete',
          type: 'del',
          click: (record) => {
            this.delete(record.project, record.service, record.objectName);
            // this.message.success(`成功删除【${record.name}】`);
          },
        },
      ],
    },
  ];

  constructor(
    private fileManageService: FileManageService,
    private serManageService: SerManageService,
    private projectService: ProjectManageService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fileManageService.getFileList().subscribe((data) => {
      this.files = data.data ? data.data : [];
    });
  }

  delete(project: string, service: string, objName: string) {
    this.fileManageService
      .deleteFile(project, service, objName)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  async getDownloadUrl(project: string, service: string, objName: string) {
      return await this.fileManageService
        .getFileDownloadUrl(project, service, objName).toPromise();
  }


  show() {
    this.getProjectList();
    this.isVisible = true;
  }

  getProjectList(){
    this.projectService.getProjectList().subscribe(data =>{
      this.projects = data.data;
    });
  }

  update(event: any) {
    if (!event) return;
    this.serManageService.getServiceListByProject(event).subscribe(data => {
      this.servers = data.data;
    });
  }

  upload = async (file: UploadXHRArgs) => {
    // console.log(file);
    this.uploadUrl = (await this.fileManageService.getFileUploadUrl(this.projectName,this.serviceName,file.file.name).toPromise()).data;
    return this.fileManageService.uploadFile(file,this.uploadUrl);
  };

}
