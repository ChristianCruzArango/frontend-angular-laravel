import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../URL_CONST';
import { delay,map,catchError } from 'rxjs/operators';
import { SuperHeoreModel } from '../model/superheroe.model';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  constructor(private http:HttpClient) { }

  getheroes(){

    return this.http.get(`${URL}/heroe`).pipe(
      map(this.crearArraHeroes),
      delay(0)
    );

  }

  private crearArraHeroes(heroesObj:Object){

    const heroes:SuperHeoreModel[] = [];

    if(heroesObj===null){return[];}

    Object.keys(heroesObj).forEach(key=>{
      const heroe:SuperHeoreModel = heroesObj[key];
      heroes.push(heroe);
    });
    return heroes;
  }

  crearHeroe(heroe:SuperHeoreModel){
    return this.http.post(`${URL}/heroe`,heroe).pipe(
      map((resp:any)=>{
        heroe.id = resp.id;
        return heroe;
      })
    );
  }

getHeroe(id:string){
  return this.http.get(`${URL}/heroe/${id}`);
}

borrarHeroe(id:string){
  return this.http.delete(`${URL}/heroe/${id}`).pipe(
    catchError(error => {
      return throwError(error);
    })
  );
}

actualizarHeroe(heroe:SuperHeoreModel){
  const heroeTemp={
    ...heroe
  }

  delete heroeTemp.id;

  return this.http.put(`${URL}/heroe/${heroe.id}`,heroeTemp);
}


}
