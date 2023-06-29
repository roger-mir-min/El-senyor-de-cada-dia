import { RutesComponent } from "./rutes.component";
import { RutesService } from "./services/rutes.service";

export const RUTES_ROUTES = [
    {path: '', providers:[RutesService], component: RutesComponent}
];