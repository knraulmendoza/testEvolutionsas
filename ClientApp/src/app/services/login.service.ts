import { Injectable } from '@angular/core';
import ApiBase from '../helper/ApiBase';
import { IUser } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: ApiBase) { }

  public async get(id:number){
    return await this.api.get(`user/${id}`);
  }
  public async authenticate(user:IUser){
    let _user = await this.api.post('user/authenticate',user);
    if (_user != null){
      localStorage.setItem('token',_user.entity.token);
      localStorage.setItem('role',_user.entity.roleId);
      localStorage.setItem('user',_user.entity.id);
    }
    else {
      localStorage.setItem('token','');
      localStorage.setItem('role','');
      localStorage.setItem('user', '');
    }
    return _user;
  }
    public async autorization() {
        let resp = await this.api.get('user/Autorization');
        console.log('jum : '+resp);
        return resp==true?true:false
    }
}
