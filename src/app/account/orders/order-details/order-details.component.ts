import {Component, OnInit} from '@angular/core';
import {IOrder, IOrderToCreate} from "../../../shared/models/order";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbService} from "xng-breadcrumb";
import {OrdersService} from "../orders.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order!: IOrder;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
              private ordersService: OrdersService) {
    this.breadcrumbService.set('@OrderDetailed','');
  }

  ngOnInit(): void {
   this.ordersService.getOrder(+this.route.snapshot.paramMap.get('id')!)
     .subscribe((order:IOrder) => {
       this.order=order;
       this.breadcrumbService.set('@OrderDetailed',`Order# ${order.id} - ${order.status}`)
     },error => {
       console.log(error);
     })
  }
}
