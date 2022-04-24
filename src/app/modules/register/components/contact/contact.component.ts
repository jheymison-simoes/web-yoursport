import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Contact } from 'src/app/modules/register/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {

  @Input('contact') contact: Contact;
  @Output() onGetContact: EventEmitter<Contact> = new EventEmitter();

  registerForm: FormGroup;
  validationMessages: any;
  formIsValid: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.defineValidationMessages();
  }

  ngOnInit() {
    this.defineFormBuilder();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.emitEventOnGetContact();
  }

  formGetErrors(propertyName: string, propertyError: string): boolean {
    let result = this.registerForm.get(propertyName)?.errors?.[propertyError] ?? false;
    return result;
  }

  formCheckTouchedOrDirty(propertyName: string): boolean{
    let result = (this.registerForm.get(propertyName)?.dirty ||
                  this.registerForm.get(propertyName)?.touched) ?? false;
    return result
  }

  formGetMessageErrors(propertyName: string, propertyError: string): string {
    let result = this.validationMessages[propertyName][propertyError];
    return result;
  }

  //#region Methods Privates
  private defineValidationMessages(){
    this.validationMessages = {
      name: {
        required: 'O nome é obrigatório!',
        minLength: 'O nome deve ter pelo menos 3 carecteres!'
      },
      numberPhone: {
        required: 'O número de telefone é obrigatório!',
        minLength: 'O múmero de telefone deve ter pelo menos 11 números!'
      }
    }
  }

  private defineFormBuilder(){
    this.registerForm = this.formBuilder.group({
      name: [this.contact?.name, [Validators.required, Validators.minLength(3)]],
      numberPhone: [this.contact?.numberPhone, [Validators.required, Validators.minLength(11)]]
    });
  }

  private async emitEventOnGetContact(){
    this.registerForm.statusChanges.subscribe(res => {
      if(res == 'INVALID'){
        this.contact = new Contact();
        this.contact.formIsValid = false;
        return this.onGetContact.emit(this.contact);
      } else {
        this.submitForm();
        this.contact.formIsValid = true;
        return this.onGetContact.emit(this.contact);
      }
    });
  }

  private submitForm() {
    this.contact = Object.assign({}, this.contact, this.registerForm.value);
  }
  //#endregion
}
