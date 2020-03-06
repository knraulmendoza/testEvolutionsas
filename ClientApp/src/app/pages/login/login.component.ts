import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interface';
import { LoginService } from 'src/app/services/login.service';
import * as alertify from "alertifyjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:IUser = <IUser>{};
  constructor(private loginSer: LoginService, private route:Router) { }

  ngOnInit() {
  }

  async login(){
    let u = await this.loginSer.authenticate(this.user)//?
    if (u == null) {
      alertify.error("Usuario y/o Contraseña incorrectas");
    } else {
        alertify.success("Datos correctos");
        this.route.navigate(['nav/mapa']);
    }
  }
}
