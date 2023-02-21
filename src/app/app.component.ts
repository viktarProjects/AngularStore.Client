import {Component, OnInit} from '@angular/core';
import {BasketService} from "./components/basket/basket.service";
import {AccountService} from "./account/account.service";
import {CookieService} from "ngx-cookie-service";

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
    this.accountService.loadCurrentUser();
  }

  loadBasket() {
    const basketId = this.cookieService.get('buyerId');
    const user = this.accountService.decodeToken();
    let userName = null;
    if (user) {
      userName = user.userName;
    }
    const credentials = userName ? userName : basketId;
    if (credentials) {
      this.basketService.getBasket(credentials).subscribe(() => {
      }, error => {
        console.log(error);
      });
    }
  }


}
