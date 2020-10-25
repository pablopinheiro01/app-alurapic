import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';

@NgModule({
    declarations: [ CardComponent ],
    exports: [ CardComponent ],
    //sempre importar o commommodule para as diretivas do angular funcionar corretamente
    imports: [ CommonModule ]
})
export class CardModule {

}