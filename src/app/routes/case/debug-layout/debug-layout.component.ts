import { Component, OnInit } from '@angular/core';
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
  index = 0;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    });
  }

  updateTabs(index: number, event) {
    if(!event){
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

  canDeactivate(): Observable<boolean> | boolean {
    if (this.tabs.length === 0) {
      return true;
    }
    let filer = this.update.filter(data => data !== 'debug');
    if (filer.length === 0) {
      return true;
    }
    const modalRef = this.modalService.confirm({
      nzTitle: '<i>Do you Want to leave this page?</i>',
      nzOnOk: () => true,
    });
    return modalRef.afterClose;
  }
}
