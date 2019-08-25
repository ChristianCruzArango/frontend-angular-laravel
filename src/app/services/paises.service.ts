import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PaisModel } from '../model/pais.model';
import { map, delay, catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import {URL} from '../URL_CONST';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {


  constructor(private http:HttpClient) { }

  crearPais(pais:PaisModel){
    /*se llama el metodo pipe que contiene el metodo map para recorrer la respuesta que nos arroja al momento de insertar para asignarsela al modelo Pais
    esto se realiza para validar si se requiere actualizar o guardar */
    return this.http.post(`${URL}/pais`,pais).pipe(
      map((resp:any)=>{
        pais.id=resp.id;
        return pais;
      })
    );
  }

  actualizarPais(pais:PaisModel){
    /*operador express para crear un objeto con todas las propiedades del pais */
    const paisTemp = {
      ...pais
    };

    /*al momento de realizar la actualizacion de un registro se trae como el id como propiedad del objeto pais,se elimina dicha propiedad para
    actualizar los campos que son necesarios */
    delete paisTemp.id;

    /*se envia a la peticion put la variable temporal sin el id del pais */
    return this.http.put(`${URL}/pais/${pais.id}`,paisTemp);
  }


  getPaises(){
    return this.http.get(`${URL}/pais`).pipe(
      map(this.crearArrPaises),
      delay(0)
    );
  }

  /*se crea una funcion para converit un object a un arreglo ya que si llamo en el ngOnInit no puedo asignar
  la variable resp directamente al html ya que viene como objeto */
  private crearArrPaises(paisesObj:object){
    /*se crea una constante de nombre paises que tiene como referencia el modelo de paises y estara vacio */
    const paises:PaisModel[] = [];

    if (paisesObj === null){return[];}

    /*recorremos con la funcion de js Object.key asignandole el objeto y asignandole la informacion del resultado */
    Object.keys(paisesObj).forEach(key =>{

      const pais:PaisModel = paisesObj[key];

      paises.push(pais);
    });

    return paises;
  }

  getPais(id:string){
    return this.http.get(`${URL}/pais/${id}`);
  }

  borrarPais(id:string){
/*se captura el error al momento de eliminar un pais que tenga anexo un actor para mostrar en pantalla */
    return this.http.delete(`${URL}/pais/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
