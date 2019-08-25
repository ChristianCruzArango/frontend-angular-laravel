import { Component, OnInit } from '@angular/core';
import { ActorModel } from '../../model/actor.model';
import { ActorsService } from 'src/app/services/actors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  listado:string = "Listado de Actores";
  actors:ActorModel[]=[];
  cargando = false;

  constructor(private actorsServices:ActorsService) { }

  ngOnInit() {
    this.cargando=true;
    this.actorsServices.getActors().subscribe(resp=>{
      this.actors = resp
      this.cargando=false;
    });
  }


  borrarActor (actor:ActorModel,i:number){
    Swal.fire({
      title:'Esta Seguro?',
      text:`Esta seguro de eliminar el pais ${actor.name}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

       this.actorsServices.borrarActor(actor.id).subscribe(resp=>{
        if(resp === null){
           /*borra la posicion del arreglo que se trae desde el html */
           this.actors.splice(i,1);
          }
      },
     /*se captura el error para mostrar la alert  */
     () =>{
        Swal.fire({
        title:'ERROR',
        text:'No se puede eliminar por favor validar si tiene super heroes anexos',
        type:'error'
      });
     }
   );
  }
});
}

}

