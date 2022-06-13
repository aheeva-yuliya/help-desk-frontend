import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketOverviewComponent } from './ticket-overview.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TicketOverviewComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TicketOverviewRoutingModule { }
