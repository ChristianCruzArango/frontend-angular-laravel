import { Component, OnInit } from '@angular/core';
import { PeliculaModel } from '../../model/pelicula.model';
import { PeliculasService } from '../../services/peliculas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  listado:string = 'Listado de Películas';
  peliculas:PeliculaModel[] = [];
  cargando=false;

  constructor(private peliculasServices:PeliculasService) { }

  ngOnInit() {

    this.cargando = true;
    this.peliculasServices.getPeliculas().subscribe(resp=>{
      this.peliculas = resp;
      this.cargando=false;
    })
  }

  borrarPelicula (pelicula:PeliculaModel,i:number){
    Swal.fire({
      title:'Esta Seguro?',
      text:`Esta seguro de eliminar la pelicula ${pelicula.name}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

       this.peliculasServices.borrarPelicula(pelicula.id).subscribe(resp=>{
        if(resp === null){
           /*borra la posicion del arreglo que se trae desde el html */
           this.peliculas.splice(i,1);
          }
      },
     /*se captura el error para mostrar la alert  */
     () =>{
        Swal.fire({
        title:'ERROR',
        text:'No se puede eliminar por favor validar si tiene superheores anexos',
        type:'error'
      });
     }
   );
  }
});
}

}
