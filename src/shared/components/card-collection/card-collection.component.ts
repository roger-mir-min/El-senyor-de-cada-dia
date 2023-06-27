import { Component, OnInit, Input } from '@angular/core';
import { Punt, Ruta } from 'src/shared/models/interfaces';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {

  @Input() data!: Punt|Ruta;

  constructor() { }

  ngOnInit() {
  }


  

}
