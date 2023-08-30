import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constant/server-information.constant';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {
  
  private apiUrl = ApiUrl;

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  public getServerInformation(filter: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.httpClient.post<any>(`${this.apiUrl}/server-information`, filter, { headers });
  }

}
