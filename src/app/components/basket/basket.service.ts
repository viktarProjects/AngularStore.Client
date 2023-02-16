import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Basket, IBasket, IBasketItem, IBasketTotals} from "../../shared/models/basket";
import {IProduct} from "../../shared/models/product";
import {IDeliveryMethod} from "../../shared/models/deliveryMethod";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shippingPrice = 0;
  deliveryMethod!: IDeliveryMethod;

  createPaymentIntent() {
    return this.http.post<IBasket>(this.baseUrl + 'Payments/' + this.getCurrentBasket()?.buyerId, {})
      .pipe(
        map((basket:IBasket) => {
          this.basketSource.next(basket);
          return basket;
        })
      );
  }

  setShipping(deliveryMethod: IDeliveryMethod) {
    this.shippingPrice = deliveryMethod.price;
    const basket = this.getCurrentBasket();
    basket!.deliveryMethodId = deliveryMethod.id;
    this.deliveryMethod = deliveryMethod;
    this.calculateTotals();
    this.setBasket(basket!);
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  getBasket(basketId: string) {
    return this.http.get<IBasket>(this.baseUrl + 'Basket?buyerId=' + basketId).pipe(
      map((basket: IBasket) => {
        if(!basket) return;
        this.basketSource.next(basket);
        this.shippingPrice = basket.shippingPrice!;
        this.calculateTotals();
      })
    )
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  addItemToBasket(productId: number, quantity: number = 1) {
    return this.http.post<IBasket>(this.baseUrl + 'Basket/add-item', {productId, quantity})
      .subscribe((response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      }, error => {
        console.log(error);
      })
  }

  decreaseItemCount(productId: number, quantity: number = 1) {
    return this.http.post<IBasket>(this.baseUrl + 'Basket/remove-item', {productId, quantity})
      .subscribe((response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      }, error => {
        console.log(error);
      })
  }

  cleanBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    this.cookieService.delete('buyerId');
  }

  private calculateTotals() {
    const basket = this.getCurrentBasket();
    const shippingPrice = this.shippingPrice;
    if (basket !== undefined && basket) {
      const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
      const total = shippingPrice + subtotal;
      this.basketTotalSource.next({shippingPrice, total, subtotal})
    }
  }
}
