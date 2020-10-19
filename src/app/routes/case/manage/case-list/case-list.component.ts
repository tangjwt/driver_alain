import { Component, OnInit } from '@angular/core';
import { CaseManageService } from '../../../../services/case-manage.service';
import { CaseDetailComponent } from '../case-detail/case-detail.component';
import { DatasourceService } from '../../../../services/datasource.service';
import { SerManageService } from '../../../../services/ser-manage.service';
import { ProjectManageService } from '../../../../services/project-manage.service';
import { STPage, STColumn } from '@delon/abc';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { event } from 'jquery';
@Component({
  selector: 'sn-case-list',
  templateUrl: './case-list.component.html',
  styles: [],
})
export class CaseListComponent implements OnInit {
  itemsPerPage = 10;
  results: Array<any> = [];
  dataSources: Array<any>;
  services: Array<any>;
  projects: Array<any>;
  prioritys = ['P0','P1','P2','P3','P4']
  totalRecords = 0;
  name: string;
  project: string;
  service: string;
  dataSource: string;
  caseFilePath: string;
  priority: string;
  filter={project:'',service:'',dataSource:'',caseFilePath:'',priority:'',name:''};
  columns: STColumn[] = [
    {
      title: 'id',
      index: 'id',
      width: 80,
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
      title: 'path',
      index: 'caseFilePath',
    },
    {
      title: 'priority',
      render: 'priority',
      width: 80,
    },
    {
      title: 'createTime',
      index: 'createTime',
      type: 'date',
    },
    {
      title: 'operation',
      render: 'operation',
      buttons: [
        {
          text: 'View', 
          type: 'drawer',
          drawer: {
            title: 'Detail',
            component: CaseDetailComponent,
            paramsName: 'id',
            params: (record: any) => record
          }
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
  event={pi:1,ps:10};

  constructor(
    private caseManageService: CaseManageService,
    private datasourceService: DatasourceService,
    private serManageService: SerManageService,
    private projectService: ProjectManageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.caseManageService.getCaseList(1, this.itemsPerPage).subscribe(data => {
      this.results =  data.data ? data.data : [];
      this.totalRecords = data.total?data.total: 0;
    });
    this.projectService.getProjectList().subscribe(data => {this.projects = data.data})
  }

  updateEnv(event: any) {
    this.dataSource='';
    this.service='';
    this.datasourceService
      .getDataourceListByProject(event)
      .subscribe((data) => {
        this.dataSources = data.data;
      });
    this.serManageService.getServiceListByProject(event).subscribe(data => {
      this.services = data.data;
    })
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

  search(){
    this.filter.project=this.project;
    this.filter.service=this.service;
    this.filter.dataSource=this.dataSource;
    this.filter.name=this.name;
    this.filter.caseFilePath=this.caseFilePath;
    this.filter.priority=this.priority;
    this.pageChange(null);
  }

  pageChange(event: any) {
    if(event){
      this.event = event;
    }
    this.caseManageService.getCaseList(this.event.pi, this.event.ps, this.filter.project,this.filter.dataSource,this.filter.service,this.filter.name,this.filter.caseFilePath,this.filter.priority).subscribe(data => {
      this.results =  data.data ? data.data : [];
      this.totalRecords = data.total?data.total: 0;
    });
  }

}
