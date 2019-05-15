import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectManageService } from '../../../services/project-manage.service';
import { SerManageService } from '../../../services/ser-manage.service';
import { RunService } from '../../../services/run.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { forkJoin, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../guard/can-deactivate.guard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sn-generate-layout',
  templateUrl: './generate-layout.component.html',
  styleUrls: ['./generate-layout.component.less'],
})
export class GenerateLayoutComponent implements OnInit, CanComponentDeactivate {
  node = [];
  index = 0;
  tabs = [];
  value = '';
  serviceFG: FormGroup = this.fb.group({
    project: [''],
    service: ['', Validators.required],
    subName: ['', Validators.required],
    saveCookie: [false],
  });
  isVisible = false;
  tempTab: any;

  constructor(
    private projectManage: ProjectManageService,
    private serviceManage: SerManageService,
    private runService: RunService,
    private messageService: NzMessageService,
    private fb: FormBuilder,
    private modalService: NzModalService,
  ) {}
  // @HostListener allows us to also guard against browser refresh, close, etc.
  // @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (this.tabs.length === 0) {
      return true;
    }
    const modalRef = this.modalService.confirm({
      nzTitle: '<i>Do you Want to leave this page?</i>',
      nzOnOk: () => true,
    });
    return modalRef.afterClose;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.compatible IE and Edge
  // @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue =
        'This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)';
    }
  }

  ngOnInit() {
    this.projectManage.getProjectList().subscribe(data => {
      const requests = [];
      const nodes = [];
      data.resultList.forEach(pro => {
        const projects = {
          title: pro.name,
          key: pro.name,
          expanded: true,
          selectable: false,
          children: [],
        };
        requests.push(this.serviceManage.getServiceListByProject(pro.name));
        nodes.push(projects);
      });
      forkJoin(requests).subscribe(results => {
        results.forEach((re, index) => {
          if (re.resultList) {
            re.resultList.forEach(service => {
              nodes[index].children.push({
                title: service.name,
                key: service.name,
                selectable: true,
                isLeaf: true,
              });
            });
          }
        });
        this.node = nodes;
      });
    });
  }

  click(event: any, project: any, index: number = -1) {
    const tab = {
      service: event,
      project: project,
      request: '',
      index: 0,
      params: {},
      result: {},
      subTabs: [],
    };
    if (index > -1) {
      this.tabs.splice(index, 0, tab);
      this.index = index;
    } else {
      this.tabs.push(tab);
      this.index = this.tabs.length - 1;
    }
  }

  closeTab(index: number): void {
    this.tabs.splice(index, 1);
  }

  updateRequest(event: any, request: any) {
    // event.request = '__name__ = "test"\n' + request;
    event.request = request;
  }

  updateSubRequest(event: any, request: any, index: number) {
    event.subTabs[index].request = request;
  }

  run(event: any) {
    let request = '__name__ = "test"\n';
    if (event.subTabs.length > 0) {
      event.subTabs.forEach(element => {
        request += `__start__ = "${element.name}"\n`;
        request += element.request;
        if (element.saveCookie) {
          request += '__save_cookie__ = "true"\n';
        }
        request += `__end__ = "${element.name}"\n`;
      });
    }
    request += event.request;
    const requestParams = {
      params: {
        data: request,
      },
    };
    this.runService
      .debug(event.project, 'dev', event.service, requestParams)
      .subscribe(data => {
        if (data.status == 'STATUS_SUCCESS') {
          event.result = data.resultList[0];
          this.messageService.success(`Service ${event.service} debug success`);
          if (event.subTabs) {
            event.index = event.subTabs.length + 1;
          } else {
            event.index = 1;
          }
        } else {
          this.messageService.error(data.errorMessage);
        }
      });
  }

  reset(index: number) {
    const tab = this.tabs.splice(index, 1);
    this.click(tab[0].service, tab[0].project, index);
  }

  indexChangeEvent(event, tab) {
    tab.index = event;
  }

  handleOk(event: any) {
    if (
      this.tempTab.subTabs.filter(data => data.name == event.subName).length > 0
    ) {
      this.messageService.error(`别名为${event.subName}的关联服务已经存在`);
    } else {
      const subParam = { cookies: [] };
      const param = { cookies: [] };
      if (this.tempTab.subTabs) {
        this.tempTab.subTabs.forEach(data => {
          if (data.saveCookie) {
            param.cookies.push(data.name);
            subParam.cookies.push(data.name);
          }
        });
        if (event.saveCookie) {
          param.cookies.push(event.subName);
          this.tempTab.params = param;
        }
      }
      this.tempTab.subTabs.push({
        project: event.project,
        service: event.service,
        name: event.subName,
        saveCookie: event.saveCookie,
        params: subParam,
        request: '',
      });
      this.tempTab.index = this.tempTab.subTabs.length - 1;
      this.isVisible = false;
      this.messageService.success(
        `添加关联服务${event.service}，别名${event.subName}成功`,
      );
    }
  }

  handleCancel() {
    this.isVisible = false;
    this.serviceFG.reset();
  }
  show(tab: any) {
    this.tempTab = tab;
    this.serviceFG.reset();
    this.isVisible = true;
  }

  closeSubTab(tab: any, index: number): void {
    const del = tab.subTabs.splice(index, 1);
  }

  updateProject(event) {
    if (event.node) {
      this.serviceFG.get('project').setValue(event.node.parentNode.key);
    }
  }
}
