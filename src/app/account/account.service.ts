import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {IUser} from "../shared/models/user";
import {Router} from "@angular/router";
import {IAddress} from "../shared/models/IAddress";
import {BasketService} from "../components/basket/basket.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  private addressAddressSource = new BehaviorSubject<IAddress | null>(null);
  currentAddress$ = this.addressAddressSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private basketService: BasketService) {
  }

  getCurrentUser() {
    return this.currentUserSource.value;
  }


  loadCurrentUser(token: string | null | undefined) {
    if (token == null) {
      this.currentUserSource.next(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'Account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.basketService.getBasket(user.userName).subscribe();
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('home');
    this.basketService.cleanBasket();
  }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'Account/emailexists?email=' + email);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'Account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'Account/address', address);
  }
}
