import {Injectable} from '@angular/core';
import{
    CanActivate,Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import{MainservicesService} from '../services/mainservices.service';
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private MainService:MainservicesService,
        private router:Router
    ){}
    canActivate(){
        if(this.MainService.loggedIn()){
            return true;
        }else{
            this.router.navigate(['/']);
            return false;
        }
    }
}