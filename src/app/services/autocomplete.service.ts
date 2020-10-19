import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../common/result';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFieldsByService(projectName:string, serviceName: string): Observable<Result>{
    return this.httpClient.get<Result>(`/autocomplete/${projectName}/${serviceName}`);
  }
}
