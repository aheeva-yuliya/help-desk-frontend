import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TicketService } from 'src/app/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  userRole: boolean;
  selectedAction: string = '';
  responseMessage: string;

  searchKey: string;

  listData: MatTableDataSource<any>;

  isAllTickets: boolean;

  displayedColumns: string[] = ['id', 'name', 'date', 'urgency', 'status', 'action', 'overview'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private storage: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log(this.storage.getRole());
    console.log(this.storage.getRole() === 'EMPLOYEE');
    this.userRole = this.storage.getRole() == 'EMPLOYEE' || this.storage.getRole() == 'MANAGER';
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

  getTicketOverview(id: number) {
    console.log(id);
    this.ticketService.getOverview(id);
  }

  performAction(id: number) {
    console.log(id);
    console.log(this.selectedAction);

    this.ticketService.performAction(id, this.selectedAction).subscribe(
      (response) => {
        console.log(response.message);
        this.responseMessage = response.message;
        this.selectedAction = '';
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.responseMessage = error.error.message;
        this.selectedAction = '';
      }
    );
  }

  onDeleteMessage() {
    this.responseMessage = '';
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";
    this.dialog.open(TicketComponent, dialogConfig);
  }
}
