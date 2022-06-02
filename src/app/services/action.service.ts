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
  ticketId: number;
  ticketName: string;

  constructor(private http: HttpClient) { }

  getAllHistory(id: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.apiServerUrl}/history/${id}`);
  }

  getAllComments(id: number): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.apiServerUrl}/comments/${id}`);
  }

  addComment(id: number, comment: string): Observable<ResponseMessage> {
    console.log(id, comment);
    return this.http.post<ResponseMessage>(`${this.apiServerUrl}/comments/${id}`, { comment: comment });
  }

  downloadAttachment(id: number): Observable<Blob> {
    return this.http.get(this.apiServerUrl + '/attachments/' + id, { responseType: 'blob' });

  }

  removeAttachment(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiServerUrl}/attachments/${id}`);
  }

  addFeedback(rate: number, comment: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiServerUrl}/feedbacks/${this.ticketId}`, {rate: rate, comment: comment});
  }
}
