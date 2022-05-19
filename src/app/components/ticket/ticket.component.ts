import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketFormService } from 'src/app/services/ticket-form.service';

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

  constructor(public service: TicketFormService) { }

  ngOnInit(): void {
  }

  onSubmit(action: string) {
    console.log(action);
  }

}
