import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() title:string;

  constructor() { }

  ngOnInit() {
  }

}
