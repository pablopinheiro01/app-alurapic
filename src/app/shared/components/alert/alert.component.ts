import { Component, Input } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent{

    //criado uma inbound propertie do angular
    @Input() timeout = 3000; //3 segundos para inicializacao

    alerts:Alert[] = [];

    constructor(
        private alertService: AlertService
        ){
            this.alertService
            .getAlert()
            .subscribe( alert => {
                if( !alert ){
                    this.alerts = []; //caso for nulo eu apago os alertas
                    return;
                }
                this.alerts.push(alert);
                setTimeout( () => this.removeAlert(alert), this.timeout);//remove apos o tempo de execução
            });
    }

    removeAlert(alertToRemove: Alert){
            this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }

    getAlertClass( alert: Alert){
        if(!alert ) return '';

        switch(alert.alertType){
            case AlertType.DANGER:
                return 'alert alert-danger';
                case AlertType.INFO:
                    return 'alert alert-info';
                    case AlertType.SUCCESS:
                        return 'alert alert-success';
                        case AlertType.WARNING:
                            return 'alert alert-warning';
        }
    }
}