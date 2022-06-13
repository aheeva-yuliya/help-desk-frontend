import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionService } from 'src/app/services/action.service';
import { NotificationService } from 'src/app/services/notification-service.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  public form: FormGroup;
  public comment: string;

  constructor(private dialogRef: MatDialogRef<FeedbackComponent>, private fb: FormBuilder,
    public service: ActionService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  public onClose() {
    this.dialogRef.close();
  }

  public onSubmit() {
    this.dialogRef.close();
    this.service.addFeedback(this.form.value.rating, this.comment).subscribe(
      response => {
        this.notificationService.success(`:: ${response.message}`);
      }),
      (error: any) => {
        this.notificationService.warn(`:: ${error.message}`);
      }
  }
}
