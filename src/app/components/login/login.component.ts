import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  authAttempt(): void {
    console.log('component function')
    this.authService.performAuthRequest(this.email, this.password);
  }
}
