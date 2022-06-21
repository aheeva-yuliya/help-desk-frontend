import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TicketResponseDto } from '../interfaces/ticketResponseDto';
import { HttpHeaders } from '@angular/common/http';
import { ResponseMessage } from '../interfaces/responseMessage';
import { DatePipe } from '@angular/common';
import { OverviewResponse } from '../interfaces/overviewResponse';
import { UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl: string;
  private formData = new FormData();
  
  constructor(private http: HttpClient, private datePipe: DatePipe, @Inject('API') private apiBaseUrl: string) {
    this.apiServerUrl = `${this.apiBaseUrl}/tickets`;
   }

  public getFormData(): FormData {
    return this.formData;
  }

  public getAllTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(this.apiServerUrl);
  }

  public getMyTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(`${this.apiServerUrl}/my`);
  }

  public getOverview(id: number): Observable<OverviewResponse> {
    return this.http.get<OverviewResponse>(`${this.apiServerUrl}/${id}`);
  }

  public performAction(id: number, action: string): Observable<ResponseMessage> {
    console.log('came here');
    return this.http.patch<ResponseMessage>(`${this.apiServerUrl}/${id}?action=${action}`, new HttpHeaders({ 'Content-Type': 'application/json' }));
  }

  public sendTicketRequest(dto: FormData, action: string, id: number): Observable<ResponseMessage> {
    if (id === undefined) {
      return this.http.post<ResponseMessage>(`${this.apiServerUrl}/?action=${action}`, dto);
    } else {
      return this.http.put<ResponseMessage>(`${this.apiServerUrl}/${id}/?action=${action}`, dto);
    }
  }

  public createDto(action: string, form: UntypedFormGroup, id: number): Observable<ResponseMessage> {
    const dateValue = form.value.desiredResolutionDate == "" ? "" : this.datePipe.transform(form.value.desiredResolutionDate, 'yyyy-MM-dd');

    if (dateValue !== null) {
      this.formData.append('desiredResolutionDate', dateValue);
    }

    this.formData.append('category', form.get('category')?.value);

    const name = form.get('name')?.value;

    if (name !== null) {
      this.formData.append('name', name);
    }

    const description = form.get('description')?.value;

    if (description !== null) {
      this.formData.append('description', description);
    }
   
    this.formData.append('urgency', form.get('urgency')?.value);
    this.formData.append('comment', form.get('comment')?.value);

    return this.sendTicketRequest(this.formData, action, id);
  }
}
