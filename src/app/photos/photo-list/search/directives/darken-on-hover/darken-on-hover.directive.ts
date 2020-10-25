import { HostListener, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective{
    
    //injeto a casca do angular a ultima proteção antes de tocar no elemento nativo
    //essa casca protege o elemnto que vou alterar
    constructor(private el: ElementRef, 
        private render: Renderer2 
    ){}

    @HostListener('mouseover')
    darkenOn(){
        //this.render.setAttribute(this.el.nativeElement, 'filter', 'brightness(70%)');
        this.render.setStyle(this.el.nativeElement, "opacity" , "0.5");
    }

    @HostListener('mouseleave')
    darkenOff(){
        //this.render.setAttribute(this.el.nativeElement, 'filter', 'brightness(100%)');
        this.render.setStyle(this.el.nativeElement, "opacity" , "1");

    }

}