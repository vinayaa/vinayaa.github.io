import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(EmailService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('posts the contact message to the configured endpoint', () => {
    const message = {
      name: 'Alex',
      email: 'alex@example.com',
      message: 'Hello!'
    };

    service.submit(message).subscribe();

    const request = httpTestingController.expectOne(environment.contactApiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(message);
    request.flush(null);
  });
});
