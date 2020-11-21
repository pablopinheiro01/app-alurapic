import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File; //tipo arquivo padrao
  preview: string;
  percentDone = 0; //tambem deve ser inserido no html para o acompanhamento do usuario

  constructor(
    private formBuilder:FormBuilder, 
    private photoService: PhotoService , 
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComents: [true] 
    })
  }

  upload(){
    // const dados = this.photoForm.getRawValue();
    // console.log(dados);

    const description = this.photoForm.get('description').value;
    const allowComents = this.photoForm.get('allowComents').value;

    console.log(this.file);

    this
    .photoService
    .upload(description, allowComents, this.file)
    .pipe(finalize( () => { // apos finalizar ele redireciona
      this.router.navigate(['/user', this.userService.getUserName()]);
    }))
    .subscribe((event: HttpEvent<any>) => { 
      if(event.type == HttpEventType.UploadProgress){
        this.percentDone = Math.round( 100 * event.loaded / event.total);
      } else if( event instanceof HttpResponse){
        this.alertService.success("UPLOAD COMPLETE nego e noix...",true )
      }

    },
    err => { 
      console.log(err);
      this.alertService.danger('Upload error', true);
    });
    
  }

  handleFile(file:File){
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
