import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IBasketTotals} from "../../models/basket";
import {BasketService} from "../../../components/basket/basket.service";

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit{
  @Input() shipping!:number;
  @Input() subtotal!:number;
  @Input() total!:number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
