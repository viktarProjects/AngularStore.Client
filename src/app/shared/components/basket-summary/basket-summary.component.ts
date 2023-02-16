import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket, IBasketItem} from "../../models/basket";
import {BasketService} from "../../../components/basket/basket.service";
import {IOrderItem} from "../../models/order";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit{
  @Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() items : IBasketItem[] | IOrderItem[] = [];
  @Input() isOrder = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  typeOf(value : any) {
    return typeof value;
  }

  decreaseBasketItem(item:any){
    this.decrement.emit(item);
  }

  increaseBasketItem(item:any){
    this.increment.emit(item);
  }

  removeItem(item:any){
    this.remove.emit(item);
  }
}
