//MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//COMPONENTS
import { AppComponent } from './app.component';

//SERVICES
import { MainService } from 'src/shared/services/main.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
