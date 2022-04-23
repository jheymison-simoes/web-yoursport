import { City } from '../../models/City';
import { RegisterService } from './../../services/register.service';
import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { State } from '../../models/State';
import { Localization } from './../../models/localization';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit, AfterViewInit {

  @Input('localization') localization: Localization;
  @Output() onActiveSpinner: EventEmitter<boolean> = new EventEmitter();
  @Output() onGetLocalization: EventEmitter<Localization> = new EventEmitter();

  localizationForm: FormGroup;
  states: State[] = [];
  allStates: Observable<State[]>;
  cities: City[] = [];
  citiesFiltered: Observable<City[]> | undefined;
  stateSelected: string;
  validationMessages: any;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.defineValidationMessages();
  }

  ngOnInit() {
    this.getStates();
    this.defineFormBuilder();
    this.defineCitiesFilter();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.emitEventOnGetLocalization();
  }

  getCities(stateInitials: string){
    if(stateInitials == "" || stateInitials == undefined) return;
    this.onActiveSpinner.emit(true);
    this.cities = [];
    this.localizationForm.get('city')?.setValue('');
    this.registerService.getCytiesByState(stateInitials).subscribe(
      response =>  {
        this.transformObjectInListCities(response);
        this.onActiveSpinner.emit(false);
      },
      error => {
        console.log(error);
        this.onActiveSpinner.emit(false);
      },
    );
  }

  private defineFormBuilder(){
    this.localizationForm = this.formBuilder.group({
      state: [this.localization?.state, [Validators.required]],
      city: [this.localization?.city, [Validators.required]],
    });
  }

  private getStates() {
    this.registerService.getStates().subscribe(
      response => {
        this.onActiveSpinner.emit(true);
        this.transformObjectInListState(response);
        this.onActiveSpinner.emit(false);
      },
      error => {
        console.log(error);
        this.onActiveSpinner.emit(false);
      }
    );
  }

  formGetErrors(propertyName: string, propertyError: string): boolean {
    let result = this.localizationForm.get(propertyName)?.errors?.[propertyError] ?? false;
    return result;
  }

  formCheckTouchedOrDirty(propertyName: string): boolean{
    let result = (this.localizationForm.get(propertyName)?.dirty ||
                  this.localizationForm.get(propertyName)?.touched) ?? false;
    return result
  }

  formGetMessageErrors(propertyName: string, propertyError: string): string {
    let result = this.validationMessages[propertyName][propertyError];
    return result;
  }

  private defineValidationMessages(){
    this.validationMessages = {
      state: {
        required: 'O estado é obrigatório!',
      },
      city: {
        required: 'A cidade é obrigatório!',
      }
    }
  }

  private transformObjectInListState(response: any){
    response.map((value: any) => {
      var state = new State();
      state.name = value['nome'];
      state.initials = value['sigla'];
      this.states.push(state)
    });
  }

  private transformObjectInListCities(response: any){
    response.map((value: any) => {
      var city = new City();
      city.name = value['nome'];
      this.cities.push(city)
    });
  }

  private defineCitiesFilter(){
    this.citiesFiltered = this.localizationForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(city => (city ? this.filterCities(city) : this.cities.slice())),
    );
  }

  private filterCities(value: string): City[] {
    const filterValue = value?.toLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  private async emitEventOnGetLocalization(){
    this.localizationForm.statusChanges.subscribe(res => {
      if(res == 'INVALID'){
        this.localization = new Localization();
        this.localization.formIsValid = false;
        return this.onGetLocalization.emit(this.localization);
      } else {
        this.submitForm();
        this.localization.formIsValid = true;
        // this.localization.city = this.localizationForm.get('city')?.value;
        // this.localization.state = this.localizationForm.get('state')?.value;
        this.localization.formIsValid = true;
        return this.onGetLocalization.emit(this.localization);
      }
    });
  }

  private submitForm() {
    this.localization = Object.assign({}, this.localization, this.localizationForm.value);
  }
}
