import { Map } from "leaflet";

//coordenades de Sabadell
//ho fem així perquè important directament el mapa dona error, probablement perquè
//s'instancia el map abans de tenir accés a l'element DOM que necessita

//"atlas" tile
export const tileUrl = "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=cca52b11a2fb4067b0e182f6fe865ec3";