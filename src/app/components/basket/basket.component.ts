import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket, IBasketItem} from "../../shared/models/basket";
import {BasketService} from "./basket.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$!: Observable<IBasket | null>;

  constructor(private basketService: BasketService) {

  }


  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  increaseBasketItem(basketItem: IBasketItem) {
    this.basketService.increaseBasketItem(basketItem,1);
  }

  decreaseBasketItem(basketItem: IBasketItem) {
    this.basketService.decreaseBasketItem(basketItem,1);
  }

  removeItem(basketItem: IBasketItem) {
    this.basketService.decreaseBasketItem(basketItem,basketItem.quantity);
  }
}
