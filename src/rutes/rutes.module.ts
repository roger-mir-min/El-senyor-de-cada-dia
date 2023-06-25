import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutesComponent } from './rutes.component';
import { RutesRoutingModule } from './rutes-routing.module';
import { MapRutesComponent } from './map-rutes/map-rutes.component';
import { RutesService } from './services/rutes.service';

@NgModule({
  imports: [
    CommonModule,
    RutesRoutingModule
  ],
  declarations: [
    RutesComponent,
    MapRutesComponent],
  providers: [RutesService]
})
export class RutesModule { }
