import { Component, OnInit } from '@angular/core';
import { SuperHeoreModel } from '../../model/superheroe.model';
import { ActorModel } from '../../model/actor.model';
import { ActorsService } from 'src/app/services/actors.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { Observable } from 'rxjs';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-super-heroe',
  templateUrl: './super-heroe.component.html',
  styleUrls: ['./super-heroe.component.css']
})
export class SuperHeroeComponent implements OnInit {

  heroe = new SuperHeoreModel();
  actors:ActorModel[]=[];

  constructor(private actorsServices:ActorsService,private heroeServices:SuperHeroesService,private route:ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id !=='nuevo'){
      this.heroeServices.getHeroe(id).subscribe((resp:SuperHeoreModel) => {
        this.heroe = resp;
        console.log(this.heroe);
      });
    }

    this.actorsServices.getActors().subscribe(resp=>this.actors=resp);
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

     if (this.heroe.id){
      informacion = this.heroeServices.actualizarHeroe(this.heroe);
     }else{
       informacion = this.heroeServices.crearHeroe(this.heroe);
     }

     informacion.subscribe(resp=>{
      Swal.fire({
        title:this.heroe.name,
        text:'Se realizo correctamente',
        type:'success'
      });
     });

     form.reset();
  }

}
