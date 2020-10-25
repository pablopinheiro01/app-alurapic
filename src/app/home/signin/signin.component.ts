import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';

@Component({
    templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit{

    //essa opção é do ReactiveFormModules
    //tenho que associar a propriedade ao formulario do component.
    loginForm: FormGroup;
    //variavel referenciada pelo templateref do angular e passando o tipo no 
    //diamond operator ele ja insere para nos a inferencia dos metodos de nativeelemt onde vou atualizar a pagina.
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    //injetando o formBuilder na classe
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platFormDetectorService: PlatformDetectorService
        ){}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            //declarado na propriedade formControlName do formulario
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        //adiciona o foco na pagina
        this.platFormDetectorService.isPlatFormBrownser() &&
        this.userNameInput.nativeElement.focus();
    }

    login(){
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
        .authenticate(userName, password)
        .subscribe(
            //() => this.router.navigateByUrl('user/'+userName)
            () => this.router.navigate(['user', userName]),
            err => {
                console.log(err);
                this.loginForm.reset();

                //testa se isPlatFormBrownser() for true ele executa o focus
                this.platFormDetectorService.isPlatFormBrownser() &&
                //caso der erro eu foco onde deu... 
                //somente utilizo a alteracao direto no dom no caso de falta de recurso do angular
                this.userNameInput.nativeElement.focus();
            } 
        );
    }

}