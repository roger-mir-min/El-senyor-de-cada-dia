import { Injectable, signal } from '@angular/core';
import { Punt } from 'src/shared/models/interfaces';
import { datasetPuntsArray } from 'src/assets/data/punts';

@Injectable()
export class PuntsService {

    markersArray = signal<Punt[]>([]);

    constructor() {
        this.markersArray.set(this.getInitialArray());
    }
    
    //get localStorage or hard-coded dataSet
    getInitialArray(): Punt[] {
        if (localStorage.getItem('elsenyor-array')) {
            console.log("L'array de localStorage: " + JSON.parse(localStorage.getItem('elsenyor-array')!));
            return JSON.parse(localStorage.getItem('elsenyor-array')!);
        } else {
            return datasetPuntsArray;
        }
    }

    addMarkerToArr(marker: Punt) {
        //push new point to array
        this.markersArray.mutate(arr=>arr.push(marker));
        //store new point in localStorage
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray()));

        console.log("Ara markersArray és: " + this.markersArray());
    }

    deleteMarkerFromArr(markerName: string) {
        this.markersArray.update(arr=>[...arr.filter(obj => obj.name !== markerName)]);
    }
    
    deleteMarkerAndReload(markerName: string) {
        this.deleteMarkerFromArr(markerName);
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray()));
    }

    deleteAllMarkers() {
        this.markersArray.update(arr => []);
        localStorage.removeItem('elsenyor-array');
    }

    changeFav(marker: Punt, val: boolean) {
        this.deleteMarkerFromArr(marker.name);
        this.markersArray.mutate(arr=>arr.push({
            name: marker.name,
            lat: marker.lat,
            lng: marker.lng,
            descripcio: marker.descripcio,
            default: marker.default,
            fav: val //passem el nou estat de fav
        }));
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray()));
    }

}
