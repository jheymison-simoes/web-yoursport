import { map } from 'rxjs/operators';
import { State } from './../models/State';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';
  states: State[];

  constructor(private http: HttpClient) { }

  getStates(){
    return  this.http.get(`${this.baseUrl}/estados?orderBy=nome`);
  }

  getCytiesByState(stateiInitials: string){
    return this.http.get(`${this.baseUrl}/estados/${stateiInitials}/municipios`);
  }
}
