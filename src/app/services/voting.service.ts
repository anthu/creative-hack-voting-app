import { Injectable } from '@angular/core';
import { Votes } from '../models/votes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  public saveVotes(votes: Votes) {
    // do something


  }
}
