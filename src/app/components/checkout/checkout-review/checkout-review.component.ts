import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket} from "../../../shared/models/basket";
import {BasketService} from "../../basket/basket.service";
import {ToastrService} from "ngx-toastr";
import {CdkStepper} from "@angular/cdk/stepper";

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper!:CdkStepper;
  basket$!: Observable<IBasket | null>;

  constructor(private basketService: BasketService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.createPaymentIntentHandler();
  }

  createPaymentIntentHandler() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
      this.toastr.success('PaymentIntent created');
      this.appStepper.next();
    }, error => {
      console.log(error);
      this.toastr.error(error);
    })
  }
}
