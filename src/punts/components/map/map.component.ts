import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { datasetPuntsArray } from 'src/assets/data/punts';
import { Punt } from 'src/shared/models/interfaces';
import { MainService } from 'src/shared/services/main.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  //aquest component agafa l'array inicial i després hi va afegint marcadors
  //però pròpiament markersArr no està en sincronia amb el servei
  //podria posar en sincronia i fer funció que, en canviar (.next) array
  //es refessin tots els marcadors? o millor: que s'afegissin els nous?

  map!: Map;

  markersArr = this.mainService.markersArray;
  @Output() coordEmitter = new EventEmitter<{lat:number, lng:number}>();

  //INPUT VARIABLES
  currentLat: number = 0;
  currentLon: number = 0;

  constructor(private mainService: MainService) {
  }

  ngOnInit() {
    console.log("Map component initilized");
  }

  ngAfterViewInit() {
    //MAPA
    //coordenades de Sabadell
    this.map = new Map('map').setView([41.548508, 2.099677], 14);

    //TILE
    const tileUrl = "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=cca52b11a2fb4067b0e182f6fe865ec3";

    //LAYER
    tileLayer(tileUrl, {maxZoom: 18,
	  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //MARKERS
    this.markersArr.map(mark => {
      const markerItem = marker([mark.lat, mark.lng], { draggable: true }).addTo(this.map).bindPopup(`${mark.name}`);
      // markerItem.on('move', () => { map.removeLayer(markerItem) });
    });

    //EVENT
    this.map.on('click', e => {
      console.log(e.latlng.lat, e.latlng.lng);
      this.coordEmitter.emit({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    //ADD MARKER
    //Quan canvia llista de punts de mainService, es crea nou marcador
    this.mainService.createMarker$.subscribe(res => {
      if (res) {
        let newMarker = marker([res!.lat, res!.lng], { draggable: true }).addTo(this.map)
          .bindPopup(`<h1>Info del nou punt</h1>
          <p>Nom: ${res!.name}</p>
          <p>Puntuació: ${res!.puntuacio}</p>
          <p>Descripció: ${res!.descripcio}</p>
          <button (click)="deleteMarker(e)">Eliminar marcador</button>`);
      }
    });
    
  }

  //when clicking on a place card, scroll to top (where map component is)
  //and center map into the card coordenates
  centerMap(lat: number, lng: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.map.setView([lat, lng], 17);
  }

}
