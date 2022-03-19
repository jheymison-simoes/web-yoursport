import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations:
  [
    CardInfoComponent,

  ],
  exports: [
    CardInfoComponent
  ]
})
export class SharedModule { }
