import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map,delay ,catchError} from 'rxjs/operators';
import { ActorModel } from '../model/actor.model';
import {  throwError } from 'rxjs';
import {URL} from '../URL_CONST';



@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http:HttpClient) { }

  getActors(){

    return this.http.get(`${URL}/actor`).pipe(
      map(this.crearArrActors),
      delay(0)
      );
  }

  private crearArrActors(actorsObj:Object){

    const actors:ActorModel[] = [];

    if (actorsObj === null){return[];}

    Object.keys(actorsObj).forEach(key =>{
      const actor:ActorModel = actorsObj[key];
      actors.push(actor);
    });
  return actors;
  }

  crearActor(actor:ActorModel){
    return this.http.post(`${URL}/actor`,actor).pipe(
      map((resp:any)=>{
        actor.id = resp.id;
        return actor;
      })
    );
  }

  getActor(id:string){
    return this.http.get(`${URL}/actor/${id}`);
  }

  borrarActor(id:string){
    return this.http.delete(`${URL}/actor/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  actualizarActor(actor:ActorModel){
    const actorTemp={
      ...actor
    };

    delete actorTemp.id;

    return this.http.put(`${URL}/actor/${actor.id}`,actorTemp);
  }

}
