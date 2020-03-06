import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IRole } from 'src/app/interfaces/interface';
import { RoleService } from 'src/app/services/role.service';
import * as alertify from "alertifyjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  closeResult: string;
  roles:IRole[] = []
  edit:boolean = false;
  role:IRole = <IRole>{};

    constructor(private modalService: NgbModal, private roleService: RoleService, private router: Router) { }
  ngOnInit() {
    this.getRoles();
  }
  async getRoles() {
    this.roles = await this.roleService.getAll();
    console.log(this.roles);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openForm(form, edi:boolean, role:IRole) {
    this.edit = edi;
    console.log(this.edit);
    if (edi) {
      this.role = role;
    } else {
      this.role = <IRole>{};
    }
    this.modalService.open(form, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.edit = false;
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  async save(form){
    let rol;
    if (!this.edit) {
      rol = await this.roleService.save(this.role);
    } else {
      rol = await this.roleService.edit(this.role);
    }
    this.getRoles();
    rol==null?alertify.error("Jum hubo un error"):alertify.success(`Se ${this.edit?'edito':'registro'} el rol de manera exitosa`);
    this.modalService.dismissAll(form);
    this.edit = false;
    }

    logout() {
        localStorage.removeItem("token");
        this.router.navigate(["/"]);
    }

    showUsers(users){
      this.modalService.open(users, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
}
