import { Injectable } from '@angular/core';

const TOKEN = 'AuthToken';
const ROLE = 'UserRole';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  public getLength() {
    return localStorage.length;
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    const stringify = JSON.stringify(token);
    console.log('saved', stringify);
    const sub = stringify.substring(1, stringify.length - 1);
    console.log(sub);
    localStorage.setItem(TOKEN, sub);
  }

  public getToken(): string {
    let token = localStorage.getItem(TOKEN) || '';
    console.log('get method', token)
    return token;
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public saveRole(role: string) {
    localStorage.removeItem(ROLE);
    const stringify = JSON.stringify(role);
    console.log(stringify);
    const sub = stringify.substring(1, stringify.length - 1);
    console.log(sub);
    localStorage.setItem(ROLE, sub);
  }

  public getRole(): string {
    let role = localStorage.getItem(ROLE) || '';
    console.log('get method', role)
    return role;
  }

  public removeRole(): void {
    localStorage.removeItem(ROLE);
  }
}
