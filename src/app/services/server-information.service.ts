import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {

  constructor() { }

  public getServerInformation() {
    let value = [
      { name: 'Jane', age: 25 },
      { name: 'Mike', age: 40 }
    ];
    
    return value;
  }
}
