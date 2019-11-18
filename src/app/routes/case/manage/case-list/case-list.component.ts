import { Component, OnInit } from '@angular/core';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
  NzFormatEmitEvent,
  NzTreeNode,
} from 'ng-zorro-antd';

@Component({
  selector: 'sn-case-list',
  templateUrl: './case-list.component.html',
  styles: [],
})
export class CaseListComponent implements OnInit {
  activedNode: NzTreeNode;
  nodes = [
    {
      title: 'parent 0',
      key: '100',
      expanded: true,
      children: [
        { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true },
      ],
    },
    {
      title: 'parent 1',
      key: '101',
      author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true },
      ],
    },
  ];

  ngOnInit(): void {}
  
  openFolder(data: NzTreeNode | Required<NzFormatEmitEvent>): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  constructor(private nzContextMenuService: NzContextMenuService) {}
}
