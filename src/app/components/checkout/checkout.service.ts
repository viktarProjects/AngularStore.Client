import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IDeliveryMethod} from "../../shared/models/deliveryMethod";
import {IOrder, IOrderToCreate} from "../../shared/models/order";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  createOrder(order:IOrderToCreate) : Observable<IOrder>{
    return this.http.post<IOrder>(this.baseUrl + 'Orders',order);
  }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'Orders/deliveryMethods').pipe(
      map((dm:IDeliveryMethod[]) => {
        return dm.sort((a,b) => b.price - a.price);
      })
    );
  }
}
