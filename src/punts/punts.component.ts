import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Map, marker, tileLayer } from 'leaflet';
import { datasetPuntsArray } from 'src/assets/data/punts';
import { Coords, Punt } from 'src/shared/models/interfaces';
import { PuntsService } from './services/punts.service';
import { Observable } from 'rxjs';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-punts',
  templateUrl: './punts.component.html',
  styleUrls: ['./punts.component.scss']
})
export class PuntsComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  markersArr = signal<Punt[]>([]);
  currentCoords: Coords = { lat: 0, lng: 0 };
  showForm = false;
  markerForm: FormGroup;

  constructor(private fb: FormBuilder, private puntsService: PuntsService) {
    this.markersArr = this.puntsService.markersArray;

    this.markerForm = this.fb.group({
      inputNom: "",
      inputPuntuacio: 0,
      inputDescripcio: "",
      inputFav: false
    });
  }

  ngOnInit() {
    console.log("Punts component initialized.");
  }

  openNewPointInput(e:any) {
    console.log("Objecte rebut de map a punts: " + e.target);
    this.currentCoords = { ...e };
    console.log("current coords: " + this.currentCoords);
    //mostrem form
    this.showForm = true;
  }

  submitForm() {
    const formValue = this.markerForm.value;

    let newPunt: Punt = {
      name: formValue.inputNom,
      lat: this.currentCoords.lat,
      lng: this.currentCoords.lng,
      descripcio: formValue.inputDescripcio,
      puntuacio: formValue.inputPuntuacio,
      default: false,
      fav: formValue.inputFav
    }

    this.puntsService.addMarker(newPunt);

    //reset form
    this.markerForm.reset;
    //amaguem form
    this.showForm = false;
  }

  deleteAllMarkers() {
    this.puntsService.deleteAllMarkers();
  }

  emitCenterImg(lat:number, lng: number) {
    this.mapComponent.centerMap(lat, lng);
  }

  deleteMarker(markerName: string) {
    this.puntsService.deleteMarkerAndReload(markerName);
  }

  changeFav(marker:Punt, val: boolean) {
    this.puntsService.changeFav(marker, val);
  }

}
