import { Injectable } from '@angular/core';
import { Results } from '../models/results';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {

  constructor(private httpClient: HttpClient) {}

  getResults(): Observable<any>{
    const url = `https://us-central1-creativehackvoting.cloudfunctions.net/api/results`;
    return this.httpClient.get<any>(url);
  }

}
