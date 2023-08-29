import { Component } from '@angular/core';
import { ServerInformationService } from '../../services/server-information.service';

@Component({
    selector: 'app-server-information',
    templateUrl: './server-information.component.html',
    styleUrls: ['./server-information.component.css']
})
export class ServerInformationComponent {

    serverInformation: string[] = [];
    filterInformation: any;
    storageFilter = '';
    lastRow: number = 0;
    displayLoadMore = true;

    filterData: any = {
        "storage": '',
        "harddisk_type": '',
        "location": '',
        "ram": '',
        "limit": 10,
        "start_row": 0
    };

    constructor(private readonly serverInformationService: ServerInformationService) { }

    ngOnInit() {
        this.getServerInformationList();
    }

    getServerInformationList() {
        this.displayLoadMore = true;
        this.serverInformationService.getServerInformation(
            this.filterData,
        ).subscribe((apiResponse) => {
            this.filterInformation = apiResponse['filterInformation'];
            this.serverInformation = this.serverInformation.concat(apiResponse['serverInformation'].items);
            if (this.filterData.limit > apiResponse['serverInformation'].items.length || apiResponse['serverInformation'].items.length == 0) {
                console.log(apiResponse['serverInformation'].items.length);
                this.displayLoadMore = false;
            }
            console.log(apiResponse['serverInformation'].items.length);
            this.lastRow = apiResponse['serverInformation'].lastRow;
        });
        window.scrollTo(0, document.body.scrollHeight);
    }

    receiveStorageData(data: any) {
        this.serverInformation = [];

        this.filterData['start_row'] = 0;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (this.filterData.hasOwnProperty(key)) {
                    this.filterData[key] = data[key];
                }
            }
        }

        this.getServerInformationList();
    }

    loadMoreClick(): void {
        this.filterData['start_row'] = this.lastRow + 1;
        this.getServerInformationList();
    }

    compareClick(item: any): void {
        console.log(item);
    }
}
