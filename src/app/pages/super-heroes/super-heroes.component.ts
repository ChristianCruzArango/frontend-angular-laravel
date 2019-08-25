import { Component, OnInit } from '@angular/core';
import { SuperHeoreModel } from '../../model/superheroe.model';
import { SuperHeroesService } from '../../services/super-heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.css']
})
export class SuperHeroesComponent implements OnInit {

  listado:string ="Listado de Super Héroes";
  cargando = false;
  heroes:SuperHeoreModel[] =[];
  heroe = new SuperHeoreModel();

  constructor(private heroesServices:SuperHeroesService) { }

  ngOnInit() {

    this.cargando=true;
    this.heroesServices.getheroes().subscribe(resp=>{
      this.heroes = resp;
      this.cargando=false;
    });

  }


  borrarHeroe (heroe:SuperHeoreModel,i:number){
    Swal.fire({
      title:'Esta Seguro?',
      text:`Esta seguro de eliminar el super heroe ${heroe.name}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

       this.heroesServices.borrarHeroe(heroe.id).subscribe(resp=>{
        if(resp === null){
           /*borra la posicion del arreglo que se trae desde el html */
           this.heroes.splice(i,1);
          }
      },
     /*se captura el error para mostrar la alert  */
     () =>{
        Swal.fire({
        title:'ERROR',
        text:'No se puede eliminar por favor validar si tiene actor anexos',
        type:'error'
      });
     }
   );
  }
});
}

}
