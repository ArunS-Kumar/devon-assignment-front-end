import { Component } from '@angular/core';
import { ServerInformationService } from '../../services/server-information.service';

@Component({
  selector: 'app-server-information',
  templateUrl: './server-information.component.html',
  styleUrls: ['./server-information.component.css']
})
export class ServerInformationComponent {

  serverInformation = [
    {
      A: "HP DL120G7Intel Xeon E3-1240",
      B: "16GBDDR3",
      C: "4x1TBSATA2",
      D: "Washington D.C.WDC-01",
      E: "$105.99"
    },
    {
      A: "Dell R210Intel Xeon X3430",
      B: "8GBDDR3",
      C: "2x500GBSATA2",
      D: "Washington D.C.WDC-01",
      E: "$55.99"
    },
    {
      A: "HP DL380eG82x Intel Xeon E5-2420",
      B: "32GBDDR3",
      C: "2x1TBSATA2",
      D: "Washington D.C.WDC-01",
      E: "$199.99"
    },
    {
      A: "IBM X3650M42x Intel Xeon E5-2620",
      B: "32GBDDR3",
      C: "2x1TBSATA2",
      D: "Washington D.C.WDC-01",
      E: "$220.99"
    }
  ];

  constructor(private readonly serverInformationService:ServerInformationService) { }

  ngOnInit() {
    this.getServerInformationList();
  }

  getServerInformationList() {
    let response = this.serverInformationService.getServerInformation();
    // this.serverInformation = response;
    console.log(this.serverInformation);
  }

}
