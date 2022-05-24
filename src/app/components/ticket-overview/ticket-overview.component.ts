import { Component, OnInit, ViewChild } from '@angular/core';
import { OverviewResponse } from 'src/app/interfaces/overviewResponse';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.css']
})
export class TicketOverviewComponent implements OnInit {
  overview: OverviewResponse| undefined;
  listData: MatTableDataSource<any>;
  displayedColumns: string[];
  isValid: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private location: Location) { }

  ngOnInit(): void {
    this.getOverview();
  }

  getOverview(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.ticketService.getOverview(id).subscribe(
      (response: OverviewResponse) => {
        console.log('got responce', response);
        this.overview = response;
      }
    );
  }

  getHistoryData() {
    console.log(this.overview?.history);
    this.listData = new MatTableDataSource(this.overview?.history);
    console.log(this.listData);
    this.displayedColumns = ['date', 'user', 'action', 'description'];
    console.log(this.displayedColumns);
    this.isValid = true;
    this.listData.paginator = this.paginator;
  }

  getCommentsData() {
    this.listData = new MatTableDataSource(this.overview?.comments);
    this.displayedColumns = ['date', 'user', 'text'];
    this.isValid = false;
    this.listData.paginator = this.paginator;
  }

  getAll(id: number) {

  }

  goBack(): void {
    this.location.back();
  }
}
