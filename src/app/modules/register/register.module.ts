import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterInitialComponent } from './components/register-initial/register-initial.component';
import { ContactComponent } from './components/contact/contact.component';
import { LocalizationComponent } from './components/localization/localization.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxMaskModule } from 'ngx-mask';

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
    NgxMaskModule.forRoot()
  ]
})
export class RegisterModule { }
