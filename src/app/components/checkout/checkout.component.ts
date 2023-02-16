import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {IAddress} from "../../shared/models/IAddress";
import {Observable} from "rxjs";
import {IBasketTotals} from "../../shared/models/basket";
import {BasketService} from "../basket/basket.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  deliveryMethod: number = 0;
  address!: IAddress;
  basketTotals$!: Observable<IBasketTotals | null>;

  constructor(private basketService: BasketService) {

  }

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotal$;
  }

  setAddressHandler(event: IAddress) {
    this.address = event;
  }
}
