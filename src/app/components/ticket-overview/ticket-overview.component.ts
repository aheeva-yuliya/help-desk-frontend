import { Component, OnInit, ViewChild } from '@angular/core';
import { OverviewResponse } from 'src/app/interfaces/overviewResponse';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActionService } from 'src/app/services/action.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { NotificationService } from 'src/app/services/notification-service.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.css']
})
export class TicketOverviewComponent implements OnInit {
  overview: OverviewResponse;
  listData: MatTableDataSource<any>;
  displayedColumns: string[];
  isValid: boolean;
  isDraft: boolean;
  isDone: boolean;
  id: number;
  attachments: { id: number, name: string }[];
  comment: string;
  comments: {}[];
  history: {}[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,private ticketService: TicketService,
     private actionService: ActionService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getOverview();
  }

  getOverview(): void {
    console.log(this.route.snapshot.paramMap);
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.ticketService.getOverview(id).subscribe(
      (response: OverviewResponse) => {
        console.log('got responce', response);
        this.overview = response;
        this.id = this.overview.id;
        this.attachments = this.overview.attachments;
        this.comments = this.overview.comments;
        this.history = this.overview.history;
        this.isDraft = this.overview.status === 'DRAFT';
        this.isDone = this.overview.status === 'DONE';
        this.getHistoryData();
      }
    );
  }

  getHistoryData() {
    this.listData = new MatTableDataSource(this.history);
    this.displayedColumns = ['date', 'user', 'action', 'description'];
    this.isValid = true;
    this.listData.paginator = this.paginator;
  }

  getCommentsData() {
    this.listData = new MatTableDataSource(this.comments);
    this.displayedColumns = ['date', 'user', 'text'];
    this.isValid = false;
    this.listData.paginator = this.paginator;
  }

  getAll() {
    if (this.isValid) {
      this.actionService.getAllHistory(this.id).subscribe(
        response => {
          console.log('got response', response);
          this.history = response.sort((a, b) => a.date > b.date ? -1 : 1);;
          this.getHistoryData();
        }
      )
    } else {
      this.actionService.getAllComments(this.id).subscribe(
        response => {
          console.log('got response', response);
          this.comments = response.sort((a, b) => a.date > b.date ? -1 : 1);
          this.getCommentsData();
        }
      )
    }
  }

  onEdit() {
    this.ticketService.populateForm(this.overview);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";
    this.dialog.open(TicketComponent, dialogConfig);
  }

  onLeaveFeedback() {
    this.actionService.ticketId = this.id;
    this.actionService.ticketName = this.overview.name;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.height = "80%";
    this.dialog.open(FeedbackComponent, dialogConfig);
  }

  removeAttachment(id: number) {
    this.actionService.removeAttachment(id).subscribe(
      response => {
      this.notificationService.success(`:: ${response.message}`);
      this.getOverview();
    }),
      (error: any) => this.notificationService.warn(`:: ${error.message}`);
  }

  downloadAttachment(id: number, name: string) {
    this.actionService.downloadAttachment(id).subscribe(
      (response: any) => {
        const blob: any = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        saveAs(blob, name);
      }),
      (error: any) => this.notificationService.warn(`:: ${error.message}`);;
  }

  addComment() {
    this.actionService.addComment(this.id, this.comment).subscribe(
      (response: any) => {
        console.log(response.message);
        this.notificationService.success(`:: ${response.message}`);
        this.getAll();
      }),
      (error: any) => {
        this.notificationService.warn(`:: ${error.message}`);
      };
    this.comment = '';
  }
}
