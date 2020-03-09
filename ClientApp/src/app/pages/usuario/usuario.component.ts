import { Component, OnInit } from '@angular/core';
import { IPerson, IUser, IRole } from 'src/app/interfaces/interface';
import { RoleService } from 'src/app/services/role.service';
import * as alertify from "alertifyjs";
import { PersonService } from 'src/app/services/person.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  person:IPerson = <IPerson>{};
  user:IUser = <IUser>{};
  roles:IRole[] = [];
  constructor(private roleSer: RoleService, private personSer: PersonService, private modelSer: NgbModal) { }

  ngOnInit() {
    this.showRoles();
  }

  async showRoles(){
    let roles = await this.roleSer.getAll();
    this.roles = roles!=null?roles:[];
    console.log(roles);
  }

  validarForm(){
    let resp = false;
    if(this.person.firstName == undefined || this.person.firstName == ''){
      alertify.error('El primer nombre es obligatorio');
      resp = false;
    }
    else resp = true;
    if(this.person.secondName == undefined || this.person.secondName == '')this.person.secondName = '';
    if(this.person.firstLastName == undefined || this.person.firstLastName == '') {
      alertify.error('El primer apellido es obligatorio')
      resp = false;
    } else resp = true;
    if(this.person.secondLastName == undefined || this.person.secondLastName == '') {
      alertify.error('El segundo apellido es obligatorio');
      resp = false;
    }else resp = true;
    if(this.user.username == undefined || this.user.username == ''){
      alertify.error('El usuario es obligatorio');
      resp = false;
    }else resp = true;
    if(this.user.password == undefined || this.user.password == ''){
      alertify.error('La contraseña es obligatoria');
      resp = false;
    }else resp = true;
    if(this.user.roleid == null || this.user.roleid == undefined){
      alertify.error('Debe seleccionar un rol')
      resp = false;
    }else{
      this.user.roleid = Number.parseInt(this.user.roleid.toString());
      resp = true;
    }
    return resp;
  }
  async save(){
    this.person.user = this.user;
    if(this.validarForm()) {
      let resp = await this.personSer.save(this.person);
      if(resp==null) {
        alertify.error('jum hubo un error');
      } else {
        alertify.success('Se registro de manera exitosa');
        this.modelSer.dismissAll();
      }
    }else{
      alertify.error('Falta un campo por validar');
    }
  }

  test(){
    this.user.roleid = Number.parseInt(this.user.roleid.toString());
    console.log(this.user.roleid);
  }

}
