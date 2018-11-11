import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MaterialModule } from './material/material.module';
import { LabelComponent } from './components/label/label.component';
import { VotingComponent } from './components/voting/voting.component';
import { ResultsComponent } from './components/results/results.component';
import { DoVoteDialogComponent } from './components/do-vote-dialog/do-vote-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LabelComponent,
    VotingComponent,
    ResultsComponent,
    DoVoteDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DoVoteDialogComponent, ErrorDialogComponent],
})
export class AppModule {
}
