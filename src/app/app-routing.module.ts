import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingComponent } from './components/voting/voting.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  {path:'voting', component: VotingComponent},
  {path:'results', component: ResultsComponent},
  {path: '', redirectTo: '/voting', pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
