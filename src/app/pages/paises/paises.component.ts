import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { PaisModel } from '../../model/pais.model';
import Swal from 'sweetalert2';
import { $ } from 'protractor';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  listado:string="Listado de Países";
  paises:PaisModel[] = [];
  cargando = false;

  constructor(private paisesService:PaisesService) {}

  ngOnInit() {
    this.cargando=true;
    this.paisesService.getPaises().subscribe(resp =>{
      this.paises = resp
      this.cargando=false;
    } );
  }

  borrarPais(pais:PaisModel,i:number){

    Swal.fire({
      title:'Esta Seguro?',
      text:`Esta seguro de eliminar el pais ${pais.name}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

       this.paisesService.borrarPais(pais.id).subscribe(resp=>{
           if(resp === null){
            /*borra la posicion del arreglo que se trae desde el html */
            this.paises.splice(i,1);
           }
         },
         /*se captura el error para mostrar la alert  */
         () =>{
            Swal.fire({
            title:'ERROR',
            text:'No se puede eliminar por favor validar si tiene actores anexos',
            type:'error'
          });
         }
       );
      }
    });
  }

}
