import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo/photo-comment';
import { PhotoComponent } from '../../photo/photo.component';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit{
    
    @Input() photoId: number;
    commentForm: FormGroup;

    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
        ){

    }
    
    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })
    }

    save(){
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
        .addComment(this.photoId, comment)
        //sempre o ultimo pipe vai retornar o value no caso o switchmap retorna um valor que sera setado no observable comments
        .pipe(switchMap(() => { 
           return this.photoService.getComments(this.photoId);
        })) // eu executo um switchMap para trocar a execucao para uma nova requisicao para o service pegar os comentarios da foto.
        .pipe(tap( () => { //por ultimo eu faço um "tap" uma estrategia de tapear o html alterando o dom conforme eu peço
            this.commentForm.reset();
            
        }));
    }   

    
}