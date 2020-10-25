import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoListResolver } from './photo-list/photo-list.resolver';


const routes: Routes = [
    { //para acessar essas rotas preciso acessar a rota Pai que será a rota raiz.
        
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: { photos: PhotoListResolver }
        
    }
 ];


@NgModule({
    imports: [ RouterModule.forChild(routes)], // todo modulo carregad preguiçosamente é necessario carregar como forChild.
    exports: [ RouterModule ]
})
export class PhotoRoutingModule{

}