import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {IToken, IUser} from "../shared/models/user";
import {Router} from "@angular/router";
import {Address} from "../shared/models/address";
import {BasketService} from "../components/basket/basket.service";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  private addressAddressSource = new BehaviorSubject<Address | null>(null);
  currentAddress$ = this.addressAddressSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private basketService: BasketService) {
  }

  getCurrentUser() {
    return this.currentUserSource.value;
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token == null) {
      this.currentUserSource.next(null);
    }
    const user = this.decodeToken();
    this.currentUserSource.next(user);
    console.log(user);
  }

  login(values: any) {
    return this.http.post<IToken>(this.baseUrl + 'Account/login', values).pipe(
      map((token: IToken) => {
        if (token) {
          localStorage.setItem('token', token.token);
          const user = this.decodeToken();
          this.currentUserSource.next(user);
          this.basketService.getBasket(user?.userName!).subscribe();
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'Account/register', values).pipe(
      map((user: IUser) => {
        if (user) {

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
    return this.http.get<Address>(this.baseUrl + 'Account/address');
  }

  updateUserAddress(address: Address) {
    return this.http.put<Address>(this.baseUrl + 'Account/address', address);
  }

  decodeToken(): IUser | null {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode<IUser>(token, {header: false});
    }
    return null;
  }
}
