import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { EmailService } from './services/email.service';

describe('AppComponent', () => {
  let emailService: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    emailService = jasmine.createSpyObj<EmailService>('EmailService', ['submit']);
    emailService.submit.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: EmailService, useValue: emailService }]
    }).compileComponents();
  });

  it('creates the portfolio page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#hero-title')?.textContent).toContain('Thoughtful interfaces.');
  });

  it('opens the compact email form from the Say hello button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const sayHelloButton = fixture.nativeElement.querySelector('.button-light') as HTMLButtonElement;

    expect(fixture.nativeElement.querySelector('#email-form')).toBeNull();
    expect(sayHelloButton.getAttribute('aria-expanded')).toBe('false');
    sayHelloButton.click();
    fixture.detectChanges();

    const emailForm = fixture.nativeElement.querySelector('#email-form') as HTMLFormElement;
    const contactTitle = fixture.nativeElement.querySelector('#contact-title') as HTMLElement;
    const contactButton = fixture.nativeElement.querySelector('.button-light') as HTMLButtonElement;

    expect(emailForm).toBeTruthy();
    expect(contactTitle.compareDocumentPosition(emailForm) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(emailForm.compareDocumentPosition(contactButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(sayHelloButton.getAttribute('aria-expanded')).toBe('true');

    sayHelloButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#email-form')).toBeTruthy();

    (emailForm.querySelector('.email-form-close') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#email-form')).toBeNull();
  });

  it('submits the email form through EmailService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.button-light').click();
    fixture.detectChanges();

    const emailForm = fixture.nativeElement.querySelector('#email-form') as HTMLFormElement;
    const name = emailForm.querySelector('[name="name"]') as HTMLInputElement;
    const senderEmail = emailForm.querySelector('[name="email"]') as HTMLInputElement;
    const message = emailForm.querySelector('[name="message"]') as HTMLTextAreaElement;
    name.value = 'Alex';
    senderEmail.value = 'alex@example.com';
    message.value = 'I would like to talk about a project.';

    emailForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(emailService.submit).toHaveBeenCalledWith({
      name: 'Alex',
      email: 'alex@example.com',
      message: 'I would like to talk about a project.'
    });
    expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('message has been sent');
  });

  it('shows an error when email submission fails', () => {
    emailService.submit.and.returnValue(throwError(() => new Error('Request failed')));
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.button-light').click();
    fixture.detectChanges();
    const emailForm = fixture.nativeElement.querySelector('#email-form') as HTMLFormElement;

    emailForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain('could not be sent');
  });

  it('shows all videos in a slider when there are more than three', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.project-carousel .project-card').length).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('.project-carousel-page').length).toBe(2);
    expect(fixture.nativeElement.querySelector('[aria-live="polite"]')?.textContent).toContain('Showing 1–3 of 4 videos');

    const nextButton = fixture.nativeElement.querySelector('[aria-label="Next videos"]') as HTMLButtonElement;
    nextButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-live="polite"]')?.textContent).toContain('Showing 4–4 of 4 videos');
    expect(fixture.nativeElement.querySelector('.project-carousel-track')?.getAttribute('style')).toContain('translateX(-100%)');
  });

  it('keeps the project grid when there are three videos or fewer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.projects.pop();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.project-carousel')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.project-grid .project-card').length).toBe(3);
  });

  it('renders the project video from the assets folder with playback controls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const video = fixture.nativeElement.querySelector('video') as HTMLVideoElement;

    expect(video).toBeTruthy();
    expect(video.controls).toBeTrue();
    expect(video.querySelector('source')?.getAttribute('src')).toBe('assets/projects_videos/sample1.mp4');
  });

  it('closes the mobile menu when a navigation link is selected', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.menuOpen = true;

    fixture.componentInstance.closeMenu();

    expect(fixture.componentInstance.menuOpen).toBeFalse();
  });
});
