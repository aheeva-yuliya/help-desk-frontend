import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FeedbackComponent>, private fb: FormBuilder) {
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.form.value.rating);
    this.dialogRef.close();
  }
}
