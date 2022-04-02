import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterInitialComponent } from './components/register-initial/register-initial.component';
import { ContactComponent } from './components/contact/contact.component';
import { LocalizationComponent } from './components/localization/localization.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { NgxMaskModule } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations:
  [
    RegisterInitialComponent,
    ContactComponent,
    LocalizationComponent,
    LoginPasswordComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterModule { }
