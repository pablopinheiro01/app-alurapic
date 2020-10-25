import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({providedIn: 'root'})
export class TokenService{


    hastoken(){
        //as duas exclamações indicam 1 - retorno é undefined e 2 - se é true ou false
        //truque antigo do javascript
        return !!this.getToken();
    }

    setToken(token){
        window.localStorage.setItem(KEY, token)
    }

    getToken(){
        return window.localStorage.getItem(KEY);
    }

    removeToken(){
        window.localStorage.removeItem(KEY);
    }

}