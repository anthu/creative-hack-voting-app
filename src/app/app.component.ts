import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private tokenService: TokenService) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      first(),
      map(params => {
        this.tokenService.token = params['token'];
      }));
  }

}



