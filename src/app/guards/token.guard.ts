import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (this.tokenService.token) {
    //   return true;
    // }
    if (next.queryParams.token) {
      this.tokenService.token = next.queryParams.token;
      console.log('set token in canActivate');
      return true;
    }

    this.router.navigate(['/no-token']);
    return false;
  }
}
