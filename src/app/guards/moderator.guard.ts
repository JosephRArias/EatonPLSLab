import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from '../app.service';
import { MsalService } from '../services/msal.service';

@Injectable()
export class ModeratorGuard implements CanActivate {

    constructor(private router: Router, private appService:AppService, private msal : MsalService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.msal.userType() >= 3) {
            return true; 
        }

        this.router.navigate(['/']);
        return false;
    }
}