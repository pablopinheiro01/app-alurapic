import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from '../shared/components/alert/alert.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { MenuModule } from '../shared/components/menu/menu.module';
import { ShowIfLoggedDirective } from '../shared/directives/show-if-logged/show-if-logged.directive';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent 
    ],
    exports: [ 
        HeaderComponent,
        FooterComponent
     ],
    imports: [ CommonModule,
                RouterModule,
                AlertModule,
                LoadingModule,
                MenuModule,
                ShowIfLoggedModule
            ]
    ,providers: [ {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true//caso tenha outros interceptadores ele delega para o proximo e assim sucessivamente
    }]

})
export class CoreModule{

}