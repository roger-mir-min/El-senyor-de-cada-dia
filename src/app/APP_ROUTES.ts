export const APP_ROUTES = [
    { path: '', loadChildren: () => import('../landing/LANDING_ROUTES').then(mod=>mod.LANDING_ROUTES) },
    { path: 'punts', loadChildren: () => import('../punts/PUNTS_ROUTES').then(mod=>mod.PUNTS_ROUTES) },
    { path: 'rutes', loadChildren: () => import('../rutes/RUTES_ROUTES').then(mod=>mod.RUTES_ROUTES) }
];