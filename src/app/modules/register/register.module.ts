import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterInitialComponent } from './components/register-initial/register-initial.component';
import { ContactComponent } from './components/contact/contact.component';
import { LocalizationComponent } from './components/localization/localization.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from "ngx-spinner";

import { RegisterService } from './services/register.service';

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
    HttpClientModule,
    RegisterRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [
    RegisterService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterModule { }
