import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ProjectManageService } from '../../../services/project-manage.service';
import { EnvManageService } from '../../../services/env-manage.service';
import { EnvUrlManageService } from '../../../services/env-url-manage.service';
import { RunService } from '../../../services/run.service';
import { CaseManageService } from '../../../services/case-manage.service';
import { RunResultService } from '../../../services/run-result.service';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { NzMessageService } from 'ng-zorro-antd';
import { commonField } from './common-ac';
import { STColumnFilterMenu } from '@delon/abc';
// import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'sn-debug',
  templateUrl: './debug.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DebugComponent implements OnInit {
  @Input() set id(id: string) {
    if (id) {
      this.runResultService.getRunResultDetail(id).subscribe(data => {
        if (data.data) {
          const runResult = data.data;
          this.project = runResult.projectName;
          this.updateEnv(this.project);
          this.env = runResult.runEnv?runResult.runEnv:this.envs[0].name;
          this.updateService(this.env);
          this.service = runResult.serviceName;
          this.updateServiceFields(runResult.serviceName);
          this.url = runResult.runUrl;
          if (runResult.originUrl) {
            this.url = runResult.originUrl;
          }
          this.data = runResult.caseDetail;
          this.serviceChange.emit(runResult.serviceName);
          // this.debug();
        }
      });
    }
  }
  @Input() set caseId(caseId: string) {
    if (caseId) {
      this.caseManageService.getCaseById(caseId).subscribe(result => {
        if (result.data) {
          const runResult = result.data;
          this.project = runResult.projectName;
          this.updateEnv(this.project);
          // this.env = this.runResult.runEnv;
          this.service = runResult.serviceName;
          this.updateDefaultEnvByService(this.service);
          this.updateServiceFields(runResult.serviceName);
          this.data = runResult.caseDetail;
          this.serviceChange.emit(runResult.serviceName);
          // this.debug();
        }
      });
    }
  }
  @Output() serviceChange: EventEmitter<any> = new EventEmitter();
  project: string;
  env: string;
  service: string;
  projects: Array<any>;
  dataSources: Array<any>;
  envs: Array<any>;
  sers: Array<any>;
  url: string;
  compareUrl: string;
  jsonPath: string;
  runResult;
  data: string;
  mode = 'javascript';
  _fields: Array<any> = [];
  fields: Array<any> = [];
  options: any = {
    lineNumbers: true,
    mode: this.mode,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  };
  acInput = '';
  requestDisable = false;
  constructor(
    private runResultService: RunResultService,
    private runService: RunService,
    private projectService: ProjectManageService,
    private envService: EnvManageService,
    private messageService: NzMessageService,
    private autocompleteService: AutocompleteService,
    private envUrlService: EnvUrlManageService,
    private caseManageService: CaseManageService,
  ) {}

  ngOnInit() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data;
    });
    // this.route.paramMap.subscribe(params => {
    //   if (params.has('id')) {
    //     const id = params.get('id');
    //     this.runResultService.getRunResultDetail(id).subscribe(data => {
    //       if (data.data.length > 0) {
    //         this.runResult = data.data[0];
    //         this.project = this.runResult.projectName;
    //         this.updateEnv(this.project);
    //         this.env = this.runResult.runEnv;
    //         this.updateService(this.env)
    //         this.service = this.runResult.serviceName;
    //         this.url = this.runResult.runUrl;
    //         if(this.runResult.originUrl){
    //           this.url = this.runResult.originUrl;
    //         }
    //         this.data = this.runResult.caseDetail;

    //       }
    //     });
    //   }
    // });
  }

  updateEnv(event: any) {
    this.envService.getEnvListByProject(event).subscribe(data => {
      this.envs = data.data;
    });
    this.envService.getDataSourceList(event).subscribe(data => {
      this.dataSources = data.data;
    });
  }

  updateService(event: any) {
    this.envUrlService
      .getEnvUrlListByProjectAndEnv(this.project, event)
      .subscribe(data => {
        this.sers = data.data;
        this.updateUrl(this.service);
      });
  }


  updateDefaultEnvByService(event: any) {
    this.envUrlService
      .getEnvUrlListByProject(this.project)
      .subscribe(result => {
        for(const data of result.data){
          if (data.serviceName === event) {
            this.env = data.envName;
            this.updateService(this.env);
            break;
          }
        }
      });
  }


  updateUrl(event: any) {
    const result = this.sers.filter(data => {
      return data.serviceName == event;
    });
    if (result.length > 0) {
      this.url = result[0].serviceUrl;
      this.serviceChange.emit(event);
      this.updateServiceFields(event);
    } else {
      this.url = '';
      this.service = null;
    }
  }

  updateServiceFields(serviceName: any) {
    this.autocompleteService.getFieldsByService(serviceName).subscribe(data => {
      this.fields = [];
      this._fields = [];
      data.data.forEach(field => {
        const label = field.name ? field.name : field.fieldName;
        let value = '__' + label + '__ = "';
        if (field.value) {
          value += field.value;
        }
        value += '"';
        const option = { label: label, value: value };
        this.fields.push(option);
        this._fields.push(option);
      });
    });
  }

  onChange(value: any): void {
    if (value.inputType === 'insertText') {
      this.acInput += value.data;
    } else if (value.inputType === 'insertLineBreak') {
      this.acInput = '';
    }
    this.fields = this._fields.filter(
      option =>
        option.label.toLowerCase().indexOf(this.acInput.toLowerCase()) > -1,
    );
  }
  
  debug() {
    this.requestDisable = true;
    const requestParams = {
      params: {
        data: this.data,
        url: this.url,
        compareUrl: this.compareUrl,
      },
    };
    this.runService
      .debug(this.project, this.env, this.service, requestParams)
      .subscribe(
        data => {
          if (data.data.length > 0) {
            this.runResult = data.data[0];
            if(data.data.length >1 ){
              this.runResult.subCases = data.data.slice(1);
            }
            this.messageService.success(
              `Service ${this.service} debug success`,
            );
          } else {
            this.messageService.error(`Service ${this.service} debug fail`);
          }
          this.requestDisable = false;
        },
        error => {
          this.messageService.error(`Service ${this.service} debug fail`);
          this.requestDisable = false;
        },
      );
  }
}
