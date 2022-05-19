import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TicketService } from 'src/app/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketFormService } from 'src/app/services/ticket-form.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  selectedAction: string = '';
  responseMessage: string;
  isAllTickets: boolean;

  searchKey: string;

  listData: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'date', 'urgency', 'status', 'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private ticketForm: TicketFormService) {
  }

  ngOnInit(): void {
  }

  getAllTickets() {
    this.ticketService.getAllTickets()
      .subscribe(response => {
        console.log('got responce', response);
        this.listData = new MatTableDataSource(response);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.isAllTickets = true;
      });
  }

  getMyTickets() {
    this.ticketService.getMyTickets()
      .subscribe(response => {
        console.log('got responce', response);
        this.listData = new MatTableDataSource(response);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

        this.isAllTickets = false;
      })
  }

  performAction(id: number) {
    console.log(id);
    console.log(this.selectedAction);

    this.ticketService.performAction(id, this.selectedAction)
      .subscribe(response => {
        console.log(response.message);
        this.responseMessage = response.message;
      });
  }

  onDeleteMessage() {
    this.responseMessage = '';

    if (this.isAllTickets) {
      this.getAllTickets();
    } else {
      this.getMyTickets();
    }
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.dialog.open(TicketComponent, {
      height: '80%',
      width: '80%'
    });
    console.log(this.ticketForm);
  }
}
