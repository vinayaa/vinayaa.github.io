import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly emailService = inject(EmailService);

  menuOpen = false;
  emailFormOpen = false;
  emailSubmissionStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';

  readonly skills = [
    'Django',
    'Flask',
    'Angular',
    'Docker',
    'VS Code',
    'Git',
  ];

  readonly projects = [
    {
      number: '01',
      title: 'Audio Player with loop settings for each track',
      category: 'PRODUCT DESIGN',
      description: 'Set Loop counter for each track and play them in a loop. This project is built using Django, Docker, PostgreSQL and deployed on Render.',
      video: 'assets/projects_videos/merged_3_withtitles.mp4',
      development_tools: ['AI-powered VS Code GitHub Copilot',],
      tags: ['Django', 'Docker', 'PostgreSQL', 'Render Deployment',],
      link:'https://djangoaudioplayerweb.onrender.com/',
    },
    {
      number: '02',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      development_tools: ['VS Code Copilot'],
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design'],
      link:'https://djangoaudioplayerweb.onrender.com/',
    },
    {
      number: '03',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      development_tools: ['AI-powered VS Code GitHub Copilot'],
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design'],
      link:'https://djangoaudioplayerweb.onrender.com/',
    },
    {
      number: '04',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      development_tools: ['VS Code Copilot'],
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design'],
      link:'https://djangoaudioplayerweb.onrender.com/',
    }
  ];

  videoPageIndex = 0;

  get videoProjects(): typeof this.projects {
    return this.projects.filter((project) => project.video);
  }

  get showVideoSlider(): boolean {
    return this.videoProjects.length > 3;
  }

  get videoPages(): (typeof this.projects[number])[][] {
    const pages: (typeof this.projects[number])[][] = [];
    const videos = this.videoProjects;

    for (let index = 0; index < videos.length; index += 3) {
      pages.push(videos.slice(index, index + 3));
    }

    return pages;
  }

  showPreviousVideoPage(): void {
    this.videoPageIndex = Math.max(0, this.videoPageIndex - 1);
  }

  showNextVideoPage(): void {
    this.videoPageIndex = Math.min(this.videoPages.length - 1, this.videoPageIndex + 1);
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  showEmailForm(): void {
    this.emailFormOpen = true;
  }

  submitEmail(event: SubmitEvent, name: string, senderEmail: string, message: string): void {
    event.preventDefault();
    if (this.emailSubmissionStatus === 'submitting') {
      return;
    }

    this.emailSubmissionStatus = 'submitting';
    this.emailService.submitemailform({ name, email: senderEmail, message }).subscribe({
      next: (response) => {
        console.log(response,response.detail,response.successflag);
        this.emailSubmissionStatus = 'success';
      },
      error: () => {
        this.emailSubmissionStatus = 'error';
      }
    });
  }
}
