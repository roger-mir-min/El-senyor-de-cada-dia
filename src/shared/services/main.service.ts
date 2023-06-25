import { Injectable } from '@angular/core';
import { Punt } from '../models/interfaces';
import { datasetPuntsArray } from 'src/assets/data/punts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainService {

    createMarker = new BehaviorSubject<Punt | null>(null);
    createMarker$ = this.createMarker.asObservable();


    markersArray: Punt[] = [];
    updateMarkersArray = new BehaviorSubject<Punt[] | null>([]);
    updateMarkersArray$ = this.updateMarkersArray.asObservable();

    constructor() {
        this.updateMarkersArray$.subscribe(res => {
            this.markersArray = res!;
        });
        this.updateMarkersArray.next(this.getInitialArray())
        
    }
    
    //get localStorage or hard-coded dataSet
    getInitialArray(): Punt[] {
        if (localStorage.getItem('elsenyor-array')) {
            console.log("L'array de localStorage: " + JSON.parse(localStorage.getItem('elsenyor-array')!));
            return JSON.parse(localStorage.getItem('elsenyor-array')!);
        } else {
            return this.markersArray = datasetPuntsArray;
        }
    }

    addMarker(marker: Punt) {
        //push new point to array
        this.markersArray.push(marker);
        //send new point to components
        this.createMarker.next(marker);
        //store new point in localStorage
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray));

        console.log("Ara markersArray és: " + this.markersArray);
    }

    deleteMarkerFromArr(markerName: string) {
        this.markersArray = [...this.markersArray.filter(obj => obj.name !== markerName)];
    }
    
    deleteMarkerAndReload(markerName: string) {
        this.deleteMarkerFromArr(markerName);
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray));
        location.reload();
    }

    deleteAllMarkers() {
        this.updateMarkersArray.next(null); //crec que no cal
        localStorage.removeItem('elsenyor-array');
        location.reload();
    }

    changeFav(marker: Punt, val: boolean) {
        this.deleteMarkerFromArr(marker.name);
        this.markersArray.push({
            name: marker.name,
            lat: marker.lat,
            lng: marker.lng,
            descripcio: marker.descripcio,
            default: marker.default,
            fav: val //passem el nou estat de fav
        });
        localStorage.setItem('elsenyor-array', JSON.stringify(this.markersArray));
        location.reload();
    }

}
