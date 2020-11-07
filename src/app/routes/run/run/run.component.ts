import {
  Component,
  OnInit,
  TemplateRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProjectManageService } from '../../../services/project-manage.service';
import { DatasourceService } from '../../../services/datasource.service';
import { EnvManageService } from '../../../services/env-manage.service';
import { Utils } from '../../../shared/utils/utils';
import { EnvUrlManageService } from '../../../services/env-url-manage.service';
import { CaseFilepathService } from '../../../services/case-filepath.service';
import { RunService } from '../../../services/run.service';
import { SerManageService } from '../../../services/ser-manage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeComponent, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd/tree';
import { PriorityOptions} from '../../../services/convert';

@Component({
  selector: 'sn-run',
  templateUrl: './run.component.html',
})
export class RunComponent implements OnInit { 
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  @Input() set runEntityValue(value: any) {
    if (value) {
      this.runEntity.setValue(value);
      if (value.priority) {
        const priority = value.priority;
        this.checkOptions.forEach(data => {
          if (priority.indexOf(data.value) > -1) {
            data.checked = true;
          }
        });
      }
      if(value.project) {
        this.updateEnv(value.project);
      }
      if(value.env && value.fuwu){
        this.updateService(value.env, value.fuwu);
      }
    }
  }
  @Input() isTask: boolean;
  @Output() entityValue: EventEmitter<any>  = new EventEmitter();
  projects: Array<any>;
  dataSources: Array<any>;
  envs: Array<any>;
  sers: Array<any>;
  serUrls: Array<any> = [];
  url = '';
  tmpProject: any;

  config = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
  };
  runEntity: FormGroup = this.fb.group({
    project: ['', [Validators.required]],
    env: ['', Validators.required],
    fuwu: ['', Validators.required], // 使用server service 开头的变量，在整体setValue的时候会无法成功赋值，非常奇怪
    url: [''],
    name: [''],
    filePath: [''],
    dataSource: ['', Validators.required],
    compareUrl: [''],
    data: [''],
    parameter: [''],
    threads: [''],
    tag: [''],
    runBySequence: ['false'],
    priority: [''],
    delay: [''],
    duration: [''],
    maxRetries: [''],
    retryInterval: [''],
    compareConfig: [''],
    remoteParameter: [''],
  });
  // items: TreeviewItem[];
  nodes: NzTreeNodeOptions[];
  serviceItems: NzTreeNodeOptions[] = [];
  serviceValue: string[] = [];
  checkOptions = PriorityOptions;
  forceUpdate = false;
  isVisible = false;
  isSpinning = true;

  constructor(
    private runService: RunService,
    private router: Router,
    private filepathService: CaseFilepathService,
    private fb: FormBuilder,
    private projectService: ProjectManageService,
    private envService: EnvManageService,
    private message: NzMessageService,
    private envUrlService: EnvUrlManageService,
    private modalService: NzModalService,
    private datasourceService: DatasourceService,
    private serManageService: SerManageService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  ngOnInit() {
    // this.checkOptions = [
    //   { label: 'P0', value: 'P0', checked: this.initSelect('P0') },
    //   { label: 'P1', value: 'P1', checked: this.initSelect('P1') },
    //   { label: 'P2', value: 'P2', checked: this.initSelect('P2') },
    //   { label: 'P4', value: 'P4', checked: this.initSelect('P4') }
    // ];
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data;
    });
    this.runEntity.valueChanges.subscribe(change =>{
      this.entityValue.emit(this.runEntity);
    });
  }

  get project() {
    return this.runEntity.get('project');
  }

  get env() {
    return this.runEntity.get('env');
  }

  select(event: any) {
    const checked = [];
    event.forEach(element => {
      if (element.checked) {
        checked.push(element.value);
      }
    });
    this.runEntity.get('priority').setValue(checked.toString());
  }

  updateEnv(event: any) {
    if (!event || !this.projects) {
      return;
    }
    this.tmpProject = this.getProjectObj(event);
    this.serManageService.getServiceListByProject(event).subscribe(data =>{
      this.sers = data.data;
    });
    this.envService.getEnvListByProject(event).subscribe(data => {
      this.envs = data.data;
      if(data.data.length === 0 && this.tmpProject?.type === 'TESTNG'){
        this.envs = [{name: 'N/A'}];
      }
    });
    if(this.tmpProject?.type === 'TESTNG'){
      this.datasourceService.getDataourceListByProject(event).subscribe((data) =>{
        if(data.data){
          this.dataSources = data.data.map(t=>t.name);
        }else{
          this.dataSources = [];
        }
      });
    }else{
      this.envService.getDataSourceList(event).subscribe(data => {
        this.dataSources = data.data;
      });
    }
  }

  getProjectObj(event:any){
    if(this.projects){
      for(const item of this.projects){
        if(item.name === event){
          return item;
        }
      }
    }
  }

  updateService(event: any, service='') {
    if (event) {
      this.envUrlService
        .getEnvUrlListByProjectAndEnv(
          this.runEntity.get('project').value,
          event,
        )
        .subscribe(data => {
          this.serUrls = data.data;
        });
    }
  }

  updateUrl(event: any) {
    if (this.serUrls.length > 0) {
      this.url = this.serUrls
        .filter(data => {
            return event === data.serviceName; // 全匹配
        })
        .map(data => data.serviceUrl)
        .toString();
    }
  }
  run(value: any, success: TemplateRef<void>) {
    let requestParams = {
      params: value,
    };
    if (!requestParams.params.fuwu) {
      this.runService
        .runOnAllService(
          requestParams.params.project,
          encodeURIComponent(requestParams.params.env),
          requestParams.params.dataSource,
        )
        .subscribe(data => {});
    } else {
      this.runService
        .runByService(
          requestParams.params.project,
          encodeURIComponent(requestParams.params.env),
          requestParams.params.fuwu,
          requestParams.params.dataSource,
          requestParams,
        )
        .subscribe(data => {});
    }
    this.message.success(success, { nzDuration: 5000 });
  }

  result() {
    this.router.navigate(['/run/result']);
  }

  updateCaseFileList() {
    this.nodes = [];
    this.isSpinning = true;
    const type = this.tmpProject?this.tmpProject.type:'COMMON';
    // if (
    //   !this.runEntity.get('fuwu').value &&
    //   !this.runEntity.get('dataSource').value
    // ) {
    //   this.filepathService
    //     .getFilePath(this.runEntity.get('project').value, this.forceUpdate)
    //     .subscribe(data => {
    //       this.nodes = this.filepathService.nzTreeConvert(data.data,Utils.toArray(this.runEntity.get('filePath').value),type);
    //       this.isSpinning = false;
    //       // this.items = this.filepathService.arrayToTreeviewItem(
    //       //   data.data,
    //       //   Utils.toArray(this.runEntity.get('filePath').value),
    //       // );
    //     });
    // } else if (!this.runEntity.get('fuwu').value) {
    //   this.filepathService
    //     .getFilePathBySource(
    //       this.runEntity.get('project').value,
    //       this.runEntity.get('dataSource').value,
    //       this.forceUpdate,
    //     )
    //     .subscribe(data => {
    //       this.nodes = this.filepathService.nzTreeConvert(data.data,Utils.toArray(this.runEntity.get('filePath').value),type);
    //       this.isSpinning = false;
    //       // this.items = this.filepathService.arrayToTreeviewItem(
    //       //   data.data,
    //       //   Utils.toArray(this.runEntity.get('filePath').value),
    //       // );
    //     });
    // } else {
      this.filepathService
        .getFilePathByServiceAndSource(
          this.runEntity.get('project').value,
          this.runEntity.get('fuwu').value,
          this.runEntity.get('dataSource').value,
          this.forceUpdate,
        )
        .subscribe(data => {
          this.nodes = this.filepathService.nzTreeConvert(data.data,Utils.toArray(this.runEntity.get('filePath').value),type);
          
          this.isSpinning = false;
          // this.items = this.filepathService.arrayToTreeviewItem(
          //   data.data,
          //   Utils.toArray(this.runEntity.get('filePath').value),
          // );
        });
    // }
  }

  updateCheckedValue(event){
   let nodes= this.nzTreeComponent.getCheckedNodeList();
   this.runEntity.get('filePath').setValue(this.getSelectedLeafNodes(nodes));
   
  }

  private getSelectedLeafNodes(nodes: NzTreeNode[]):string{
    let selected="";
    nodes.forEach(node => {
      if(node.isLeaf){
        selected+=node.key+",";
      }else{
        selected+=this.getSelectedLeafNodes(node.children);
      }
    });
    return selected;
  }

}
