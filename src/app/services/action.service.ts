import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseMessage } from '../interfaces/responseMessage';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private apiServerUrl = `${environment.apiBaseUrl}`;
  public ticketId: number;
  public ticketName: string;

  constructor(private http: HttpClient) { }

  public getAllHistory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/history/${id}`);
  }

  public getAllComments(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServerUrl}/comments/${id}`);
  }

  public addComment(id: number, comment: string): Observable<ResponseMessage> {
    console.log(id, comment);
    return this.http.post<ResponseMessage>(`${this.apiServerUrl}/comments/${id}`, { comment: comment });
  }

  public downloadAttachment(id: number): Observable<Blob> {
    return this.http.get(`${this.apiServerUrl}/attachments/${id}`, { responseType: 'blob' });

  }

  public removeAttachment(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiServerUrl}/attachments/${id}`);
  }

  public addFeedback(rate: number, comment: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiServerUrl}/feedbacks/${this.ticketId}`, {rate: rate, comment: comment});
  }
}
