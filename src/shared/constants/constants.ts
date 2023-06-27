import { Map } from "leaflet";

//coordenades de Sabadell
export const baseMap: Map = new Map('map').setView([41.548508, 2.099677], 14);

//"atlas" tile
export const tileUrl = "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=cca52b11a2fb4067b0e182f6fe865ec3";