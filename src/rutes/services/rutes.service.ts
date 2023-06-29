import { Injectable, effect, signal } from '@angular/core';
import { datasetRutesArray } from 'src/assets/data/rutes';
import { Ruta } from 'src/shared/models/interfaces';

@Injectable()
export class RutesService {

    rutesArray = signal<Ruta[]>([]);

    constructor() {
        this.rutesArray.set(this.getInitialArray());
        effect(() => {
            localStorage.setItem('elsenyor-rutes', JSON.stringify(this.rutesArray()));
            console.log("s'ha guardat localstorage");
        })
    }

    getInitialArray(): Ruta[] {
        if (localStorage.getItem('elsenyor-rutes') && JSON.parse(localStorage.getItem('elsenyor-rutes')!).length>0) {
            return JSON.parse(localStorage.getItem('elsenyor-rutes')!);
        } else {
            return datasetRutesArray;
        }
    }
    
    addRuta(ruta: Ruta) {
        this.rutesArray.mutate(arr => arr.push(ruta));
    }

    deleteRutaFromArr(rutaName: string) {
        this.rutesArray.update(arr => [...arr.filter(obj => obj.name !== rutaName)]);
    }

    deleteAllRutes() {
        this.rutesArray.update(arr => []);
        localStorage.removeItem('elsenyor-rutes');//crec que no cal
    }

    modifyRutaOfArr(modifiedRuta: Ruta, prevName: string) {
        const index = this.rutesArray().findIndex((ruta: Ruta) => ruta.name == prevName);
        this.rutesArray.mutate(arr => arr[index] = modifiedRuta);
    }
    
    //en realitat l'únic valor que es canvia és .fav
    changeFav(ruta: Ruta, val: boolean) {
        this.deleteRutaFromArr(ruta.name);
        this.rutesArray.mutate(arr => arr.push({
            name: ruta.name,
            coords: ruta.coords,
            descripcio: ruta.descripcio,
            puntuacio: ruta.puntuacio,
            default: ruta.default,
            fav: val
        }));
    }

}
