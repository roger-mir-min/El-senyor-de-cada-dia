import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule) },   
    { path: 'punts', loadChildren: () => import('../punts/punts.module').then(m => m.PuntsModule) },
    { path: 'rutes', loadChildren: () => import('../rutes/rutes.module').then(m => m.RutesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }