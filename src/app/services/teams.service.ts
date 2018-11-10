import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { map } from 'rxjs/operators';
import { ApiTeam } from '../models/api-team';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private afs: AngularFirestore) { }

  getTeams(): Observable<Team[]> {
    return this.afs.collection<Team>('Teams').snapshotChanges().pipe(
      map(teams => teams.map((t) => {
          const data = t.payload.doc.data() as ApiTeam;
          const id = t.payload.doc.id;
          return { id, ...data } as Team;
        },
      )),
    );
  }
}
