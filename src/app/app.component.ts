import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voting-hackathon';
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('teams');
    this.items = this.itemsCollection.valueChanges();
  }

}



