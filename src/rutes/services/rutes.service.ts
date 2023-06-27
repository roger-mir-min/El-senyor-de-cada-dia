import { Injectable, signal } from '@angular/core';
import { datasetRutesArray } from 'src/assets/data/rutes';
import { Ruta } from 'src/shared/models/interfaces';

@Injectable()
export class RutesService {

    rutesArray = signal<Ruta[]>([]);

    constructor() {
        this.rutesArray.set(this.getInitialArray());
    }

    getInitialArray(): Ruta[] {
        if (localStorage.getItem('elsenyor-rutes') && JSON.parse(localStorage.getItem('elsenyor-rutes')!).length>0) {
            console.log(localStorage.getItem('elsenyor-rutes')!);
            return JSON.parse(localStorage.getItem('elsenyor-rutes')!);
        } else {
            return datasetRutesArray;
        }
    }
    
    addRuta(ruta: Ruta) {
        this.rutesArray.mutate(arr => arr.push(ruta));
        localStorage.setItem('elsenyor-rutes', JSON.stringify(this.rutesArray()));
        //faltaria actualitza reactivament, de moment faig reload
        location.reload();
    }

    deleteRutaAndReload(rutaName: string) {
        this.deleteRutaFromArr(rutaName);
        localStorage.setItem('elsenyor-rutes', JSON.stringify(this.rutesArray()));
        location.reload();
    }

    deleteRutaFromArr(rutaName: string) {
        this.rutesArray.update(arr => [...arr.filter(obj => obj.name !== rutaName)]);
    }

    deleteAllRutes() {
        localStorage.removeItem('elsenyor-rutes');
        location.reload();
    }
    
    changeFav(ruta: Ruta, val: boolean) {
        this.deleteRutaFromArr(ruta.name);
        this.rutesArray.mutate(arr => arr.push({
            name: ruta.name,
            coords: ruta.coords,
            descripcio: ruta.descripcio,
            puntuacio: ruta.puntuacio,
            default: ruta.default,
            fav: val //passem el nou estat de fav
        }));
        localStorage.setItem('elsenyor-rutes', JSON.stringify(this.rutesArray()));
        location.reload();
    }

}
