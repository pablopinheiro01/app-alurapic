import { BrowserModule } from '@angular/platform-browser'; //so pode ser importado em app.module
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule, 
    PhotosModule,// nao pode ser carregado aqui, pois sera carregado por demanda entao tem que ser removido
    ErrorsModule,
    //HomeModule, // nao pode ser carregado aqui, pois sera carregado por demanda entao tem que ser removido
    CoreModule,
    AppRoutingModule//boa pratica carregar por ultimo
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
