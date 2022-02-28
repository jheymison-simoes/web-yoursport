import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  public imageLogo: string = '../../assets/images/logo.png';
  public hasRegister: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
