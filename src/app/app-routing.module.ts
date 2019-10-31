import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapDisplayComponentComponent } from './components/map-display-component/map-display-component.component';


const routes: Routes = [
  {
    path: '', component: MapDisplayComponentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
