import { Injectable } from '@angular/core';
import { Vote } from '../models/vote';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { User, UserService } from './user.service';
import { TeamsService } from './teams.service';
import { Team } from '../models/team';

export interface MyVotes {
  pitch: Team;
  technology: Team;
  wtf: Team;
}

@Injectable({
  providedIn: 'root',
})
export class VotingService {

  myVotes$: Observable<MyVotes>;

  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private userService: UserService,
              private teamService: TeamsService) {
    this.myVotes$ = this.getMyVotes();
  }

  public saveVotes(votes: Vote): Observable<any> {
    const url = `https://us-central1-creativehackvoting.cloudfunctions.net/api/vote/${this.tokenService.token}`;

    return this.http.post<Vote>(url, votes).pipe(
      map(result => {
        console.log('result received', result);
        return of(true);
      }),
      catchError(this.handleError<boolean>('saveVotes', false)),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private getMyVotes(): Observable<MyVotes> {
    return this.userService.me$.pipe(
      filter(u => !!u),
      switchMap((user: User) => {
        return combineLatest(
          this.teamService.getTeam(user.pitch),
          this.teamService.getTeam(user.technology),
          this.teamService.getTeam(user.wtf),
        ).pipe(map(([teamForPitch, teamForTechnology, teamForWtf]: Team[]) => {
          return { pitch: teamForPitch || null, technology: teamForTechnology || null, wtf: teamForWtf || null };
        }));
      }));
  }

}
