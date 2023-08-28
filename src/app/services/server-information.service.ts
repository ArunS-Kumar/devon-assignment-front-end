import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {
  
  private apiUrl = 'http://localhost:8001';

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
