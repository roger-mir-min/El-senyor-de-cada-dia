import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routes.module';
import { LandingComponent } from './landing.component';


@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
