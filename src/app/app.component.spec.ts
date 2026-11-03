import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('creates the portfolio page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#hero-title')?.textContent).toContain('Thoughtful interfaces.');
  });

  it('uses the configured email address for the Say hello link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const sayHelloLink = fixture.nativeElement.querySelector('.button-light') as HTMLAnchorElement;

    expect(sayHelloLink.href).toBe('mailto:vinayasawant08@gmail.com');
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
