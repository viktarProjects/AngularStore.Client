import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket, IBasketItem, IBasketTotals} from "../../shared/models/basket";
import {BasketService} from "./basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket | null>;
  basketTotals$!:Observable<IBasketTotals | null>;

  constructor(private basketService: BasketService) {

  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  increaseItemCount(basketItem: IBasketItem) {
    this.basketService.addItemToBasket(basketItem.productId);
  }

  decreaseItemCount(basketItem: IBasketItem) {
    this.basketService.decreaseItemCount(basketItem.productId);
  }

  deleteItem(basketItem: IBasketItem) {
    this.basketService.decreaseItemCount(basketItem.productId,basketItem.quantity);
  }
}
