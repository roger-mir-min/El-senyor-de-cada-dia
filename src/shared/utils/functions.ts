import { Map, tileLayer } from "leaflet";
import { tileUrl } from "../constants/constants";

export function addBaseLayerToMap(map: Map) {
    tileLayer(tileUrl, {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

export function centerMap(lat: number, lng: number, map: Map) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    map.setView([lat, lng], 17);
}

export function createBaseMap(element: string | HTMLElement): Map {
  return new Map(element).setView([41.548508, 2.099677], 14);
}