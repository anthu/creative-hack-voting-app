import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamsService } from '../../services/teams.service';
import { MyVotes, VotingService } from '../../services/voting.service';
import { Vote } from '../../models/vote';
import { MatDialog } from '@angular/material';
import { DoVoteDialogComponent } from '../do-vote-dialog/do-vote-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { first } from 'rxjs/operators';
import { User, UserService } from '../../services/user.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent {


  teams$: Observable<any[]>;
  get teams(): Team[] {
    const tempT = this.teamsService.teams;
    return tempT.filter((t: Team) => {
      return (t.id !== this.userService.me.team);
    });
    // return tempT;
  }
  me$: Observable<User>;

  votes: Vote = {
    pitch: null,
    technology: null,
    wtf: null,
  };
  private showSpinner: boolean;

  constructor(private teamsService: TeamsService,
              private votingService: VotingService,
              public dialog: MatDialog,
              private userService: UserService) {
    this.teams$ = this.teamsService.teams$;
    this.me$ = this.userService.me$;
    this.initVotesFromBackend();
  }

  private initVotesFromBackend() {
    this.me$.subscribe((me: User) => {
      this.votes = {
        pitch: me.pitch,
        technology: me.technology,
        wtf: me.wtf,
      };
    });
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
    if (!this.everyVoteMade()) {
      this.dialog.open(DoVoteDialogComponent);
    } else {
      console.log('will save');
      this.showSpinner = true;
      this.votingService.saveVotes(this.votes).subscribe((successful: boolean) => {
        this.showSpinner = false;
        if (!successful) {
          this.dialog.open(ErrorDialogComponent);
        }
      });
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
