import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparisonComponent } from './comparison.component';
import { Store, StoreModule } from '@ngrx/store';
import { compareReducer } from 'src/app/shared/store/compare.reducer';
import { removeFromCompare } from 'src/app/shared/store/compare.actions';

describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComparisonComponent],
      imports: [
        StoreModule.forRoot({ compare: compareReducer }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch remove action on removeCompare', () => {
    spyOn(store, 'dispatch');

    const itemToRemove = { id: 1, name: 'Server 1' };
    component.removeCompare(itemToRemove);

    expect(store.dispatch).toHaveBeenCalledWith(removeFromCompare({ itemToRemove }));
  });
});
