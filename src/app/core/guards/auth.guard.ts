import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../../account/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> {
  //   const token = sessionStorage.getItem('token');
  //   return this.accountService.currentUser$.pipe(
  //     map(auth => {
  //       if (auth) {
  //         return true;
  //       }
  //       this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
  //       return false;
  //     })
  //   );
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
