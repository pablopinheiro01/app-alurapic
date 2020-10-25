import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root'})
export class UserService { 

    //emite null como valor padrao para a pre carga
    //behaviorsubject armazena a ultima emissao ate que alguem consuma.
    private userSubject = new BehaviorSubject<User>(null);

    private userName: string;

    constructor(private tokenService: TokenService){
       //verifica se tem token na aplicação, caso sim ele faz o decodeAndNotify
        this.tokenService.hastoken() && this.decodeAndNotify();
    }

    setToken(token: string){
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser(){
        //permite fazer um subscribe
        return this.userSubject.asObservable();
    }

    private decodeAndNotify(){
        const token = this.tokenService.getToken();
        const user: User = jwt_decode(token) as User;//fiz o casting para o tipo User
        //emite o dado para o Subject notificar a classe header para utilizar
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged(){
        return this.tokenService.hastoken();
    }

    getUserName(){
        return this.userName;
    }
    
}