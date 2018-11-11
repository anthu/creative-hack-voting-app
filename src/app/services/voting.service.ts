import { Injectable } from '@angular/core';
import { Vote } from '../models/vote';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VotingService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public saveVotes(votes: Vote): Observable<any> {
    // const url = `https://us-central1-creativehackvoting.cloudfunctions.net/api/vote/${this.tokenService.token}`;
    const body = votes;

    const url = `https://us-central1-creativehackvoting.cloudfunctions.net/api/vote/3OaljWbJPHJLUTMMpoNm`;
    // const body = { wtf: 'CFPOakjUwpteqor46Zxy', pitch: 'CFPOakjUwpteqor46Zxy', technology: 'CrHvJGMgNyu3P8akaI02' };

    return this.http.post<Vote>(url, body).pipe(
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

}
