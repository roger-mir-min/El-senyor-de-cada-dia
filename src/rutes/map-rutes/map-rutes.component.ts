import { Component, EventEmitter, OnInit, ViewChild, Output, signal } from '@angular/core';
import { Map, marker, polyline, tileLayer } from 'leaflet';
import { datasetPuntsArray } from 'src/assets/data/punts';
import { datasetRutesArray } from 'src/assets/data/rutes';
import { Coords, Punt } from 'src/shared/models/interfaces';
import { MainService } from 'src/shared/services/main.service';
import { RutesService } from '../services/rutes.service';
import { Ruta } from '../../shared/models/interfaces';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-map-rutes',
  templateUrl: './map-rutes.component.html',
  styleUrls: ['./map-rutes.component.scss']
})
export class MapRutesComponent implements OnInit {

 //aquest component agafa l'array inicial i després hi va afegint marcadors
  //però pròpiament markersArr no està en sincronia amb el servei
  //podria posar en sincronia i fer funció que, en canviar (.next) array
  //es refessin tots els marcadors? o millor: que s'afegissin els nous?

  map!: Map;

  rutesArray = signal<Ruta[]>([]);
  @Output() coordEmitter = new EventEmitter<{ lat: number, lng: number }>();
  
  showArray = false;
  currentCoords: Coords[] = [];

  //INPUT VARIABLES
  currentLat: number = 0;
  currentLon: number = 0;

    rutaForm: FormGroup;

  constructor(private fb: FormBuilder, private rutesService: RutesService) {
    this.rutesArray = this.rutesService.rutesArray;

      this.rutaForm = this.fb.group({
      inputNom: "",
      inputPuntuacio: 0,
      inputDescripcio: "",
      inputFav: false
    });
  }

  submitForm() {
    const formValue = this.rutaForm.value;

    let newRuta: Ruta = {
      name: formValue.inputNom,
      coords: this.currentCoords,
      descripcio: formValue.inputDescripcio,
      puntuacio: formValue.inputPuntuacio,
      default: false,
      fav: formValue.inputFav
    }

    this.rutesService.addRuta(newRuta);

    //reset form
    this.rutaForm.reset;
    //amaguem form
    this.showArray = false;
    
  }

  ngOnInit() {
    console.log("Map-rutes component initilized");
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

    //POLYLINE - ADD ROUTE a partir de l'array
    this.rutesArray().map(ruta => {
      const rutaItem = polyline(ruta.coords, { color: this.getRandomColor() }).addTo(this.map);
    });

    //EVENT: ON CLICK, ADD PUNTS --IF SHOWARRAY IS TRUE
    this.map.on('click', e => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log(lat, lng);
      if (this.showArray == true) {
        this.currentCoords.push({ lat: lat, lng: lng });
        let newMarker = marker([lat, lng]).addTo(this.map);
        //en tornar a clicar el marcador, s'esborra del mapa i de la llista de punts
        newMarker.on('click', () => {
          this.map.removeLayer(newMarker);
          this.currentCoords = [...this.currentCoords.filter(
            x => x.lat !== lat && x.lng !== lng)];
        });
      }
    });

  }

  getRandomColor() {
    const number = Math.random()*10;
    if (number > 8) {
      return 'blue'
    } else if (number > 6) {
      return 'red'
    } else if (number > 4) {
      return 'green'
    } else if (number > 2) {
      return 'orange'
    } else {
      return 'yellow'
    }
  }

  centerMap(lat: number, lng: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.map.setView([lat, lng], 17);
  }

  //when clicking on a place card, scroll to top (where map component is)
  //and center map into the card coordenates
  // centerMap2(lat1: number, lng1: number, lat2: number, lng2: number) {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  //   this.map.setView([(lat1+lat2)/2, (lng1+lng2)/2], 15);
  // }

  enableAddPuntsOfRutaArray() {
    this.showArray = true;
  }

  deleteRuta(rutaName: string) {
    this.rutesService.deleteRutaAndReload(rutaName);
  }

  deleteAllRutes() {
    this.rutesService.deleteAllRutes();
  }

  changeFav(ruta:Ruta, val: boolean) {
  this.rutesService.changeFav(ruta, val);
  }

  

}
