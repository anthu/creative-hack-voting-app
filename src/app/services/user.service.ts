import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

export interface User {
  teamName: string;
  pitch: string;
  team: string;
  technology: string;
  wtf: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  public get me$(): Observable<User> {
    const url = `https://us-central1-creativehackvoting.cloudfunctions.net/api/me/${this.tokenService.token}`;
    return this.httpClient.get<User>(url);
  }

  public me: User;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.me$.subscribe(me => this.me = me);
  }

}
