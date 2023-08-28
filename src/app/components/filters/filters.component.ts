import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {

  storageFilterMax!: number;
  storageRngeValue: number = 0;
  storageRngeDisplay = '0 - 0';
  ram = [];
  ramCheckedValues = [];
  hardDiskOptions = [];
  hardDiskSelect = '';
  locationSelect = '';
  locationOptions = [];

  storageFilterData = '';
  hddFilterData = '';
  locationFilterData = '';
  ramFilterData = '';

  @Input() filterInformation: any;

  @Output() dataEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.storageFilterMax = this.filterInformation[0].value.length - 1;
    this.ram = this.filterInformation[1].value;
    this.hardDiskOptions = this.filterInformation[2].value;
    this.locationOptions = this.filterInformation[3].value;
  }

  storageRngeChange(storageKey: number) {
    this.storageRngeDisplay = `${this.filterInformation[0].value[0]} - ${this.filterInformation[0].value[storageKey]}`;
    let storageValue = [];
    for (let index = 0; index <= storageKey; index++) {
      storageValue.push(this.filterInformation[0].value[index]);
    }

    this.storageFilterData = storageValue.join(',');
    this.sendFilterData();
  }

  onRamCheckboxChange(isChecked: any, ramKey: string) {
    let ramValue = this.ram[Number(ramKey)];
    if (isChecked.target.checked) {
      this.ramCheckedValues.push(ramValue);
    } else {
      this.ramCheckedValues.splice(this.ramCheckedValues.indexOf(ramValue), 1);
    }

    this.ramFilterData = this.ramCheckedValues.join(',');
    this.sendFilterData();
  }

  onHddSelected(event: any) {
    this.hddFilterData = event.target.value;
    this.sendFilterData();
  }

  onLocationSelected(event: any)
  {
    this.locationFilterData = event.target.value;
    this.sendFilterData();
  }


  sendFilterData()
  {
    let filterData = {
      "storage": this.storageFilterData, 
      "harddisk_type": this.hddFilterData, 
      "location": this.locationFilterData,
      "ram": this.ramFilterData
    };
    this.dataEvent.emit(filterData);
  }
}
