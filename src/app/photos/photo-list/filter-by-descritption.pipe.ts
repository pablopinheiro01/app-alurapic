import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/Photo';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLowerCase();
        //se tem description eu filtro se nao tem eu devolvo a lista completa
        if(descriptionQuery){
            return photos.filter(photo => photo.description.toLowerCase().includes(descriptionQuery));
        } else {
            return photos;
        }
    }

}