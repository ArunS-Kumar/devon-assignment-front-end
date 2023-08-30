import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeFromCompare } from 'src/app/shared/store/compare.actions';
import { CompareState } from 'src/app/shared/store/compare.state';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {

  compareData!: any[];

  constructor(private store: Store<{ compare: CompareState }>) { }

  ngOnInit() {
    this.store.select('compare').subscribe(data => {
      this.compareData = data.compare;
      console.log(this.compareData);
    });
  }

  removeCompare(itemToRemove: any) {
    this.store.dispatch(removeFromCompare({ itemToRemove }));
  }

}
