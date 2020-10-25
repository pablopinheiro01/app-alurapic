import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PlatformDetectorService { 

    constructor(@Inject(PLATFORM_ID) private PlatformId: string){}

    isPlatFormBrownser(){
        //verifica se o codigo esta rodando no navegador ou não
        return isPlatformBrowser(this.PlatformId);
    }

}