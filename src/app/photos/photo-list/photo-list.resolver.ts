import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from '../photo/Photo';
import { PhotoService } from '../photo/photo.service';

@Injectable({providedIn: 'root'})
//resolve os dados assincronos antes do meu componente ser ativado
export class PhotoListResolver implements Resolve<Observable<Photo[]>>{
    constructor(private service: PhotoService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
            const userName = route.params.userName;
            // return this.service.listFromUserpa(userName);
            return this.service.listFromUserPaginated(userName, 1);
    }

}