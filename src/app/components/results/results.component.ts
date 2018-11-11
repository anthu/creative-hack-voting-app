import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Results } from '../../models/results';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results$: Observable<any>;

  constructor(private resultsService: ResultsService) { 
    this.results$ = this.resultsService.getResults();
  }

  ngOnInit() {
  }

}
