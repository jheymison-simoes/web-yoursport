import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    NgxSpinnerModule
  ],
  declarations:
  [
    CardInfoComponent,
    SpinnerComponent
  ],
  exports: [
    CardInfoComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
