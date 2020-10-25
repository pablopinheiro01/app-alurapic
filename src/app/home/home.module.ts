import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignUpService } from './signup/signup.service';
import { PhotoRoutingModule } from '../photos/photo.routing.module';
import { SigninComponent } from './signin/signin.component';

@NgModule({ 
declarations: [
    SigninComponent, 
    SignUpComponent,
    HomeComponent
]
,imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    RouterModule,
    HomeRoutingModule //tenho que importar as rotas que serão carregadas de forma preguiçosa
    //PhotoRoutingModule
],
providers: [ 
        SignUpService // aqui em providers ele fica disponivel para todos os componentes desse modulo
    ]

})
export class HomeModule{}