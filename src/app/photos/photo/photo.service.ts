import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Photo } from './Photo';
import { PhotoComment } from './photo-comment';

import { environment} from './../../../environments/environment'

const API = environment.ApiUrl;

@Injectable({providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient){ }

    listFromUser(userName: String){ 
    //observable só busca os dados se alguem estiver escrito nele
    // é utilizado observablw no lugar das promisses em angular
        return this.http.get<Photo[]>(API + '/' + userName + '/photos');
    }
    
    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(API + '/' + userName + '/photos',{ params: params});
    }

    upload(description: string, allowComments: boolean, file: File){
        
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(
            API + 
            '/photos/upload', 
            formData,
            { //configuracao para habilitar a visualizao de progresso, habilitada via http
                observe: 'events',
                reportProgress: true
            }
            
            );
    }

    findById( photoId: number){
        return this.http.get<Photo>( API  + '/photos/' + photoId);
    }

    getComments( photoId: number){
        return this.http.get<PhotoComment[]>( API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string){
        return this
        .http
        .post( API + '/photos/' + photoId + '/comments',
         //{ commentText: commentText}); em js quando o nome da propriedade e igual ao nome do valor passado no parametro pode ser usado como abaixo
         { commentText });
    }

    removePhoto(photoId: number){
        return this.http.delete(API + '/photos/' + photoId );
    }

    like(photoId: number){
        return this.http.post( 
            API +'/photos/' + photoId + '/like', {}, { observe: 'response'})
            .pipe(map(res => true)) //caso de sucesso eu consigo retornar um observable true
            .pipe(catchError( err => {
                // o metodo of() do pacote rxJs me retorna um observable criado na hora
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}