import { PuntsComponent } from "./punts.component";
import { PuntsService } from "./services/punts.service";

export const PUNTS_ROUTES = [
    {path: '', component: PuntsComponent, providers: [PuntsService]}
];