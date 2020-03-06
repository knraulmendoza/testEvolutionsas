import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    
    constructor(public _authService: LoginService, public router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        //if (!await this._authService.autorization()) {
        if (localStorage.getItem("token")== null || localStorage.getItem("token") == undefined) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
