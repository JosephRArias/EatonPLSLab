import { Injectable } from '@angular/core';

import * as Msal from 'msal';
import { FirebaseService } from './firebase.service';

declare var bootbox: "";
@Injectable()
export class MsalService {

    private _idToken: string;
    private _accessToken: string;
    private _expiresAt: number;
    private _tenantId: string;
    private _uniqueId: string;
    private _userName: string;
    private _userEmail: string;

    constructor(private firebase:FirebaseService) {
        
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
        this._tenantId = '';
        this._uniqueId = '';
        this._userName = '';
        this._userEmail = '';
    }

    msalConfig = {
        auth: {
            clientId : '1189d2fe-d8cc-4fea-9114-57729447e4d5'
        }
    };


    msalInstance = new Msal.UserAgentApplication(this.msalConfig);    


    public login(){
        var loginRequest = {
            scopes: ["user.read"]
        }

        return this.msalInstance.loginPopup(loginRequest);
    }
    
    get accessToken(): string {
        return this._accessToken;
    }
    
    get idToken(): string {
        return this._idToken;
    }

    public userType(): number {
        return parseInt(localStorage.getItem('accessReference'));
    }

    public userDetails(): object {
        return [ this._userName, this._userEmail, this._uniqueId ];
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        
        return localStorage.getItem('localLoginToken') && Date.now() < parseInt(localStorage.getItem('expireAt'));
    }

    public localLogin(authResult): any {

        // Set the time that the Access Token will expire at
        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken.rawIdToken;
        this._tenantId = authResult.idToken.tenantId;
        this._userName = authResult.account.name;
        this._uniqueId = authResult.uniqueId;
        this._userEmail = authResult.account.userName;

        const expiresAt = (authResult.expiresIn * 1000) + Date.now();
        this._expiresAt = expiresAt;

        if(this._userEmail.includes("eaton.com") || this._userEmail.includes("gratereaux")){
            //Set local Storage
            localStorage.setItem('localLoginToken', this._idToken);

            this.firebase.getUser(this._userEmail).subscribe(res => {  

                if (res){
                    for(let item in res){
                        localStorage.setItem('accessReference', res[item]['type']);
                    }
                    
                }else{   
                    this.firebase.createUser({
                        email : this._userEmail,
                        name : this._userName,
                        supervisor : '',
                        type: 0
                    }).subscribe(res => {
                        if(res){
                            localStorage.setItem('accessReference', "0");
                        };
                    })
                    
                }
            });
                
            let expireAt = new Date();
            expireAt.setSeconds( 3600 );
            localStorage.setItem('expireAt', expireAt.getTime().toString());
    
            return this.userDetails();
        }else{
            return null;
        }
    }
      
    public logout(){

        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;
    
        localStorage.removeItem('localLoginToken');
        localStorage.removeItem('expireAt');
        localStorage.removeItem('userDetail');
        localStorage.removeItem('accessReference');

        if(!localStorage.getItem('localLoginToken')){
            return true;
        }else {
            return false;
        }
        
    }

}