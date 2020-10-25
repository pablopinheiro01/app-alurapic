import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoRoutingModule } from './photo.routing.module';
import { RouterModule } from '@angular/router';
import { DarkenOnHoverModule } from './photo-list/search/directives/darken-on-hover/darken-on-hover.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoModule,
        DarkenOnHoverModule,
        //RouterModule,
        PhotoRoutingModule //importo meu rounting module
        , PhotoDetailsModule
    ]
})
export class PhotosModule{}