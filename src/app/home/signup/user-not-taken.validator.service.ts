import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SignUpService } from './signup.service';

import { debounceTime, switchMap, first, map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable(
    /*{
        //providedIn:'root' //disponibiliza para o uso de toda aplicação
    }*/
)
//esta classe sera um validador e um serviço em conjunto - novo paradigma - este validador é async
export class UserNotTakenValidatorService{

    constructor(private signupService: SignUpService ){

    }

    checkUserNameTaken(){
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe( switchMap( userName =>  {
                    //para de escutar o fluxo anterior e troca para o proximo observable
                     return this.signupService.checkUserNameTaken(userName);
                }
                ))
                .pipe(map(isTaken => {
                    console.log(`este e o value do isTaken ${isTaken}`)
                        return isTaken ? { userNameTaken: true } : null 
                    }
                ))
                .pipe(first());//força o complete pegando o primeiro valor do fim da requisicao
        }
    }

}