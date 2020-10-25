import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/Photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  //variavel apenas referente ao componente que ser consumida no html do componente
  //variaveis para carga de fotos na pagina
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

   //injeto a dependencia no constructor que seria o serviço photo.
  //vou destinar o constructor para injeção de dependencia
  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService){}
  
  //esse metodo esta no ciclo de vida do angular
  ngOnInit(): void{
    
    //este codigo e mais rapido de ser feito porem tem um problema ao executar qualquer url no brownser, ele nao sera acionado
    //this.userName = this.activatedRoute.snapshot.params.userName;

    //me inscrevo para quando ocorrer uma mudanca de rota no brownser eu escutar e executar uma acao
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      //verifica o valor de photos configurado no resolver
      this.photos = this.activatedRoute.snapshot.data.photos;  
    })

  }

  load(){
    //currentpage vai ser inserida com o ++ para um pré incremento
    this.photoService.listFromUserPaginated(this.userName, this.currentPage++)
    .subscribe(photos => {
      this.filter = '';
      //mecanismo de change request detecta que o array foi alterado e assim inclui as novas fotos
      this.photos = this.photos.concat(photos);
      if(!photos.length) this.hasMore = false;
    })
  }

}
