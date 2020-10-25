import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './home/signup/signup.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';


const routes: Routes = [
    { // nao e necessario fazer isso, mas é uma boa pratica pra visualizar o fonte
        path: '',
        //aqui faz um redirect para a rota home
        pathMatch: 'full', //se nao inserir essa tag qualquer rota que começa com /algumacoisa/algumacoisa o angular vai carregar
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule' //coloco #NomeDoModulo para garantir que esse é o nome do modulo
    },

    /*{ //para acessar essas rotas preciso acessar a rota Pai que será a rota raiz.
        path: '', //inserir uma String vazia pois essa rota vai ser dependente de uma rota que vou definir no "pai"
        component: HomeComponent,
        canActivate: [ AuthGuard ],
        children: [ 
            {
                // o filho tem a rota em branco
                path: '',
                component: SigninComponent
            },
            {
                path: 'signup',
                component: SignUpComponent
            }
         ]
    },*/
    /*{
        path: 'user/:userName', 
        loadChildren: './photos/photos.module#PhotosModule'
    },*/
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    {
        path: 'p/add', component: PhotoFormComponent,
        canActivate: [AuthGuard] //requer autenticacao
    },
    {
        path: 'p/:photoId',
        component: PhotoDetailsComponent
    },
    {
        path: '***', component: NotFoundComponent
    }
 ];

@NgModule({
    ///################# INFORMAÇÃO IMPORTANTE DE CONFIG - PARA PRODUCAO
    //imports: [ RouterModule.forRoot(routes, {useHash: true} )], //habilito o uso de hash para carregar as rotas atravez da interceptação do angular.
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}