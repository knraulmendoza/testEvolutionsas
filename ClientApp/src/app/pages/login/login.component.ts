import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:IUser = <IUser>{};
  constructor() { }

  ngOnInit() {
  }

}
