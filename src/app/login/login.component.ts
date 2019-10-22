import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

import { MsalService } from '../services/msal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private router:Router, private appService:AppService, private msal:MsalService) { 
    
  }

  ngOnInit() {

  }


login(){
  this.msal.login()
      .then(res => {
        //Handle login      
        return this.msal.localLogin(res);
      })
      .then(res => {
        if(res) localStorage.setItem('userDetail', res);
        this.router.navigateByUrl('/');
      })
      .catch(err => {
          console.error(err);
      })
}
  

}