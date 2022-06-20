import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TicketResponseDto } from '../interfaces/ticketResponseDto';
import { HttpHeaders } from '@angular/common/http';
import { UntypedFormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { ResponseMessage } from '../interfaces/responseMessage';
import { DatePipe } from '@angular/common';
import { OverviewResponse } from '../interfaces/overviewResponse';


const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl: string;
  private formData = new FormData();
  private id: number;
  public title: string;

  public form: UntypedFormGroup = new UntypedFormGroup({
    category: new UntypedFormControl(null, Validators.required),
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    description: new UntypedFormControl('', [Validators.minLength(0), Validators.maxLength(500)]),
    urgency: new UntypedFormControl(null, Validators.required),
    desiredResolutionDate: new UntypedFormControl(),
    attachment: new UntypedFormControl(File),
    comment: new UntypedFormControl()
  });

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
    return this.http.patch<ResponseMessage>(`${this.apiServerUrl}/${id}?action=${action}`, httpOptionsJson);
  }

  public sendTicketRequest(dto: FormData, action: string): Observable<ResponseMessage> {
    console.log('sending ', dto);
    console.log();
    if (this.id === undefined) {
      return this.http.post<ResponseMessage>(`${this.apiServerUrl}/?action=${action}`, dto);
    } else {
      return this.http.put<ResponseMessage>(`${this.apiServerUrl}/${this.id}/?action=${action}`, dto);
    }
  }

  public createDto(action: string): Observable<ResponseMessage> {
    const dateValue = this.form.value.desiredResolutionDate == "" ? "" : this.datePipe.transform(this.form.value.desiredResolutionDate, 'yyyy-MM-dd');

    if (dateValue !== null) {
      console.log('append');
      this.formData.append('desiredResolutionDate', dateValue);
    }

    this.formData.append('category', this.form.get('category')?.value);

    const name = this.form.get('name')?.value;

    if (name !== null) {
      this.formData.append('name', name);
    }

    const description = this.form.get('description')?.value;

    if (description !== null) {
      this.formData.append('description', description);
    }
   
    this.formData.append('urgency', this.form.get('urgency')?.value);
    this.formData.append('comment', this.form.get('comment')?.value);

    this.form.reset();

    return this.sendTicketRequest(this.formData, action);
  }

  public initializeForm() {
    this.title = 'Create New Ticket';
    this.form.reset();
  }

  public populateForm(overview: any) {
    this.form.setValue({
      name: overview.name,
      category: overview.category,
      description: overview.description,
      urgency: overview.urgency,
      desiredResolutionDate: overview.desiredResolutionDate,
      attachment: null,
      comment: null
    });
    this.id = overview.id;
    this.title = 'Edit Ticket #' + this.id;
  }
}
