import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private titleService: Title
     ) { }

  ngOnInit(): void {
    this.router.events
    // passos para pegar a rota final
    .pipe(filter( event => event instanceof NavigationEnd )) //se o evento de rota é um NavigationEnd (Fim de navegação)
    .pipe( map( () => this.activatedRoute )) // faço um map para pegar a rota ativada no momento
    .pipe( map(activatedRouteRetornado => { // pego essa rota que foi ativada
        while(activatedRouteRetornado.firstChild) activatedRouteRetornado = activatedRouteRetornado.firstChild;
        return activatedRouteRetornado;
      })
    )
    //faço um switch para escutar esse meu evento e me inscrever na rota para realizar a troca
    .pipe(switchMap( route => route.data ))
    .subscribe(event => this.titleService.setTitle(event.title));//o event é um observable
  }
}
