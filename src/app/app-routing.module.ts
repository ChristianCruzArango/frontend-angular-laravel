import { SuperHeroesComponent } from './pages/super-heroes/super-heroes.component';

import { RouterModule, Routes } from '@angular/router';
import { PaisesComponent } from './pages/paises/paises.component';
import { PaisComponent } from './pages/pais/pais.component';
import { NgModule } from '@angular/core';
import { ActorComponent } from './pages/actor/actor.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { SuperHeroeComponent } from './pages/super-heroe/super-heroe.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { ActorsComponent } from './pages/actors/actors.component';

const routes: Routes = [
  { path: 'paises'          , component: PaisesComponent },
  { path: 'pais/:id'        , component: PaisComponent },
  { path: 'actors'          , component: ActorsComponent },
  { path: 'actor/:id'       , component: ActorComponent },
  { path: 'peliculas'       , component: PeliculasComponent },
  { path: 'pelicula/:id'    , component: PeliculaComponent },
  { path: 'superheroes'     , component: SuperHeroesComponent },
  { path: 'superheroe/:id', component: SuperHeroeComponent },
  { path: '**', pathMatch:'full', redirectTo: 'peliculas' }
];


@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule { }
