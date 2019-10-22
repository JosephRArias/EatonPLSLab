import { Component, OnInit, Renderer2 } from '@angular/core';
import { MsalService } from './services/msal.service'


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit{

  currentTheme: Theme;
  themes = [
      new Theme('pxb-blue', 'Blue Theme'),
      new Theme('pxb-blue-dark', 'Blue Dark Theme')
  ];
  
  isLogged : boolean = false;
  haveToken : boolean = false;

  constructor(private msal: MsalService, private renderer: Renderer2){
  }

  ngOnInit(): void {
    this.applyTheme(this.themes[0]);

    setInterval(()=> {
      this.isLogged = this.msal.isAuthenticated();
      this.haveToken = (localStorage.getItem('localLoginToken')) ? true : false;
    }, 0.4);
  }

  private applyTheme(theme: Theme): void {
    this.renderer.addClass(document.body, theme.className);
    this.currentTheme = theme;
  }

  
}


class Theme {
  constructor(public className: string, public themeName: string) {}
}