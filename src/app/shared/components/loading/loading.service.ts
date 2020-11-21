import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable({providedIn: 'root'})
export class LoadingService {
    
    loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

    constructor(){

    }

    getLoading(){
        return this.loadingSubject
        .asObservable()
        //deixo por default quem for escutar o observable recebe como default o stopped na primeira emissao
        .pipe(startWith(LoadingType.STOPPED));
    }

    start(){
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop(){
        this.loadingSubject.next(LoadingType.STOPPED);
    }

}