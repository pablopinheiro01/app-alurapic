import { CommonModule } from '@angular/common';
import { ElementRef, HostListener, NgModule } from '@angular/core';
import { DarkenOnHoverDirective } from './darken-on-hover.directive';

@NgModule({
    declarations: [ DarkenOnHoverDirective ],
    exports: [ DarkenOnHoverDirective ],
    imports: [ CommonModule ]
})
export class DarkenOnHoverModule{}