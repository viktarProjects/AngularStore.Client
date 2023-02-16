import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {NavigationStart, Router} from "@angular/router";
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  previousUrl!: string;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('viktar.varabei@mail.ru', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('1919101976$aAa$', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe(() => {
        this.router.navigateByUrl('home');
      }, error => {
        console.log('error')
      })
    }
  }
}
