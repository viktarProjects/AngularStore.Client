import {Address} from "./address";

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  address: Address;
}

export interface IOrderItem {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  orderDate: Date;
  address: Address;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

