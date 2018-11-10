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

  votes = {
    pitch: null,
    technology: null,
    wtf: null,
  };

  constructor(private afs: AngularFirestore) {
    this.loadTeams();
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

  onVotePitch(id: any) {
    this.clearVotesForTeam(id);
    this.votes.pitch = id;
  }

  onVoteTechnology(id: any) {
    this.clearVotesForTeam(id);
    this.votes.technology = id;
  }

  onVoteWtf(id: any) {
    this.clearVotesForTeam(id);
    this.votes.wtf = id;
  }

  hasTeamVote(id: string) {
    return this.votes.wtf === id || this.votes.technology === id || this.votes.pitch === id;
  }

  clearVotesForTeam(id: string) {
    this.votes.wtf = this.votes.wtf === id ? null : this.votes.wtf;
    this.votes.pitch = this.votes.pitch === id ? null : this.votes.pitch;
    this.votes.technology = this.votes.technology === id ? null : this.votes.technology;
  }

  getVoteTextForTeam(id: any) {
    if (this.votes.wtf === id) {
      return 'Wtf';
    } else if (this.votes.pitch === id) {
      return 'Pitch';
    } else if (this.votes.technology === id){
      return 'Technology';
    }
    return null;
  }
}



