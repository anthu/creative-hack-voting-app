import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { filter, map } from 'rxjs/operators';
import { ApiTeam } from '../models/api-team';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {

  private teamAngularFirestoreCollection;
  public teams$: Observable<Team[]>;

  constructor(private afs: AngularFirestore) {
    this.teamAngularFirestoreCollection = this.afs.collection<Team>('Teams');
    this.teams$ = this.teamAngularFirestoreCollection.snapshotChanges().pipe(
      map((teams: any[]) => teams.map((t) => {
          const data = t.payload.doc.data() as ApiTeam;
          const id = t.payload.doc.id;
          return { id, ...data } as Team;
        },
      )),
    );
  }

  public getTeam(id: string): Observable<Team> {
    return this.teams$.pipe(map((teams: Team[]) => {
      let ret: Team = null;

      teams.forEach(t => {
        if (id === t.id) {
          ret = t;
        }
      });

      return ret;
    }));
  }
}
