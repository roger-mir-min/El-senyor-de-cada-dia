import { Component, OnInit } from '@angular/core';
import { MapRutesComponent } from './map-rutes/map-rutes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rutes',
  standalone: true,
  imports: [CommonModule, MapRutesComponent],
  templateUrl: './rutes.component.html',
  styleUrls: ['./rutes.component.scss']
})
export class RutesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
