import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { TicketComponent } from './ticket.component';

@NgModule({
  declarations: [
   TicketComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketModule { }