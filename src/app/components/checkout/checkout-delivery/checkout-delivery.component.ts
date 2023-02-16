import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../../shared/models/deliveryMethod";
import {BasketService} from "../../basket/basket.service";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  deliveryForm!: FormGroup;
  deliveryMethods!: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
      this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
    this.createDeliveryForm();
  }

  createDeliveryForm() {
    this.deliveryForm = new FormGroup({
      deliveryMethodId: new FormControl(null, Validators.required)
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.basketService.setShipping(deliveryMethod);
  }
}
