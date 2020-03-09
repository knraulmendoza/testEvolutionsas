import { Injectable } from '@angular/core';
import ApiBase from '../helper/ApiBase';
import { IPerson } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private api: ApiBase) { }

  public async save(person: IPerson){
    return await this.api.post('person/register',person);
  }

  public async getAll(){
    return await this.api.get('person/all');
  }

  public async getUser(id:number){
    return await this.api.get(`person/user/${id}`);
  }
}
