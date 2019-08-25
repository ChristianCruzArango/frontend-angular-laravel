import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActorModel } from '../../model/actor.model';
import { PaisModel } from '../../model/pais.model';
import { PaisesService } from '../../services/paises.service';

import Swal from 'sweetalert2';
import { ActorsService } from '../../services/actors.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actor:ActorModel = new ActorModel();
  paises:PaisModel[] = [];

  constructor(private paisesServices:PaisesService,private actorServices:ActorsService, private route:ActivatedRoute) { }

  ngOnInit() {
    /*se trae todos los paises para cargar en el combobox */
   this.paisesServices.getPaises().subscribe(resp=>this.paises=resp);

   /*se captura el id que se envia desde la url */
   const id = this.route.snapshot.paramMap.get('id');

  /*se valida si el parametro que se envia desde la url es nuevo o el id de algun actor para realizar el proceso de crear
  o actualizar */
   if (id !=='nuevo'){
      this.actorServices.getActor(id).subscribe((resp:ActorModel) => {
        this.actor = resp;
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

     if (this.actor.id){
      informacion = this.actorServices.actualizarActor(this.actor);
     }else{
       informacion = this.actorServices.crearActor(this.actor);
     }

     informacion.subscribe(resp=>{
      Swal.fire({
        title:this.actor.name,
        text:'Se realizo correctamente',
        type:'success'
      });
     });

     form.reset();
  }
}
