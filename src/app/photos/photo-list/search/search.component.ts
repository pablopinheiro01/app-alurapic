import { Input } from '@angular/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl:'./search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy{
    
    //event mapeado..
    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value: string = '';

    debounce: Subject<string> = new Subject<string>();
    
    ngOnInit(): void {
        //subscribe fica escutando o filtro
        //observable rxJS
        this.debounce
        //ignora todas as emissoes e so considera a ultima se aguardar o tempo de 300 ms
        .pipe(debounceTime(300))
        //temos que tomar cuidado pois o metodo subscribe nunca e completado no ciclo de vida
        //se este metodo nao for tratado ele sempre ocupara um espaço na memoria podendo crashar a aplicacao
        //com problema de memoryleak
        .subscribe(filter => this.onTyping.emit(filter));
    }
    
    ngOnDestroy(): void {
        //libera a memoria do obervable Subject
        //sempre que trabalhar com observable que nao da o complete eu tenho que efetuar essa boa pratica
        this.debounce.unsubscribe();
    }

    

}