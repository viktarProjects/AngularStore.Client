import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {map, of, switchMap, timer} from "rxjs";
import {SearchCountryField, CountryISO} from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors!: string[];
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private fb: FormBuilder, private accountService: AccountService,
              private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      'userName': ['ViktarUser', Validators.required],
      'email': ['viktar.varabei1@mail.ru', [Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateExistingEmail()]
      ],
      'phoneNumber': [null, Validators.required],
      'password': ['1919101976$aAa$', Validators.required]
    })
  }

  onSubmit() {
    this.registerForm.value.phoneNumber = this.registerForm.value.phoneNumber.internationalNumber;
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.toastr.success('Confirmation link has been sent');
      this.router.navigateByUrl('account/login');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

  validateExistingEmail(): AsyncValidatorFn | null[] {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }
}
