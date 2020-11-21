import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ServerLog } from './server-log';
import { environment } from '../../../environments/environment'


const API = environment.serverLog;

@Injectable({
    providedIn: 'root'
})
export class ServerLogService{

    constructor(
        private http: HttpClient
    ){

    }

    log(serverlog: ServerLog){
        return this.http.post(API + '/infra/log', serverlog);
    }
}