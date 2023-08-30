import { Component } from '@angular/core';
import { ServerInformationService } from '../../services/server-information.service';
import { Store } from '@ngrx/store';
import { addToCompare } from 'src/app/shared/store/compare.actions';
import { CompareState } from 'src/app/shared/store/compare.state';

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
    compareData!: any[];
    alertMessage!: string;

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
            this.compareData = data.compare;
        })
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
                this.displayLoadMore = false;
            }
            this.lastRow = apiResponse['serverInformation'].lastRow;
        });
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

    compareClick(item: any, checkbox: any): void {
        if(this.compareData.length < 5) {
            this.store.dispatch(addToCompare({ item }));
        } else {
            checkbox.target.checked = false;
            this.alertMessage = 'Only five items are allow to compare at a time!'
            setTimeout(() => {
                this.alertMessage = '';
              }, 4000); 
        }
    }
}
