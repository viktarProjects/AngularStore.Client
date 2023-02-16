import {Component, OnInit} from '@angular/core';
import {BasketService} from "./components/basket/basket.service";
import {AccountService} from "./account/account.service";
import {CookieService} from "ngx-cookie-service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularStore';

  constructor(private basketService: BasketService,
              private accountService: AccountService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
      }, error => {
        console.log(error)
      })
    }
  }

  loadBasket() {
    const basketId = this.cookieService.get('buyerId');
    const userName = this.jwtDecoder();
    const credentials = userName ? userName : basketId;
    if (credentials) {
      this.basketService.getBasket(credentials).subscribe(() => {
      }, error => {
        console.log(error);
      });
    }
  }

  private jwtDecoder() {
    const token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode(token, {header: false});
      // @ts-ignore
      return decoded!.unique_name;
    }
  }
}
