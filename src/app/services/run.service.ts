import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { httpOptions} from './http-option';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RunService {

  constructor(private httpClient: HttpClient) { }

  rerunByRunsetId(id: string): Observable<Result> {
    return this.httpClient.get<Result>('/runs/rerun/' + id);
  }

  cancelByRunsetId(id: string): Observable<Result> {
    return this.httpClient.get<Result>('/runs/cancel/' + id);
  }

  runOnAllService(project:string,env:string,dataSource:string) : Observable<Result> {
    return this.httpClient.get<Result>(`/runs/${project}/${env}/${dataSource}`);
  }

  runByService(project:string,env:string,service:string,dataSource:string,params:any) : Observable<Result> {
    return this.httpClient.post<Result>(`/runs/${project}/${env}/${service}/${dataSource}`,params,httpOptions);
  }

  debug(project:string,env:string,service:string,params:any) : Observable<Result> {
    return this.httpClient.post<Result>(`/runs/test/${project}/${env}/${service}`,params,httpOptions);
  }

}
