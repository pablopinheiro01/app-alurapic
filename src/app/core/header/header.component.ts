import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    // usar o $ dolar indica que voce vai guardar um valor de um observable
    user$: Observable<User>;

    constructor(private userService: UserService, private router: Router){
        //retorna um observable
        this.user$ = userService.getUser();
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['']);
    }
}