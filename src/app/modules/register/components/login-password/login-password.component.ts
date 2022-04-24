import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { LoginRegister } from './../../models/loginRegister';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.scss']
})
export class LoginPasswordComponent implements OnInit, AfterViewInit {

  @Input('loginRegister') loginRegister: LoginRegister;
  @Output() onGetLoginRegister: EventEmitter<LoginRegister> = new EventEmitter();

  loginRegisterForm: FormGroup;
  validationMessages: any;
  hidePassword: Boolean = true;
  regexStrongPassword: string = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}';
  valueProgressPassword: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.defineValidationMessages();
  }

  ngOnInit() {
    this.defineFormBuilder();
    this.strongPasswordProgress();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.strongPasswordProgress();
    await this.emitEventOnGetLoginRegister();
  }

  formGetErrors(propertyName: string, propertyError: string): boolean {
    let result = this.loginRegisterForm.get(propertyName)?.errors?.[propertyError] ?? false;
    return result;
  }

  formCheckTouchedOrDirty(propertyName: string): boolean{
    let result = (this.loginRegisterForm.get(propertyName)?.dirty ||
                  this.loginRegisterForm.get(propertyName)?.touched) ?? false;
    return result
  }

  formGetMessageErrors(propertyName: string, propertyError: string): string {
    let result = this.validationMessages[propertyName][propertyError];
    return result;
  }

  //#region Methods Privates
  private defineValidationMessages(){
    this.validationMessages = {
      userEmail: {
        required: 'O email é obrigatório!',
        email: 'O email deve ser um email válido exemplo@exemplo.com!'
      },
      userPassword: {
        required: 'A senha é obrigatória!',
        pattern: 'A senha dever conter ao menos 6 carácteres, com pelo menos uma letra maiscucula, uma minuscula e um número!'
      }
    }
  }

  private defineFormBuilder(){
    this.loginRegisterForm = this.formBuilder.group({
      userEmail: [this.loginRegister?.userEmail, [Validators.required, Validators.email]],
      userPassword: [this.loginRegister?.userPassword, [Validators.required, Validators.pattern(this.regexStrongPassword)]]
    });
  }

  private async strongPasswordProgress(){
    this.loginRegisterForm.get('userPassword')?.valueChanges
      .subscribe(password => {
        this.defineStrongPasswordProgress(password);
      });
  }

  private defineStrongPasswordProgress(passwordValue: string){
    let valueProgress = 0;
    let valueTotalProgress = 100;
    let valueTotalValidation = 4;
    let valueForEachValidation = valueTotalProgress / valueTotalValidation;

    const hasUpper = /[A-Z]/.test(passwordValue);
    const hasLower = /[a-z]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);
    const isValid = passwordValue.length >= 6;

    if(hasUpper) valueProgress += valueForEachValidation;
    if(hasLower) valueProgress += valueForEachValidation;
    if(hasNumber) valueProgress += valueForEachValidation;
    if(isValid) valueProgress += valueForEachValidation;

    this.valueProgressPassword = valueProgress;
  }

  private async emitEventOnGetLoginRegister(){
    this.loginRegisterForm.statusChanges.subscribe(res => {
      if(res == 'INVALID'){
        this.loginRegister = new LoginRegister();
        this.loginRegister.formIsValid = false;
        return this.onGetLoginRegister.emit(this.loginRegister);
      } else {
        this.submitForm();
        this.loginRegister.formIsValid = true;
        return this.onGetLoginRegister.emit(this.loginRegister);
      }
    });
  }

  private submitForm() {
    this.loginRegister = Object.assign({}, this.loginRegister, this.loginRegisterForm.value);
  }

  //#endregion


}
