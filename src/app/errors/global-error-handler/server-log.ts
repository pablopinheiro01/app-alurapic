import { UserNotTakenValidatorService } from 'src/app/home/signup/user-not-taken.validator.service';

export interface ServerLog{

    message: String;
    url: string;
    userName: string;
    stack: string;

}