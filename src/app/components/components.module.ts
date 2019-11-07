import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDisplayComponentComponent } from './map-display-component/map-display-component.component';
import { MaterialModule } from '../material.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MapControlsComponent } from './map-controls/map-controls.component';



@NgModule({
  declarations: [MapDisplayComponentComponent, AppLayoutComponent, MapControlsComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ComponentsModule { }
