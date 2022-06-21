import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { NotificationService } from 'src/app/services/notification-service.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { OverviewResponse } from 'src/app/interfaces/overviewResponse';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  public categories = [
    { value: "Application & Services" },
    { value: "Benefits & Paper Work" },
    { value: "Hardware & Software" },
    { value: "People Management" },
    { value: "Security & Access" },
    { value: "Workplaces & Facilities" }
  ];

  public urgencies = [
    { value: "Critical" },
    { value: "High" },
    { value: "Average" },
    { value: "Low" }
  ];

  public fileName: string;

  public title: string;
  public id: number;

  public form: UntypedFormGroup = new UntypedFormGroup({
    category: new UntypedFormControl(null, Validators.required),
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    description: new UntypedFormControl('', [Validators.minLength(0), Validators.maxLength(500)]),
    urgency: new UntypedFormControl(null, Validators.required),
    desiredResolutionDate: new UntypedFormControl(),
    attachment: new UntypedFormControl(File),
    comment: new UntypedFormControl()
  });


  constructor(private service: TicketService, private dialogRef: MatDialogRef<TicketComponent>,
    private notificationService: NotificationService, @Inject(MAT_DIALOG_DATA) data: { title: string, overview: OverviewResponse }) {
      if (data.overview !== undefined) {
        this.populateForm(data.overview);
      } else {
        this.title = data.title;
      }
    }
    
  public onSubmit(action: string) {
    console.log(this.form.valid);
    this.service.createDto(action, this.form, this.id).subscribe(
      (response) => {
        console.log(response.message);
        this.dialogRef.close();
        this.notificationService.success(`:: ${response.message}`);
      }),
      (error: any) => {
        this.dialogRef.close();
        this.notificationService.warn(`:: ${error.message}`);
      }
  }

  public onClose() {
    this.form.reset();
    this.dialogRef.close();
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    this.fileName = file.name;
    this.service.getFormData().append('attachment', file);
  }

  public populateForm(overview: any) {
    // this.form.reset();
    // this.form.setValue({
    //   name: overview.name,
    //   category: overview.category,
    //   description: overview.description,
    //   urgency: overview.urgency,
    //   desiredResolutionDate: overview.desiredResolutionDate,
    //   attachment: null,
    //   comment: null
    // });

    // через форм билдер
    this.id = overview.id;
    this.title = 'Edit Ticket #' + this.id;
  }

}
