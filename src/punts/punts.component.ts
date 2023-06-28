import { Component, OnInit, ViewChild, signal, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coords, Punt } from 'src/shared/models/interfaces';
import { PuntsService } from './services/punts.service';
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

  constructor(private fb: FormBuilder, private puntsService: PuntsService,
  private renderer: Renderer2, private el: ElementRef) {
    this.markersArr = this.puntsService.markersArray;

    this.markerForm = this.fb.group({
      inputNom: ["", [Validators.required]],
      inputPuntuacio: [0, [Validators.required]],
      inputDescripcio: ["", [Validators.required]],
      inputFav: false
    });

    
  }

  ngOnInit() {
    console.log("Punts component initialized.");
  }

  openNewPointInput(e:any) {
    this.currentCoords = { ...e };
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

    this.puntsService.addMarkerToArr(newPunt);
    this.markerForm.reset();
    this.showForm = false;
  }

  deleteAllMarkers() {
    this.puntsService.deleteAllMarkers();
  }

  emitCenterImg(lat:number, lng: number) {
    this.mapComponent.centerMap(lat, lng);
  }

  deleteMarker(markerName: string) {
    this.puntsService.deleteMarkerFromArr(markerName);
  }

  changeFav(marker:Punt, val: boolean) {
    this.puntsService.changeFav(marker, val);
  }

  highlightedCard: any;

  //falta tipar
  highlightCard(e:{coords:Coords, highlight:boolean}) {
    this.markersArr().forEach((marker, i) => {
      if (marker.lat == e.coords.lat && marker.lng == e.coords.lng) {
        this.highlightedCard = this.el.nativeElement.querySelector(`#card-${i}`);
        if (e.highlight == true) {
          this.renderer.setStyle(this.highlightedCard, 'border', '1px solid black');
        } else {
          this.renderer.setStyle(this.highlightedCard, 'border', 'none');
        }
      }
    });
  }

}
