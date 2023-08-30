import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerInformationComponent } from './server-information.component';
import { ServerInformationService } from '../../services/server-information.service';
import { Store, StoreModule } from '@ngrx/store';
import { CompareState } from 'src/app/shared/store/compare.state';
import { addToCompare } from 'src/app/shared/store/compare.actions';

describe('ServerInformationComponent', () => {
  let component: ServerInformationComponent;
  let fixture: ComponentFixture<ServerInformationComponent>;
  let mockServerInformationService: jasmine.SpyObj<ServerInformationService>;
  let mockStore: jasmine.SpyObj<Store<{ compare: CompareState }>>;

  beforeEach(() => {
    mockServerInformationService = jasmine.createSpyObj('ServerInformationService', ['getServerInformation']);
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      declarations: [ServerInformationComponent],
      providers: [
        { provide: ServerInformationService, useValue: mockServerInformationService },
        { provide: Store, useValue: mockStore },
      ],
      imports: [StoreModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to compare', () => {
    const item = { id: 1, name: 'Server 1' };
    component.compareData = [];

    component.compareClick(item, { target: { checked: true } });

    expect(mockStore.dispatch).toHaveBeenCalledWith(addToCompare({ item }));
  });

  it('should show alert message when trying to compare more than 5 items', () => {
    component.compareData = [{}, {}, {}, {}, {}];
    const checkbox = { target: { checked: true } };

    component.compareClick({}, checkbox);

    expect(checkbox.target.checked).toBe(false);
    expect(component.alertMessage).toBe('Only five items are allow to compare at a time!');
  });
  
});
