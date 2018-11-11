import { Injectable } from '@angular/core';
import { Votes } from '../models/votes';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor() { }

  public saveVotes(votes: Votes) {
    // do something
  }
}
