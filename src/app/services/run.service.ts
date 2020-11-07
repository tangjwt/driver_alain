import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { httpOptions} from './http-option';
import { Observable } from 'rxjs';
import { Result } from '../common/result';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RunService {

  constructor(private httpClient: HttpClient) { }

  rerunByRunsetId(id: string,failedOnly: string): Observable<Result> {
    const httpOption = {
      params: new HttpParams()
        .set('failedOnly', failedOnly)
    };
    return this.httpClient.get<Result>('/runs/rerun/' + id,httpOption);
  }

  cancelByRunsetId(id: string): Observable<Result> {
    return this.httpClient.get<Result>('/runs/cancel/' + id);
  }

  runOnAllService(project:string,env:string,dataSource:string) : Observable<Result> {
    return this.httpClient.get<Result>(`/runs/${project}/${env}/${encodeURIComponent(dataSource)}`);
  }

  runByService(project:string,env:string,service:string,dataSource:string,params:any) : Observable<Result> {
    return this.httpClient.post<Result>(`/runs/${project}/${env}/${service}/${encodeURIComponent(dataSource)}`,params,httpOptions);
  }

  debug(project:string,env:string,service:string,params:any) : Observable<Result> {
    return this.httpClient.post<Result>(`/runs/test/${project}/${env}/${service}`,params,httpOptions);
  }

  debugTestng(project:string,dataSource:string,service:string,params:any) : Observable<Result> {
    return this.httpClient.post<Result>(`/runs/test/${project}/${encodeURIComponent(dataSource)}/${service}/testng`,params,httpOptions);
  }
}
