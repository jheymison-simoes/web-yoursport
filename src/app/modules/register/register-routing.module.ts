import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { LocalizationComponent } from './components/localization/localization.component';
import { LoginPasswordComponent } from './components/login-password/login-password.component';
import { RegisterInitialComponent } from './components/register-initial/register-initial.component';

const registerRouterConfig: Routes = [
  {path: '', redirectTo: 'initial/contact', pathMatch: 'full'},
  {
    path: 'initial', component: RegisterInitialComponent,
    children: [
      { path: 'contact', component: ContactComponent },
      { path: 'localization', component: LocalizationComponent },
      { path: 'loginPassword', component: LoginPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(registerRouterConfig)
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
