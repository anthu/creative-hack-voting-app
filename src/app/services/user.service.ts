import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TokenService } from './token.service';

export interface User {
  name: string;
  pitch: string;
  team: string;
  technology: string;
  wtf: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private itemDoc: AngularFirestoreDocument<User>;
  public me$: Observable<User>;

  constructor(private afs: AngularFirestore, private tokenService: TokenService) {
    this.itemDoc = this.afs.doc<User>(`Users/${this.tokenService.token}`);
    this.me$ = this.itemDoc.valueChanges();

    this.me$.subscribe(me => console.log('me', me));
  }

}
