import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { authResponse } from '../interfaces/authResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  public performAuthRequest(email: string, password: string): void {
    const login = { email: email, password: password };
    this.http.post<authResponse>(`${this.apiServerUrl}/auth`, login, httpOptions).subscribe(
      (response: authResponse) => {
        console.log('got responce', response);
        this.tokenStorage.saveToken(response.token);
        this.tokenStorage.saveRole(response.role);
        this.router.navigate(['/home'])
      }),
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error'])
      }
  }
}
