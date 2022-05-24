import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TicketResponseDto } from '../interfaces/ticketResponseDto';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ResponseMessage } from '../interfaces/responseMessage';
import { NotificationService } from './notification-service.service';
import { DatePipe } from '@angular/common';
import { OverviewResponse } from '../interfaces/overviewResponse';


const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl = `${environment.apiBaseUrl}/tickets`;

  private formData = new FormData();

  overview: OverviewResponse;

  lastTypeOfTickets: string

  form: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    description: new FormControl(null, [Validators.minLength(0), Validators.maxLength(500)]),
    urgency: new FormControl(null, Validators.required),
    desiredResolutionDate: new FormControl(''),
    attachment: new FormControl(File),
    comment: new FormControl(null)
  });

  constructor(private http: HttpClient, private notificationService: NotificationService, private datePipe: DatePipe) { }

  getFormData(): FormData {
    return this.formData;
  }

  getAllTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(this.apiServerUrl);
  }

  getMyTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(`${this.apiServerUrl}/my`);
  }

  getOverview(id: number): Observable<OverviewResponse> {
    return this.http.get<OverviewResponse>(`${this.apiServerUrl}/${id}`);
  }

  performAction(id: number, action: string): Observable<ResponseMessage> {
    console.log('came here');
    return this.http.patch<ResponseMessage>(`${this.apiServerUrl}/${id}?action=${action}`, httpOptionsJson);
  }

  sendTicketRequest(dto: FormData, action: string) {
    console.log('sending ', dto);
    return this.http.post<ResponseMessage>(`${this.apiServerUrl}/?action=${action}`, dto)
  }

  createDto(action: string) {
    const dateValue = this.form.value.desiredResolutionDate == "" ? "" : this.datePipe.transform(this.form.value.desiredResolutionDate, 'yyyy-MM-dd');
    console.log(dateValue);

    if (dateValue !== null) {
      this.formData.append('desiredResolutionDate', dateValue);
    }

    this.formData.append('category', this.form.get('category')?.value);
    this.formData.append('name', this.form.get('name')?.value);
    this.formData.append('urgency', this.form.get('urgency')?.value);
    this.formData.append('description', this.form.get('description')?.value);
    this.formData.append('comment', this.form.get('comment')?.value);

    this.sendTicketRequest(this.formData, action)
      .subscribe(response => {
        console.log(response.message);
        this.notificationService.success(`:: ${response.message}`);
        this.form.reset();
      },
        (error: HttpErrorResponse) => {
          this.notificationService.warn(`:: ${error.message}`);
          this.form.reset();
        });
  }
}
