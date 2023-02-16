import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IUser} from "../../shared/models/user";
import {AccountService} from "../../account/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  currentUser$!: Observable<IUser | null>;
  contactUsForm!: FormGroup;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.createContactUsForm();
  }

  createContactUsForm() {
    this.contactUsForm = new FormGroup({
      userName: new FormControl( '', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      phoneNumber: new FormControl( '',[Validators.required]),
      comments : new FormControl('',Validators.required)
    });
  }
}
