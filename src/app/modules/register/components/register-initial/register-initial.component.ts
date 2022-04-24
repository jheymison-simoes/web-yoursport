import { LoginRegister } from './../../models/loginRegister';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterRouteEnum } from 'src/app/enumerations/register-route-enum.enum';
import { Contact } from 'src/app/modules/register/models/contact';
import { Localization } from '../../models/localization';

import { NgxSpinnerService } from "ngx-spinner";

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
  localization: Localization;
  loginRegister: LoginRegister;
  routeEnum = RegisterRouteEnum;


  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCurrentRouter();
    this.defineCardInfo();
  }

  async getContact(contact: Contact){
    if(contact?.formIsValid) this.contact = contact;
    this.advanceBloquedBtn = !contact?.formIsValid;
  }

  async getLocalization(localization: Localization){
    if(localization?.formIsValid) this.localization = localization;
    this.advanceBloquedBtn = !localization?.formIsValid;
  }

  async getLoginRegister(loginRegister: LoginRegister){
    if(loginRegister?.formIsValid) this.loginRegister = loginRegister;
    this.advanceBloquedBtn = !loginRegister?.formIsValid;
  }

  async advance(){
    this.showSpinner(true);
    this.defineRoute(true);
    await this.router.navigate([`register/initial/${this.currentRoute}`]);
    this.defineCardInfo();
    this.showSpinner(false);
  }

  async back(){
    this.showSpinner(true);
    this.defineRoute(false);
    await this.router.navigate([`register/initial/${this.currentRoute}`]);
    this.defineCardInfo();
    this.showSpinner(false);
  }

  async showSpinner(active: boolean){
    if(active) this.spinner.show();
    else this.spinner.hide();
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
        this.description = "Agora insira sua localidade: Estado e Cidade";
        break;
      case RegisterRouteEnum.LoginPassword:
        this.title = "ESTÁ QUASE ACABANDO!";
        this.description = "Insira seu email e uma senha que será usada como login";
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
          this.bloquedBtnBack(false);
          this.bloquedBtnAdvance(!this.localization?.formIsValid);
        }
        break;
      case RegisterRouteEnum.Localization:
        if(next) {
          this.currentRoute = RegisterRouteEnum.LoginPassword;
          this.bloquedBtnBack(false);
          this.bloquedBtnAdvance(!this.loginRegister?.formIsValid);
        }
        else {
          this.currentRoute = RegisterRouteEnum.Contact;
          this.bloquedBtnBack(false);
          this.bloquedBtnAdvance(!this.contact.formIsValid);
        }
        break;
      case RegisterRouteEnum.LoginPassword:
        if(!next) this.currentRoute = RegisterRouteEnum.Localization;
        this.bloquedBtnBack(false);
        this.bloquedBtnAdvance(!this.localization?.formIsValid);
        break;
    }
  }

  private bloquedBtnBack = (bloqued: boolean) => this.backBloquedBtn = bloqued;
  private bloquedBtnAdvance = (bloqued: boolean) => this.advanceBloquedBtn = bloqued;
  //#endregion
}
