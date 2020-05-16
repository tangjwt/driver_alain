import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { NzTreeNodeOptions } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class CaseFilepathService {
  constructor(private httpClient: HttpClient) {}

  getFilePath(project: string, forceRefresh: boolean): Observable<Result> {
    const params = new HttpParams()
    .set('forceRefresh', String(forceRefresh));
    return this.httpClient.get<Result>(
      `/cases/${project}`,{params}
    );
  }

  getFilePathBySource(
    project: string,
    dataSource: string,
    forceRefresh: boolean,
  ): Observable<Result> {
    const params = new HttpParams()
    .set('forceRefresh', String(forceRefresh));
    return this.httpClient.get<Result>(
      `/cases/${project}/${dataSource}`,{params}
    );
  }

  getFilePathByServiceAndSource(
    project: string,
    service: string,
    dataSource: string,
    forceRefresh: boolean,
  ): Observable<Result> {
    const params = new HttpParams()
    .set('forceRefresh', String(forceRefresh));
    return this.httpClient.get<Result>(
      `/cases/${project}/${service}/${dataSource}`,{params}
    );
  }

  nzTreeConvert(
    result: Array<object>,
    checked: Array<string> = [],
  ): NzTreeNodeOptions[] {
    let nzNodes: NzTreeNodeOptions[] = [];
    result.forEach(node => {
      const path = node['filePath'];
      const count = node.hasOwnProperty('caseCount') ? node['caseCount'] : 0;
      const keys = path.split('/');
      // 从1开始读取，是因为第一层级为project name，这一层级没必要展现，因为现在不会存在跨project取测试用例的情况
      let filter = nzNodes.filter(nzNode => {
        return nzNode.title == keys[1];
      });
      if (filter && filter.length > 0) {
        filter[0].count = parseInt(filter[0].count) + parseInt(count);
        this.generateNzTreeNode(keys, path, 2, count, filter[0], checked);
      } else {
        let parent = {
          title: keys[1],
          key: keys[1],
          expanded: true,
          count: count,
          children: [],
        };
        this.generateNzTreeNode(keys, path, 2, count, parent, checked);
        nzNodes.push(parent);
      }
    });
    return nzNodes;
  }

  private generateNzTreeNode(
    keys: Array<string>,
    origin: string,
    index: number,
    count: number,
    parent: NzTreeNodeOptions,
    checked: Array<string> = [],
  ): NzTreeNodeOptions {
    const element = keys[index];
    if (index == keys.length - 1) {
      let check = false;
      if (checked.indexOf(origin) > -1 || checked.indexOf('/' + origin) > -1) {
        check = true;
      }
      let leaf = {
        title: element,
        key: origin,
        isLeaf: true,
        checked: check,
        count: count,
      };
      if (!parent) {
        return leaf;
      } else {
        parent.children.push(leaf);
        return parent;
      }
    } else {
      index = index + 1;
      let current;
      const filter = parent.children.filter(child => {
        return child.title == element;
      });
      if (filter && filter.length > 0) {
        current = filter[0];
        current.count = parseInt(current.count) + count;
      } else {
        current = {
          title: element,
          key: element,
          expanded: false,
          count: count,
          children: [],
        };
        parent.children.push(current);
      }
      this.generateNzTreeNode(keys, origin, index, count, current, checked);
      return parent;
    }
  }

}
