import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingComponent } from './components/voting/voting.component';
import { ResultsComponent } from './components/results/results.component';
import { TokenGuard } from './guards/token.guard';
import { NoTokenComponent } from './components/no-token/no-token.component';

const routes: Routes = [
  { path: 'voting', component: VotingComponent, canActivate: [TokenGuard] },
  { path: 'results', component: ResultsComponent },
  { path: 'no-token', component: NoTokenComponent },
  { path: '', redirectTo: 'voting', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
