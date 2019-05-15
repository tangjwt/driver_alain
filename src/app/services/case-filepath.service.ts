import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';
import { TreeviewItem } from 'ngx-treeview';

@Injectable({
  providedIn: 'root'
})
export class CaseFilepathService {

  constructor(private httpClient: HttpClient) { }

  getFilePath(project: string,forceRefresh:boolean): Observable<BasicResult> {
    return this.httpClient.get<BasicResult>(`/cases/${project};forceRefresh=${forceRefresh}`);
  }


  getFilePathBySource(project:string,dataSource:string,forceRefresh:boolean):Observable<BasicResult>{
    return this.httpClient.get<BasicResult>(`/cases/${project}/${dataSource};forceRefresh=${forceRefresh}`);
  }


  getFilePathByServiceAndSource(project:string,service:string,dataSource:string,forceRefresh:boolean):Observable<BasicResult>{
    return this.httpClient.get<BasicResult>(`/cases/${project}/${service}/${dataSource};forceRefresh=${forceRefresh}`);
  }

  arrayToTreeviewItem(result: Array<string>, checked: Array<string> =[] ): TreeviewItem[]  {
    let json: Object = {};
    result.forEach(path => {
      let t = path.split('/');
      let temp = json;
      for (let index = 1; index < t.length; index++) {
        const element = t[index];
        if (index == t.length - 1) {
          temp[element] = path;
          continue;
        }
        if (temp.hasOwnProperty(element)) {
          temp = temp[element]
        } else {
          temp[element] = {};
          temp = temp[element];
        }
      }
    });
    return this.objToTreeviewItem(json,checked);
  }

  private objToTreeviewItem(obj: Object, checked: Array<string>): TreeviewItem[] {
    let leafs: TreeviewItem[]=[];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (typeof element === 'string') {
          let check:boolean = false;
          if(checked.indexOf(element)>-1 || checked.indexOf("/"+element)>-1){
            check = true;
          }
          let leaf = new TreeviewItem({
            text: key, value: element, checked: check
          });
          leafs.push(leaf);
        } else {
          let child:TreeviewItem[] = this.objToTreeviewItem(element,checked);
          let parent = new TreeviewItem({
            text: key, value: key, collapsed: true, children:child
          });
          leafs.push(parent);
        }
      }
    }
    return leafs;
  }

}
