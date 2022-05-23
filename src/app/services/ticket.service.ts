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


const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl = `${environment.apiBaseUrl}/tickets`;

  form: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    description: new FormControl(null, [Validators.minLength(0), Validators.maxLength(500)]),
    urgency: new FormControl(null, Validators.required),
    desiredResolutionDate: new FormControl(''),
    attachment: new FormControl(null),
    comment: new FormControl(null)
  });

  constructor(private http: HttpClient, private notificationService: NotificationService, private datePipe: DatePipe) { }

  getAllTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(this.apiServerUrl);
  }

  getMyTickets(): Observable<Array<TicketResponseDto>> {
    return this.http.get<Array<TicketResponseDto>>(`${this.apiServerUrl}/my`);
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
    let formData: any = new FormData();
    console.log(this.form.value.desiredResolutionDate == "" ? "" : this.datePipe.transform(this.form.value.desiredResolutionDate, 'yyyy-MM-dd'));


    Object.keys(this.form.controls).forEach(formControlName => {
      if (formControlName == 'desiredResolutionDate') {
        const value = this.form.value.desiredResolutionDate == "" ? "" : this.datePipe.transform(this.form.value.desiredResolutionDate, 'yyyy-MM-dd');
        console.log(value);
        if (value !== null) { 
          formData.append('desiredResolutionDate', value); 
        }
      } else {
        formData.append(formControlName, this.form.get(formControlName)?.value);
      }
    });

    if (formData.get('attachment').value === undefined) {
      formData.delete('attachment');
    }

    this.sendTicketRequest(formData, action)
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
