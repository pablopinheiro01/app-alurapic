import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {

  //essa variavel diz respeito ao botão load Button diferentemente da variavel hasMore de PhotoListComponent
  @Input() hasMore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
