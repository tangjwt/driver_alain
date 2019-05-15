import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicResult } from '../common/basic-result';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFieldsByService(serviceName: string): Observable<BasicResult>{
    return this.httpClient.get<BasicResult>(`/autocomplete/${serviceName}`);
  }
}
