import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketOverviewComponent } from './ticket-overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketOverviewRoutingModule } from './ticket-overview-routing.module';
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { TicketModule } from '../ticket/ticket.module';

@NgModule({
  declarations: [TicketOverviewComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TicketOverviewRoutingModule,
    ReactiveFormsModule,
    TicketModule,
    NgxStarRatingModule,
  ]
})
export class TicketOverviewModule { }
