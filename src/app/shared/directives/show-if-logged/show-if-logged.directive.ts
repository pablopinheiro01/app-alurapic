import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit{

    currentDisplay: string;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ){ 

    }
    ngOnInit(): void {
        //pega o estilo atual e guarda em uma diretiva
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display; 
        this.userService.getUser().subscribe(user => {
            //verifico se tem usuario logado
            if(user){
                this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
            }else{
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display; 
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                
            }
        })
        // !this.userService.isLogged() && this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      
    }

}