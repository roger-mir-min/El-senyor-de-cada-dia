import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PuntsComponent } from './punts.component';



const routes: Routes = [ { path: '', component: PuntsComponent } ];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule],
    exports: [RouterModule]
})
export class PuntsRoutingModule { }