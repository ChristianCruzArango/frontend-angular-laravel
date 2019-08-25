import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './../URL_CONST';
import { map, delay,catchError } from 'rxjs/operators';
import { PeliculaModel } from '../model/pelicula.model';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http:HttpClient) { }

  getPeliculas(){
    return this.http.get(`${URL}/peliculas`).pipe(
      map(this.crearArrPeliculas),
      delay(0)
    )
  }

  private crearArrPeliculas(peliculasObject:Object){

    const peliculas:PeliculaModel[] = [];

    if (peliculasObject===null){return[];}

    Object.keys(peliculasObject).forEach(resp=>{
      const pelicula:PeliculaModel = peliculasObject[resp];
      peliculas.push(pelicula);
    });
    return peliculas;
  }

  borrarPelicula(id:string){
    return this.http.delete(`${URL}/pelicula/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


  crearPelicula(pelicula:PeliculaModel){
    return this.http.post(`${URL}/peliculas`,pelicula).pipe(
      map((resp:any)=>{
        pelicula.id = resp.id;
        return pelicula;
      })
    );
  }

  getPelicula(id:string){
    return this.http.get(`${URL}/peliculas/${id}`);
  }

  actualizarPelicula(pelicula:PeliculaModel){
    const peliculaTemp={
      ...pelicula
    };

    delete peliculaTemp.id;

    return this.http.put(`${URL}/peliculas/${pelicula.id}`,peliculaTemp);
  }

}
