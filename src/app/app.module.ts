import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//#region Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './components/shared/shared.module';
//#endregion

//#region
import { ThemeService } from './services/theme/theme.service';
//#endregion

//#region Components
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
//Eendregion

//#region Modules
import { RegisterModule } from './modules/register/register.module';
//#endregion

//#region Others
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CustomFormsModule } from 'ng2-validation';
//Eendregion

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TooltipModule.forRoot(),
    RegisterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
