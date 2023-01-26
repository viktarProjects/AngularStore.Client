import {Component, OnInit} from '@angular/core';
import {AsyncValidatorFn, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {delay, map, of, switchMap, timer} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors!: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService,
              private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      'displayName': ['', Validators.required],
      'email': ['', [Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
      [this.validateExistingEmail()]
      ],
      'password': ['', Validators.required]
    })
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.toastr.success('Registration completed successfully');
      delay(3000);
      this.router.navigateByUrl('/login');
    }, error => {
      console.log(error);
      this.errors = error.errors;
    })
  }

  validateExistingEmail():AsyncValidatorFn | null[] {
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
