import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { LogoutComponent } from '../../components/logout/logout.component';
import { TicketModule } from '../ticket/ticket.module';

@NgModule({
  declarations: [
    HomePageComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TicketModule
  ]
})
export class HomePageModule { }