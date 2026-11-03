import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;
  readonly contactEmail = environment.contactEmail;

  readonly skills = [
    'Django',
    'Flask',
    'Angular',
    'HTML & CSS',
    'Git',
  ];

  readonly projects = [
    {
      number: '01',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design']
    },
    {
      number: '02',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design']
    },
    {
      number: '03',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design']
    },
    {
      number: '04',
      title: 'The dashboard',
      category: 'PRODUCT DESIGN',
      description: 'A clear, data-rich workspace designed to make everyday decisions feel simple.',
      video: 'assets/projects_videos/sample1.mp4',
      tags: ['Angular', 'TypeScript', 'UI design']
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
}
