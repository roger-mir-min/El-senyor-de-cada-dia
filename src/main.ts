// ./main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

const routes = [
    { path: '', loadChildren: () => import('./landing/LANDING_ROUTES').then(mod=>mod.LANDING_ROUTES) },
    { path: 'punts', loadChildren: () => import('./punts/PUNTS_ROUTES').then(mod=>mod.PUNTS_ROUTES) },
    { path: 'rutes', loadChildren: () => import('./rutes/RUTES_ROUTES').then(mod=>mod.RUTES_ROUTES) }
];

bootstrapApplication(AppComponent,
  { providers: [provideRouter(routes)] }).catch(e => console.error(e));

// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
