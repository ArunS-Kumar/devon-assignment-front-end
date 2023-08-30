import { TestBed } from '@angular/core/testing';
import { ServerInformationService } from './server-information.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiUrl } from '../constant/server-information.constant';

describe('ServerInformationService', () => {
  let service: ServerInformationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServerInformationService],
    });

    service = TestBed.inject(ServerInformationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the API', () => {
    const mockFilter = { storage: 'SSD', location: 'Location A' };
    const mockResponse = { serverInformation: ['server1', 'server2'] };

    service.getServerInformation(mockFilter).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${ApiUrl}/server-information`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockFilter);

    req.flush(mockResponse);
  });
});
