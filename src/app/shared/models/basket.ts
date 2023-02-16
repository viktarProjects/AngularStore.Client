import {v4 as uuid4} from 'uuid';

export interface IBasket {
  buyerId:string;
  items:IBasketItem[];
  clientSecret?:string;
  paymentIntentId?:string;
  deliveryMethodId?:number;
  shippingPrice?:number;
}

export interface IBasketItem {
  productId:number
  productName:string;
  price:number;
  quantity:number;
  pictureUrl:string;
  brand:string;
  type:string;
}


export class Basket implements IBasket {
  buyerId: string = uuid4();
  items: IBasketItem[] = [];

}

export interface IBasketTotals {
  shippingPrice:number;
  subtotal:number;
  total:number;
}
