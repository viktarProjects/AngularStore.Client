import {Component, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket} from "../../../shared/models/basket";
import {BasketService} from "../../../components/basket/basket.service";
import {IToken, IUser} from "../../../shared/models/user";
import {AccountService} from "../../../account/account.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  currentUser$!: Observable<IUser | null>;

  constructor(private basketService: BasketService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logOut() {
    this.accountService.logout();
  }
}
