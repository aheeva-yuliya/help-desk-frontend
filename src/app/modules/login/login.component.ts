import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private authService: AuthService) { }

  authAttempt(): void {
    this.authService.performAuthRequest(this.email, this.password);
  }
}
