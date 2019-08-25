import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { PeliculaModel } from '../../model/pelicula.model';
import { SuperHeoreModel } from '../../model/superheroe.model';
import { PeliculasService } from '../../services/peliculas.service';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  peliculas:PeliculaModel =  new PeliculaModel();
  superHeroe:SuperHeoreModel[] = [];

  constructor(private peliculasServices:PeliculasService,private superHeroeServices:SuperHeroesService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.superHeroeServices.getheroes().subscribe(resp=>this.superHeroe=resp);

    const id = this.route.snapshot.paramMap.get('id');

    if (id !=='nuevo'){
      this.peliculasServices.getPelicula(id).subscribe((resp:PeliculaModel) => {
        this.peliculas = resp;
      });
    }

  }


  guardar(form:NgForm){

    if(form.invalid){
      Swal.fire({
        title:'ERROR',
        text:'Todos los campos deben estar llenos',
        type:'error'
      });
      return;
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando Información',
      type:'info',
      allowOutsideClick:false
    });

     Swal.showLoading();

     let informacion:Observable<any>;

     if (this.peliculas.id){
      informacion = this.peliculasServices.actualizarPelicula(this.peliculas);
     }else{
       informacion = this.peliculasServices.crearPelicula(this.peliculas);
     }

     informacion.subscribe(resp=>{
      Swal.fire({
        title:this.peliculas.name,
        text:'Se realizo correctamente',
        type:'success'
      });
     });

     form.reset();
  }

}
