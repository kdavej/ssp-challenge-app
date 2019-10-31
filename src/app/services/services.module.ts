import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EsriService } from './esri/esri.service';



@NgModule({
  declarations: [
  ],
  providers: [
    EsriService,
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
