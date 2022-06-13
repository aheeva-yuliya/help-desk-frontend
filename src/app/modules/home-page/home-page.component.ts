import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TicketService } from 'src/app/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketComponent } from '../../components/ticket/ticket.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  public userRole: boolean;
  public selectedAction: string = '';
  public responseMessage: string;

  public searchKey: string;

  public listData: MatTableDataSource<any>;

  public isAllTickets: boolean;

  public displayedColumns: string[] = ['id', 'name', 'date', 'urgency', 'status', 'action', 'overview'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private storage: TokenStorageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userRole = this.storage.getRole() == 'EMPLOYEE' || this.storage.getRole() == 'MANAGER';
    const param = this.route.snapshot.paramMap.get('');
    if (param === 'my') {
      this.getMyTickets();
    } else {
      this.getAllTickets();
    }
  }

  public getAllTickets() {
    this.ticketService.getAllTickets()
      .subscribe(response => {
        console.log('got responce', response);
        this.listData = new MatTableDataSource(response);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.isAllTickets = true;
      });
  }

  public getMyTickets() {
    this.ticketService.getMyTickets()
      .subscribe(response => {
        console.log('got responce', response);
        this.listData = new MatTableDataSource(response);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.isAllTickets = false;
      })
  }

  public getTicketOverview(id: number) {
    console.log(id);
    this.ticketService.getOverview(id);
  }

  public performAction(id: number) {
    console.log(id);
    console.log(this.selectedAction);

    this.ticketService.performAction(id, this.selectedAction).subscribe(
      (response) => {
        console.log(response.message);
        this.responseMessage = response.message;
        this.selectedAction = '';
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.responseMessage = error.error.message;
        this.selectedAction = '';
      }
    );
  }

  public onDeleteMessage() {
    this.responseMessage = '';
    if (this.isAllTickets) {
      this.getAllTickets();
    } else {
      this.getMyTickets();
    }
  }

  public onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  public onCreate() {
    this.ticketService.initializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";
    this.dialog.open(TicketComponent, dialogConfig);
  }

  public applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
