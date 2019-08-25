import { Component, OnInit } from '@angular/core';
import { PaisModel } from '../../model/pais.model';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  pais:PaisModel = new PaisModel();

  constructor(private paisesService:PaisesService , private route:ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !=='nuevo'){
      this.paisesService.getPais(id).subscribe((resp:PaisModel) => {
        this.pais = resp;
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

    if (this.pais.id){
      informacion = this.paisesService.actualizarPais(this.pais);
    }else{
      informacion = this.paisesService.crearPais(this.pais);
    }

    informacion.subscribe(resp=>{
      Swal.fire({
        title:this.pais.name,
        text:'Se realizo correctamente',
        type:'success'
      });
    });

    form.reset();


  }

}
