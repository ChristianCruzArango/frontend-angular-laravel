import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PaisComponent } from './pages/pais/pais.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';
import { FlotanteButtonComponent } from './shared/flotante-button/flotante-button.component';
import { ActorComponent } from './pages/actor/actor.component';
import { ActorsComponent } from './pages/actors/actors.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { SuperHeroeComponent } from './pages/super-heroe/super-heroe.component';
import { SuperHeroesComponent } from './pages/super-heroes/super-heroes.component';


@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisesComponent,
    JumbotronComponent,
    FlotanteButtonComponent,
    ActorComponent,
    ActorsComponent,
    PeliculaComponent,
    PeliculasComponent,
    SuperHeroeComponent,
    SuperHeroesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
