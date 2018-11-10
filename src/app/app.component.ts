import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from './models/team';
import { ApiTeam } from './models/api-team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  teams$: Observable<any[]>;
  private teamsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.loadTeams();

    // TODO remove - just logging
    this.teams$.subscribe((foo) => {
      console.log('teams', foo);
    });
  }

  private loadTeams() {
    this.teamsCollection = this.afs.collection<Team>('Teams');
    this.teams$ = this.teamsCollection.snapshotChanges().pipe(
      map(teams => teams.map((t) => {
          const data = t.payload.doc.data() as ApiTeam;
          const id = t.payload.doc.id;
          return { id, ...data } as Team;
        },
      )),
    );
  }

  onInteracted(teamId: string) {
    console.log('interacted with team id', teamId);
  }
}



