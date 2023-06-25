import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RutesComponent } from './rutes.component';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [ { path: '', component:  RutesComponent} ];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule],
    exports: [
        RouterModule,
        ReactiveFormsModule]
})
export class RutesRoutingModule { }