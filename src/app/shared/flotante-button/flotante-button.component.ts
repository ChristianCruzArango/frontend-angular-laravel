import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flotante-button',
  templateUrl: './flotante-button.component.html',
  styleUrls: ['./flotante-button.component.css']
})
export class FlotanteButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.cargarScript('../../../assets/script/flo.js');
  }

/*se realiza una funcion que permite cargar el script externo por componente y asi no presente el error
que solo funciona al momento de recargar la pagina...se inicializa en la funcion ngOnit cuando incia el componente */
  public cargarScript(url:string){

    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);

  }

}
