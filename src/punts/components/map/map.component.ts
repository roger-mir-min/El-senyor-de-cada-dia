import { Component, EventEmitter, OnInit, Output, effect } from '@angular/core';
import { Map, marker, tileLayer } from 'leaflet';
import { PuntsService } from 'src/punts/services/punts.service';
import { createBaseMap } from 'src/shared/utils/functions';
import { addBaseLayerToMap, centerMap } from 'src/shared/utils/functions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map!: Map;

  markersArr = this.puntsService.markersArray;
  @Output() coordEmitter = new EventEmitter<{lat:number, lng:number}>();

  //INPUT VARIABLES for MAP COMPONENT
  currentLat: number = 0;
  currentLon: number = 0;

  constructor(private puntsService: PuntsService) {
  }

  ngOnInit() {
    console.log("Map component initilized");
  }

  ngAfterViewInit() {
    //MAPA
    //coordenades de Sabadell
    this.map = createBaseMap('map');

    //LAYER
    addBaseLayerToMap(this.map);

    //MARKERS
    this.addMarkersArrToMap();

    //EVENT
    this.map.on('click', e => {
      this.coordEmitter.emit({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

  }

  //When markersArr is updated, map is updated
  resetMapAfterMarkersArrUpdate = effect(() => {
    if (this.map) {
      this.map.eachLayer(layer => { this.map.removeLayer(layer) });
      addBaseLayerToMap(this.map);
      this.addMarkersArrToMap();
    }
  });
  
  addMarkersArrToMap() {
    this.markersArr().map(mark => {
      const markerItem = marker([mark.lat, mark.lng], { draggable: true }).addTo(this.map)
        .bindPopup(`<div class="text-crimson position-relative">
          <h2 class="text-handle"><b>${mark!.name}</b></h2>
          <p><b>Puntuació</b>: ${mark!.puntuacio}</p>
          <p><b>Descripció</b>: ${mark!.descripcio}</p>
          <i *ngIf="marker.fav==true && marker.default == false" class="fa-solid fa-star" style="position:absolute; 
          bottom:16px; right:12px"></i>
          <button (click)="deleteMarker(e)" class="btn btn-outline-dark text-crimson">Eliminar marcador</button>
        </div>`);
  });
  }

  //when clicking on a place card, scroll to top (where map component is)
  //and center map into the card coordenates
  centerMap(lat: number, lng: number) {
    centerMap(lat, lng, this.map);
  }

}
