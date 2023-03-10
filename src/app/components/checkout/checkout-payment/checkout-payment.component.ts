import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BasketService} from "../../basket/basket.service";
import {CheckoutService} from "../checkout.service";
import {ToastrService} from "ngx-toastr";
import {IBasket} from "../../../shared/models/basket";
import {IOrderToCreate} from "../../../shared/models/order";
import {NavigationExtras, Router} from "@angular/router";
import {AccountService} from "../../../account/account.service";
import {Address} from "../../../shared/models/address";

declare var Stripe: any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  paymentForm!: FormGroup;
  @Input() address!: Address;
  @ViewChild('cardNumber', {static: true}) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement!: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardErrors: any;
  cardHandler = this.onChange.bind(this);
  loading: boolean = false;
  cardNumberValid: boolean = false;
  cardExpiryValid: boolean = false;
  cardCvcValid: boolean = false;

  constructor(private basketService: BasketService,
              private checkoutService: CheckoutService,
              private toastr: ToastrService,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  ngAfterViewInit(): void {
    this.stripe = Stripe('pk_test_51MYsrjFkuOlj4wMo3oupQRPPXFuEWYdnOqwgKbxuWbmVs74QohgHMfe3g3bCewg8UHHEhfOEIc80i8PjTPf0fLcn00IB2TSqC4');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change', this.cardHandler);

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler);

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange(event: any) {
    if (event.error) {
      this.cardErrors = event.error.message;
      console.log(this.cardErrors)
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber': {
        this.cardNumberValid = event.complete;
        break;
      }
      case 'cardExpiry': {
        this.cardExpiryValid = event.complete;
        break;
      }
      case 'cardCvc': {
        this.cardCvcValid = event.complete;
        break;
      }
    }
  }

  createPaymentForm() {
    this.paymentForm = new FormGroup({
      nameOnCard: new FormControl(null, Validators.required)
    });
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasket();

    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket!);

      if (paymentResult.paymentIntent) {
        this.basketService.cleanBasket();
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private async createOrder(basket: IBasket | null) {
    const orderToCreate = this.getOrderToCreate(basket!);
    return this.checkoutService.createOrder(orderToCreate).toPromise();
  }

  private async confirmPaymentWithStripe(basket: IBasket) {
    return this.stripe.confirmCardPayment(basket?.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.paymentForm.controls['nameOnCard'].value
        }
      }
    })
  }

  private getOrderToCreate(basket: IBasket): IOrderToCreate {
    return {
      basketId: basket.buyerId,
      deliveryMethodId: this.basketService.deliveryMethod.id,
      address: this.address
    }
  }
}
