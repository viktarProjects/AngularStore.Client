import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {

  baseUrl: string = environment.apiUrl;
  validationErrors:any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  get404Error() {
    this.httpClient.get(this.baseUrl + 'Products/999').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)
    })
  }

  get500Error() {
    this.httpClient.get(this.baseUrl + 'Buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)
    })
  }

  get400Error() {
    this.httpClient.get(this.baseUrl + 'Buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)
    })
  }

  get400ValidationError() {
    this.httpClient.get(this.baseUrl + 'Products/forty').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    })
  }

}
