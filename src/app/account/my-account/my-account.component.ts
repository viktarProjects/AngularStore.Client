import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {IUser} from "../../shared/models/user";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  currentUser!: IUser | null;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.currentUser = this.accountService.getCurrentUser();
  }

}
