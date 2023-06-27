import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { CardCollectionComponent } from '../components/card-collection/card-collection.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CardCollectionComponent
  ],
  declarations: [
    SharedComponent,
    CardCollectionComponent
  ]
})
export class SharedModule { }
