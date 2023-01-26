import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Basket, IBasket, IBasketItem, IBasketTotals} from "../../shared/models/basket";
import {IProduct} from "../../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {

  }

  getBasket(basketId: string) {
    return this.http.get<IBasket>(this.baseUrl + 'Basket?basketId=' + basketId)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculateTotals();
        })
      )
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'Basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    })
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  increaseBasketItem(itemToIncrease: IBasketItem, quantity = 1) {
    const basket = this.getCurrentBasket();
    if (basket) {
      basket.items = this.addOrUpdateItem(basket.items, itemToIncrease, quantity);
      this.setBasket(basket);
    }
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(x => x.id === itemToAdd.id);

    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  decreaseBasketItem(itemToDecrease: IBasketItem, quantity: number) {
    const basket = this.getCurrentBasket();
    if (basket) {
      const foundIndex = basket.items.findIndex(x => x.id === itemToDecrease.id);
      if (foundIndex >= 0) {
        basket.items[foundIndex].quantity -= quantity;
        this.setBasket(basket);
        if (basket.items[foundIndex].quantity <= 0) {
          this.removeItemFromBasket(basket.items[foundIndex])
        }
      }
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasket();
    if (!basket) return;
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'Basket?basketId=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    })
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasket();
    const shipping = 0;
    if (basket !== undefined && basket) {
      const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
      const total = shipping + subtotal;
      this.basketTotalSource.next({shipping, total, subtotal})
    }
  }
}

function mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
  return {
    id: item.id,
    productName: item.name,
    price: item.price,
    pictureUrl: item.pictureUrl,
    quantity,
    brand: item.productBrand,
    type: item.productType
  }
}

