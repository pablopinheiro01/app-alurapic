import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient, 
    // private tokenService: TokenService,
    private userService: UserService
    ) {}

  authenticate( userName: string, password: string){
    console.log( `este é o cara ${this.http}`);
    console.log(`usuario informado: ${userName} e pass ${password}`)
   return this.http
    .post(API_URL + '/user/login', 
    //em javascript quando a propriedade é o mesmo nome do parametro
    //eu nao preciso declarar {chave:valor} eu posso fazer conforme abaixo
    {userName, password},
    {observe: 'response'} //habilito a visualização do cabeçalho
    
    )
    //todo operador esta no pacote rxjs/operators
    //gera side efect
    //este codigo sera executado antes do subscribe em sigin.component.ts
    .pipe(tap( res => {
      const authToken = res.headers.get('x-access-token');
      //armazena no brownser esse token
      //window.localStorage.setItem('authToken', authToken);
      this.userService.setToken(authToken);
      console.log(`usuario ${userName} autenticado com o token: ${authToken}`);
    } ))
  }



}
