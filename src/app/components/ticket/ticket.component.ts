import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  categories = [
    { value: "Application & Services" },
    { value: "Benefits & Paper Work" },
    { value: "Hardware & Software" },
    { value: "People Management" },
    { value: "Security & Access" },
    { value: "Workplaces & Facilities" }
  ];

  urgencies = [
    { value: "Critical" },
    { value: "High" },
    { value: "Average" },
    { value: "Low" }
  ];

  fileName: any;

  constructor(public service: TicketService, public dialogRef: MatDialogRef<TicketComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(action: string) {
    this.dialogRef.close();
    this.service.createDto(action);
  }

  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    console.log(file);
    this.fileName = file.name;
    this.service.getFormData().append('attachment', file);
  }

}
