import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from '../../../guard/can-deactivate.guard';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'sn-debug-layout',
  templateUrl: './debug-layout.component.html',
  styles: [],
})
export class DebugLayoutComponent implements OnInit, CanComponentDeactivate {
  constructor(
    private route: ActivatedRoute,
    private modalService: NzModalService,
  ) {}
  tabs = ['debug'];
  update = ['debug']; // 用于判断debug标签里面有没有内容，不直接使用Tabs，是因为tabs变动，会导致tab重绘，丢失数据
  id;
  caseId;
  index = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
      if (params.has('caseId')) {
        this.caseId = params.get('caseId');
      }
    });
  }

  updateTabs(index: number, event) {
    if (!event) {
      event = 'debug';
    }
    this.update[index] = event;
  }

  closeTab(index: number): void {
    // 第一个标签页默认显示用例详情页跳转过来的内容，删掉之后，需要清空id，防止新建标签页，又将删除的内容带回来
    if (index === 0) {
      this.id = '';
    }
    this.tabs.splice(index, 1);
    this.update.splice(index, 1);
  }

  newTab() {
    this.tabs.push('debug');
    this.update.push('debug');
    this.index = this.tabs.length - 1;
  }
  @HostListener('window:beforeunload')
  canDeactivate(showModel = true): Observable<boolean> | boolean {
    if (this.tabs.length === 0) {
      return true;
    }
    const filer = this.update.filter(data => data !== 'debug');
    if (filer.length === 0) {
      return true;
    }
    if (!showModel) {
      return false;
    }
    const modalRef = this.modalService.confirm({
      nzTitle: '<i>Do you Want to leave this page?</i>',
      nzOnOk: () => true,
    });
    return modalRef.afterClose;
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.compatible IE and Edge
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate(false)) {
      $event.returnValue = true;
    } else {
      $event.returnValue = false;
    }
  }
}
