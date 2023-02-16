import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../shared/models/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getOrders() {
    return this.http.get<IOrder[]>(this.baseUrl + 'Orders');
  }

  getOrder(id: number) {
    return this.http.get<IOrder>(this.baseUrl + 'Orders/' + id);
  }
}
