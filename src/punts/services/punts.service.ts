import { Injectable, effect, signal } from '@angular/core';
import { Punt } from 'src/shared/models/interfaces';
import { datasetPuntsArray } from 'src/assets/data/punts';

@Injectable()
export class PuntsService {

    markersArray = signal<Punt[]>([]);

    constructor() {
        this.markersArray.set(this.getInitialArray());
        effect(() => {
            localStorage.setItem('elsenyor-punts', JSON.stringify(this.markersArray()));
        });
    }
    
    getInitialArray(): Punt[] {
        if (localStorage.getItem('elsenyor-punts') && JSON.parse(localStorage.getItem('elsenyor-punts')!).length>0) {
            return JSON.parse(localStorage.getItem('elsenyor-punts')!);
        } else {
            return datasetPuntsArray;
        }
    }

    addMarkerToArr(marker: Punt) {
        this.markersArray.mutate(arr=>arr.push(marker));
    }

    deleteMarkerFromArr(markerName: string) {
        this.markersArray.update(arr=>[...arr.filter(obj => obj.name !== markerName)]);
    }

    deleteAllMarkers() {
        this.markersArray.update(arr => []);
        localStorage.removeItem('elsenyor-punts');//no sé si cal, ara que getInitialvalues admet []
    }

    //en realitat l'únic valor que es canvia és .fav
    changeFav(marker: Punt, val: boolean) { 
        this.deleteMarkerFromArr(marker.name); //potser puc esborrar això i a baix canviar?
        this.markersArray.mutate(arr=>arr.push({
            name: marker.name,
            lat: marker.lat,
            lng: marker.lng,
            descripcio: marker.descripcio,
            default: marker.default,
            fav: val
        }));
    }

}
