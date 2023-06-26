# El senyor de cada dia

Users have two spaces, points ("punts") and routes ("rutes"), where they can create points of interest or routes and store them alongside with additional information such as "Name" ("Nom"), "Description" ("Descripció") and "Points" ("Puntuació").

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Background

I recently moved to a new town, so I am constantly visiting new places, and I felt I needed some way to remember this places and how my experience had been there. So I created this app to help me. Also, it was a good introduction to Leaflet.

## Stack
Angular, Leaflet (Thunderforest, Mapbox), Bootstrap.

## Installing
1. Clone this repository https://roger-mir-min.github.io/elsenyorde/
2. Install node_modules with "npm i" command

## Usage
Select the first image in the landing page if you want to acces the "My points" space, and the second to access the "My routes" space. In both places there are two sections: a map where you can see you stored points/routes and a collection of cards, one for each point/route.
-In the points space, create a point clicking in the map and completing the form that will then appear below the map. After clicking "Crea el punt", the new point will be added to the map and to the card collection.
-In the routes space, create a route by clicking "Afegeix una ruta" (below the map) and completing the form that will appear. After clicking "Crea el punt", the new point will be added to the map and to the card collection.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is released under the MIT License. It was created by Roger Miret Minard in 2023.
