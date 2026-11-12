import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly http = inject(HttpClient);

  submit(message: ContactMessage): Observable<void> {
    console.log('Submitting contact message:', message);
    return this.http.post<void>(environment.contactApiUrl, message);
  }
}
