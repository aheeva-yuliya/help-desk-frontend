import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketOverviewComponent } from './ticket-overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { TicketOverviewRoutingModule } from './ticket-overview-routing.module';

@NgModule({
  declarations: [TicketOverviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TicketOverviewRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TicketOverviewModule { }
