import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//#region Components
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
//Eendregion

//#region NgxBootstrap
import { TooltipModule } from 'ngx-bootstrap/tooltip';
//Eendregion

//#region Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
//#endregion

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
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
