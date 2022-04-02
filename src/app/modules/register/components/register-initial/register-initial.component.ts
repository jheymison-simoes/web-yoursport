import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRouteEnum } from 'src/app/enumerations/register-route-enum.enum';
import { Contact } from 'src/app/models/register/contact';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-register-initial',
  templateUrl: './register-initial.component.html',
  styleUrls: ['./register-initial.component.scss']
})
export class RegisterInitialComponent implements OnInit {

  imageLogo: string = '../../assets/images/logo.png';
  title: string;
  description: string;
  currentRoute: string;
  advanceBloquedBtn: boolean = true;
  backBloquedBtn: boolean = true;
  contact: Contact;
  routeEnum = RegisterRouteEnum;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCurrentRouter();
    this.defineCardInfo();
  }

  async getContact(contact: Contact){
    if(contact?.formValid) this.contact = contact;
    this.advanceBloquedBtn = !contact.formValid;
  }

  async advance(){
    this.defineRoute(true);
    await this.router.navigate([`register/initial/${this.currentRoute}`]);
  }

  async back(){
    this.defineRoute(false);
    await this.router.navigate([`register/initial/${this.currentRoute}`]);
  }

  //#region Methods Privates
  private getCurrentRouter() {
    this.currentRoute = this.router.url.split("/")[3];
  }

  private defineCardInfo() {
    switch (this.currentRoute) {
      case RegisterRouteEnum.Contact:
        this.title = "SEJA BEM VINDO";
        this.description = "Para começarmos insira seu nome e seu telefone";
        break;
      case RegisterRouteEnum.Localization:
        this.title = "ÓTIMO";
        this.description = "Agora insira sua localidade";
        break;
      case RegisterRouteEnum.LoginPassword:
        this.title = "ESTÁ QUASE ACABANDO!";
        this.description = "Insira uma senha que será usada como login";
        break;
      default:
        this.title = "SEJA BEM VINDO";
        this.description = "Para começarmos insira seu nome e seu telefone";
        break;
    }
  }

  private defineRoute(next: boolean) {
    switch (this.currentRoute) {
      case RegisterRouteEnum.Contact:
        if(next) {
          this.currentRoute = RegisterRouteEnum.Localization;
          this.backBloquedBtn = false;
          this.advanceBloquedBtn = true;
        }
        break;
      case RegisterRouteEnum.Localization:
        if(next) {
          this.currentRoute = RegisterRouteEnum.LoginPassword;
          this.backBloquedBtn = false;
        }
        else {
          this.currentRoute = RegisterRouteEnum.Contact;
          this.backBloquedBtn = false;
          this.advanceBloquedBtn = !this.contact.formValid;
        }
        break;
      case RegisterRouteEnum.LoginPassword:
        if(!next) this.currentRoute = RegisterRouteEnum.Localization;
        this.backBloquedBtn = false;
        break;
    }
  }
  //#endregion
}
