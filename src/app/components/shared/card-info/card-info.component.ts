import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() description: string | undefined;

  constructor() { }

  ngOnInit() {
    if(this.title == undefined || this.title == null)
      this.title = "Titulo não definido!";

    if(this.description == undefined || this.description == null)
      this.description = "Descrição Não definida!";
  }

}
