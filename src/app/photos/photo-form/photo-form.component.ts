import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    .subscribe(() => { 
      this.alertService.success("UPLOAD COMPLETE nego e noix...",true )
      this.router.navigate(['/user', this.userService.getUserName()]);

    });
    
  }

  handleFile(file:File){
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
