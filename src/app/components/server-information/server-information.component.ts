import { Component } from '@angular/core';
import { ServerInformationService } from '../../services/server-information.service';
import { Store } from '@ngrx/store';
import { addToCompare } from 'src/app/shared/store/compare.actions';
import { CompareState } from 'src/app/shared/store/compare.state';
import { ServerInformation } from 'src/app/server-information.model';

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
    counterDisplay = 0;
    compareDisplay!: any[];

    filterData: any = {
        "storage": '',
        "harddisk_type": '',
        "location": '',
        "ram": '',
        "limit": 10,
        "start_row": 0
    };

    constructor(private readonly serverInformationService: ServerInformationService, private store: Store<{ compare: CompareState }>) { }

    ngOnInit() {
        this.store.select('compare').subscribe(data => {
            console.log(data.compare);
            this.compareDisplay = data.compare;
        })
        this.getServerInformationList();
    }

    getServerInformationList() {
        this.displayLoadMore = true;
        this.serverInformationService.getServerInformation(
            this.filterData,
        ).subscribe((apiResponse) => {
            this.filterInformation = apiResponse['filterInformation'];
            let serverInformationRes = apiResponse['serverInformation'].items.map((data: any) => {
                return [
                    data.id,
                    data.model,
                    data.ram,
                    data.hdd,
                    data.location,
                    data.price
                ]
            });
            this.serverInformation = this.serverInformation.concat(serverInformationRes);
            if (this.filterData.limit > apiResponse['serverInformation'].items.length || apiResponse['serverInformation'].items.length == 0) {
                this.displayLoadMore = false;
            }
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
        this.store.dispatch(addToCompare({ item }));
    }
}
