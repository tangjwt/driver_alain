import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { httpOptions} from './http-option';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RunService {

  constructor(private httpClient: HttpClient) { }

  rerunByRunsetId(id: string): Observable<BasicResult> {
    return this.httpClient.get<BasicResult>('/runs/rerun/' + id);
  }

  cancelByRunsetId(id: string): Observable<BasicResult> {
    return this.httpClient.get<BasicResult>('/runs/cancel/' + id);
  }

  runOnAllService(project:string,env:string,dataSource:string) : Observable<BasicResult> {
    return this.httpClient.get<BasicResult>(`/runs/${project}/${env}/${dataSource}`);
  }

  runByService(project:string,env:string,service:string,dataSource:string,params:any) : Observable<BasicResult> {
    return this.httpClient.post<BasicResult>(`/runs/${project}/${env}/${service}/${dataSource}`,params,httpOptions);
  }

  debug(project:string,env:string,service:string,params:any) : Observable<BasicResult> {
    return this.httpClient.post<BasicResult>(`/runs/test/${project}/${env}/${service}`,params,httpOptions);
  }

}
