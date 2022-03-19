import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-initial',
  templateUrl: './register-initial.component.html',
  styleUrls: ['./register-initial.component.scss']
})
export class RegisterInitialComponent implements OnInit {

  imageLogo: string = '../../assets/images/logo.png';
  title: string | undefined;
  description: string | undefined;
  currentRoute: string | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCurrentRouter();
    this.defineCardInfo();
  }

  getCurrentRouter() {
    this.currentRoute = this.router.url.split("/")[3];
  }

  defineCardInfo() {
    switch (this.currentRoute) {
      case "contact":
        this.title = "SEJA BEM VINDO";
        this.description = "Para começarmos insira seu nome seu telefone";
        break;
      case "localization":
        this.title = "ÓTIMO";
        this.description = "Agora insira sua localidade";
        break;
      case "loginPassword":
        this.title = "ESTÁ QUASE ACABANDO!";
        this.description = "Insira uma senha que será usada como login";
        break;
      default:
        this.title = "SEJA BEM VINDO";
        this.description = "Para começarmos insira seu nomee seu telefone";
        break;
    }
  }
}
