import { Component, EventEmitter, OnInit, ViewChild, Output, signal } from '@angular/core';
import { Map, marker, polyline, tileLayer } from 'leaflet';
import { datasetPuntsArray } from 'src/assets/data/punts';
import { datasetRutesArray } from 'src/assets/data/rutes';
import { Coords, Punt } from 'src/shared/models/interfaces';
import { PuntsService } from 'src/punts/services/punts.service';
import { RutesService } from '../services/rutes.service';
import { Ruta } from '../../shared/models/interfaces';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { addBaseLayerToMap, centerMap } from 'src/shared/utils/functions';
import { baseMap } from 'src/shared/constants/constants';

@Component({
  selector: 'app-map-rutes',
  templateUrl: './map-rutes.component.html',
  styleUrls: ['./map-rutes.component.scss']
})
export class MapRutesComponent implements OnInit {

  map!: Map;

  rutesArray = signal<Ruta[]>([]);
  
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
    this.rutaForm.reset;
    this.showArray = false;
    
  }

  ngOnInit() {
    console.log("Map-rutes component initilized");
  }

  ngAfterViewInit() {
    //MAPA
    this.map = baseMap;

    //LAYER
    addBaseLayerToMap(this.map);

    //POLYLINE - ADD ROUTE a partir de l'array
    this.rutesArray().map(ruta => {
      const rutaItem = polyline(ruta.coords, { color: this.getRandomColor() }).addTo(this.map);
    });

    //EVENT: ON CLICK, ADD PUNTS --IF SHOWARRAY IS TRUE
    this.map.on('click', e => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
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
    if (number > 9) {
      return 'blue'
    } else if (number > 8) {
      return 'purple'
    } else if (number > 7) {
      return 'red'
    } else if (number > 6) {
      return 'pink'
    } else if (number > 5) {
      return 'brown'
    } else if (number > 4) {
      return 'green'
    } else if (number > 3) {
      return 'black'
    } else if (number > 2) {
      return 'orange'
    } else if (number > 2) {
      return 'grey'
    } else {
      return 'yellow'
    }
  }

  centerMap(lat: number, lng: number) {
    centerMap(lat, lng, this.map);
  }

  enableAddPuntsOfRutaArray() {
    this.showArray = true;
  }

  deleteRuta(rutaName: string) {
    this.rutesService.deleteRutaFromArr(rutaName);
  }

  deleteAllRutes() {
    this.rutesService.deleteAllRutes();
  }

  changeFav(ruta:Ruta, val: boolean) {
  this.rutesService.changeFav(ruta, val);
  }

}
