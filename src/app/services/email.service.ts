import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface EmailFormrRsponse{
    name: string;
    email: string;
    message: string;
    created_at: string;
    notification_sent: boolean;
    detail: string;
    successflag:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly http = inject(HttpClient);

  submitemailform(message: ContactMessage): Observable<EmailFormrRsponse> {
    console.log('Submitting contact message:', message);
    console.log('Contact API URL:', environment.contactApiUrl);
    return this.http.post<EmailFormrRsponse>(environment.contactApiUrl, message);
  }
}
