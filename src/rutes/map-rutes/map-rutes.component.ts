import { Component, ElementRef, OnInit, Renderer2, effect, signal } from '@angular/core';
import { Map, marker, polyline } from 'leaflet';
import { Coords } from 'src/shared/models/interfaces';
import { RutesService } from '../services/rutes.service';
import { Ruta } from '../../shared/models/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addBaseLayerToMap, centerMap } from 'src/shared/utils/functions';
import { createBaseMap } from 'src/shared/utils/functions';

@Component({
  selector: 'app-map-rutes',
  templateUrl: './map-rutes.component.html',
  styleUrls: ['./map-rutes.component.scss']
})
export class MapRutesComponent implements OnInit {

  map!: Map;

  rutesArray = signal<Ruta[]>([]);
  
  showArray = false;
  rutaForm: FormGroup;
  currentCoords: Coords[] = [];

  //INPUT VARIABLES
  // currentLat: number = 0;
  // currentLon: number = 0;


  constructor(private fb: FormBuilder, private rutesService: RutesService,
  private renderer: Renderer2, private el: ElementRef) {
    this.rutesArray = this.rutesService.rutesArray;

    this.rutaForm = this.fb.group({
      inputNom: ["", [Validators.required]],
      inputPuntuacio: [0, [Validators.required]],
      inputDescripcio: ["", [Validators.required]],
      inputFav: false
    });
  }

    //When rutesArray is updated, map is updated
  resetMapAfterRutesArrayUpdate = effect(() => {
    if (this.rutesArray() && this.map) {
      this.map.eachLayer(layer => { this.map.removeLayer(layer) });
      addBaseLayerToMap(this.map);
      this.addRutesToMap();
    }
  });

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
    this.map = createBaseMap('map');

    //LAYER
    addBaseLayerToMap(this.map);

    //POLYLINE - ADD ROUTE a partir de l'array
    this.addRutesToMap();

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

  addRutesToMap() {
    this.rutesArray().map(ruta => {
      const rutaItem = polyline(ruta.coords, { color: this.getRandomColor() }).bindPopup(`${ruta.name}`).addTo(this.map);

      rutaItem.on('click', () => rutaItem.openPopup());
      rutaItem.on('popupopen', () => this.highlightCard({ selectedRuta:ruta, highlight: true}));
      rutaItem.on('popupclose', () => this.highlightCard({ selectedRuta:ruta, highlight: false}));
    });
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

  highlightedCard: any;

    highlightCard(e:{selectedRuta:Ruta, highlight:boolean}) {
    this.rutesArray().forEach((ruta, i) => {
      if (e.selectedRuta.name == ruta.name
        && e.selectedRuta.coords[0].lng == ruta.coords[0].lng 
        && e.selectedRuta.coords[0].lat == ruta.coords[0].lat) {
        this.highlightedCard = this.el.nativeElement.querySelector(`#card-${i}`);
          if (e.highlight == true) {
            this.renderer.setStyle(this.highlightedCard, 'border', '1px solid black');
          } else {
            this.renderer.setStyle(this.highlightedCard, 'border', 'none');
          }
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

}
