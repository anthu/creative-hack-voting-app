import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Team {
  description: string;
  name: string;
}

interface VoteCategory {
  id: string;
  path: string;
}

interface Vote {
  pitch: VoteCategory;
  technology: VoteCategory;
  wtf: VoteCategory;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'voting-hackathon';

  teams$: Observable<any[]>;
  private teamsCollection: AngularFirestoreCollection<any>;

  votes$: Observable<any[]>;
  private votesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.teamsCollection = afs.collection<Team>('Teams');
    this.teams$ = this.teamsCollection.snapshotChanges().pipe(
      map(teams => teams.map((t) => {
          const data = t.payload.doc.data() as Team;
          const id = t.payload.doc.id;
          return {id, ...data};
        }
      ))
    );





    this.teams$.subscribe((foo) => {
      console.log('teams', foo);
    });

    this.votesCollection = afs.collection<Vote>('Votes');
    this.votes$ = this.votesCollection.valueChanges();
    this.votes$.subscribe((foo) => {
      console.log('votes', foo);
    });

  }

  onAddTeam() {
    const team: Team = {
      description: 'this is fine',
      name: 'Don\'t panic',
    };

    this.teamsCollection.add(
      team,
    );
  }


}



