import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  public set token(token: string) {
    localStorage.setItem('token', token);
  }

  public get token() {
    return localStorage.getItem('token');
  }

  constructor() {
  }

}
