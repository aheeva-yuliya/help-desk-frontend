import { Injectable } from '@angular/core';

const TOKEN = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }

  public getLength() {
    return localStorage.length;
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    const stringify = JSON.stringify(token);
    const sub = stringify.substring(10, stringify.length - 2);
    console.log(sub);
    localStorage.setItem(TOKEN, sub);
  }

  public getToken(): string {
    let token = localStorage.getItem(TOKEN) || ''
    console.log('get method', token)
    return token;
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }
}
