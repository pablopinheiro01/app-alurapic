import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit{

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService:  PlatformDetectorService
        ){}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group(
            { 
                email:['', //nome padrao
                    [ 
                        Validators.required, //validadores sincronos
                        Validators.email 
                    ]
                ],
                userName:['', //nome padrao ou valor inicial 
                    [ //validadores sincronos
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(30),
                        lowerCaseValidator
                    ],
                    //nesta sessao serao os validadores assincronos
                    //o retorno deste objeto vai me dar um validator
                this.userNotTakenValidatorService.checkUserNameTaken()

                ],
                fullName: ['', 
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(40)
                    ]
                ],
                password: ['',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(40)
                    ]
                ]
            }
        );
        // foca no primeiro elemento da pagina.
        this.platformDetectorService.isPlatFormBrownser() &&
        this.emailInput.nativeElement.focus();
    }

    signup(){
        //pega todas as propriedades e valores digitados no formulario
        const newUser: NewUser = this.signupForm.getRawValue() as NewUser; //faz casting para o tipo NewUser
        console.log(`este e o newUser : ${newUser}`)
        this.signUpService
        .signup(newUser)
        .subscribe( 
            () => this.router.navigate(['']),
            err => console.log(err)
        );
    }

}