import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo/Photo';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit{

    photo$: Observable<Photo>;
    photoId: number;

    constructor( 
        private route: ActivatedRoute ,
         private service: PhotoService, 
         private router: Router,
         private alertService: AlertService,
         private userService: UserService
         ){}

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.service.findById(this.photoId);
        this.photo$.subscribe( () => {}, err => {
            console.log(err);
            this.router.navigate(['not-found']);
        });
    }

  remove(){
      this.service.removePhoto(this.photoId)
      .subscribe( () => {
            this.alertService.success("Photo removed", true);
            //replaceUrl exclui a url anterior e no back não temos o problema de voltar para uma pagina inexistente
            this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
      },
      err => {
          console.log(err);
          this.alertService.warning("Deu ruim n foi excluido nao", true);
      }
      )
  }

  like(photo: Photo){
      this.service.like(photo.id)
      .subscribe(liked => {
          if(liked){
              this.photo$ = this.service.findById(photo.id);
          }
      });
  }
  
}