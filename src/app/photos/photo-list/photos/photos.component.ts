import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Photo } from '../../photo/Photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {
@Input() photos: Photo[] =[];
rows: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.rows = this.groupColumns(this.photos);
  }

  ngOnChanges( changes: SimpleChanges) {
    //changes devolve a inbond-properties que houve a mudança
    if(changes.photos){ //verifica se houve mudança
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]){
    const newRows = [];

    for(let index = 0; index < photos.length; index+=3){
      newRows.push(photos.slice(index, index+3));
    }

    return newRows;
  }

}
