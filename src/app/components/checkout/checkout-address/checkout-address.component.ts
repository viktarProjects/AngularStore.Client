import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../account/account.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {IBasket} from "../../../shared/models/basket";
import {Address} from "../../../shared/models/address";

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  addressForm!: FormGroup;
  @Output() address = new EventEmitter<Address>();

  constructor(private accountService: AccountService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAddressFormValues();
    this.createAddressForm();
  }

  createAddressForm() {
    this.addressForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required)
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe((address) => {
      if(address){
        this.addressForm.patchValue(address);
        this.addressEmitter(address);
      }
    }, error => {
      console.log(error);
    });
  }

  saveUserAddress() {
    this.accountService.updateUserAddress(this.addressForm.value).subscribe(() => {
      this.toastr.success('Address has been saved');
      this.getAddressFormValues();
    }, error => {
      this.toastr.error(error.message);
    });
  }

  addressEmitter(address: Address) {
    this.address.emit(address);
  }
}
