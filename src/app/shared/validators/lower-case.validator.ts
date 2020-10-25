import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl){

    //se nao tiver em branco e o objeto nao se encaixa na minha Expressao Regular
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)){
        return {
            //caso tenha erro eu exponho um objeto com a propriedade true.
            lowerCase: true
        }
    }

    return null;

}