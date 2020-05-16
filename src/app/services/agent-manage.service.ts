import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from './http-option';
import { Result } from '../common/result';
import { Observable } from 'rxjs';

@Injectable()
export class AgentManageService {

  constructor(private httpClient:HttpClient) { }

  getAgentList():Observable<Result>{
    return this.httpClient.get<Result>('/agent');
  }

}
