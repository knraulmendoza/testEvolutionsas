import { Injectable } from '@angular/core';
import ApiBase from '../helper/ApiBase';
import { IRole } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api: ApiBase) { }
  public async getAll(){
    return await this.api.get(`role/getAll`);
  }
  public async save(role:IRole){
    return await this.api.post('role/register',role);
  }
  public async edit(role:IRole){
    return await this.api.put(`role/${role.id}`,role);
  }
}
