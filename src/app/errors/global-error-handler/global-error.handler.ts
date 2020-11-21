import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';
import * as StackTrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';


@Injectable() //ja foi provisionado no errors.module por isso nao usei providedIn
export class GlobalErrorHandler implements ErrorHandler{

    constructor(
        private injector: Injector //servico do angular geral
    ){
    }

    handleError(error: any): void {
        const location = this.injector.get(LocationStrategy); //injetando direto dentro do handleError
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);
        
        
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        console.log("Passamos pelo meu erro handler personalizado quentinho...");

        const message = error.message ? error.message : error.tostring();
        //redireciono para a tela de erro criada
        if(environment.production) router.navigate(['/error']);

        StackTrace
        .fromError(error)
        .then(stackFrames => {
            const stackAsString = stackFrames.map( sf=> sf.toString()).join('\n');
            console.log(message);
            console.log(stackAsString);
            console.log("--- oq seria enviado para o servidor")
            serverLogService.log({
                message, 
                url, 
                userName: userService.getUserName(), 
                stack: stackAsString})
                .subscribe( () => {
                    console.log('Error logged on server');
                }, err => {
                    console.log(err);
                    console.log('Fail to send error log to server');
                })
        });
    }
    
}