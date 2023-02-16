import {IAddress} from "./IAddress";

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  address: IAddress;
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
  address: IAddress;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: IOrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

