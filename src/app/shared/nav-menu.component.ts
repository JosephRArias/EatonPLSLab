import { Component } from '@angular/core';
import { MsalService } from '../services/msal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  userType: number;

  constructor(private router:Router, private msal:MsalService) {
    this.userType = parseInt(localStorage.getItem('accessReference'));
   }

  logout(){
    if(this.msal.logout()){
        this.router.navigateByUrl('/login');
    };
  }

}
