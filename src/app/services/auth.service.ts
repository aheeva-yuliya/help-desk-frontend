import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private router: Router) { }

  performAuthRequest(email: string, password: string): void {
    const login = { email: email, password: password };
    console.log(login);
    this.http.post<string>(`${this.apiServerUrl}/auth`, login, httpOptions).subscribe(
      (response: string) => {
        console.log('got responce', response);
        this.tokenStorage.saveToken(response);
        this.router.navigate(['/home'])
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/error'])
      }
    )
  }
}
