export interface Coords {
    lat: number,
    lng: number
}

export interface Ruta {
    name: string,
    puntuacio: number,
    descripcio?: string,
    fav?: boolean,
    default: boolean,
    coords: Coords[]
}

export interface Punt {
    name: string,
    lat: number,
    lng: number,
    puntuacio?: number,
    descripcio?: string,
    fav: boolean,
    default: boolean,
    preu?: number,
    qualitatPreu?: number,
    comoditat?: number,
    serveis?: string[],
    soroll?: number,
    aparença?: string[],
    multitud?: number
}