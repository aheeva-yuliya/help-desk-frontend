import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { NotificationService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  public categories = [
    { value: "Application & Services" },
    { value: "Benefits & Paper Work" },
    { value: "Hardware & Software" },
    { value: "People Management" },
    { value: "Security & Access" },
    { value: "Workplaces & Facilities" }
  ];

  public urgencies = [
    { value: "Critical" },
    { value: "High" },
    { value: "Average" },
    { value: "Low" }
  ];

  public fileName: string;

  constructor(public service: TicketService, private dialogRef: MatDialogRef<TicketComponent>, private notificationService: NotificationService) { }

  public onSubmit(action: string) {
    this.dialogRef.close();
    this.service.createDto(action).subscribe(
      response => {
        console.log(response.message);
        window.location.reload();
      }),
      (error: any) => {
        this.notificationService.warn(`:: ${error.message}`);
      }
  }

  public onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    this.fileName = file.name;
    this.service.getFormData().append('attachment', file);
  }

}
