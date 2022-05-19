import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TicketFormService {

  constructor() { }

  form: FormGroup = new FormGroup({
    category: new FormControl(0, Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.minLength(0), Validators.maxLength(500)]),
    urgency: new FormControl(0, Validators.required),
    desiredResolutionDate: new FormControl(''),
    attachment: new FormControl(''),
    comment: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      category: 0,
      name: '',
      description: '',
      urgency: 0,
      desiredResolutionDate: '',
      attachment: '',
      comment: ''
    });
  }

  createTicket() {

  }

  editTicket() {

  }
}
