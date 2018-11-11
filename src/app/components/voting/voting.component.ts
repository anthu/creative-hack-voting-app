import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsService } from '../../services/teams.service';
import { VotingService } from '../../services/voting.service';
import { Vote } from '../../models/vote';
import { MatDialog } from '@angular/material';
import { DoVoteDialogComponent } from '../do-vote-dialog/do-vote-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent {

  teams$: Observable<any[]>;

  votes: Vote = {
    pitch: null,
    technology: null,
    wtf: null,
  };
  private showSpinner: boolean;

  constructor(private teamsService: TeamsService, private votingService: VotingService, public dialog: MatDialog) {
    this.teams$ = this.teamsService.getTeams();
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
    } else if (this.votes.technology === id) {
      return 'Technology';
    }
    return null;
  }

  onSave() {
    if (this.everyVoteMade()) {
      console.log('will save');
      this.showSpinner = true;
      this.votingService.saveVotes(this.votes).subscribe((successful) => {
        this.showSpinner = false;
        if (!successful) {
          this.dialog.open(ErrorDialogComponent);
        }
      });
    } else {
      this.dialog.open(DoVoteDialogComponent);
    }
  }

  private everyVoteMade() {
    const teamsVotedFor: Set<string> = new Set();
    if (this.votes.pitch) {
      teamsVotedFor.add(this.votes.pitch);
    }
    if (this.votes.technology) {
      teamsVotedFor.add(this.votes.technology);
    }
    if (this.votes.wtf) {
      teamsVotedFor.add(this.votes.wtf);
    }
    return teamsVotedFor.size === 3;
  }
}
