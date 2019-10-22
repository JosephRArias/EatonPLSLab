import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userProfile: any;
  userType: string;
  date : string;
  dateTxt: string;

  actions : any[] = [
                  {'name' : 'Nuevo Request', 'color' : 'green', 'icon' : 'cloud', 'action' : 'nuevo', 'user' : '5,4,3'},
                  {'name' : 'Ver Mis Request', 'color' : 'yellow', 'icon' : 'check', 'action' : 'request', 'user' : '5,3'},
                  {'name' : 'Mis Pendientes', 'color' : 'cyan', 'icon' : 'check', 'action' : 'pendientes', 'user' : '5,2'},
                  {'name' : 'Reporte Tecnico', 'color' : 'red', 'icon' : 'check', 'action' : 'tecnicos', 'user' : '1'},
                  {'name' : 'Accion 5', 'color' : 'orange', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
                  {'name' : 'Accion 6', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
                  {'name' : 'Accion 7', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '2'},
                  {'name' : 'Accion 8', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
              ]

  constructor(private router:Router, private appService:AppService, private firebase:FirebaseService) { 
    this.userProfile = localStorage.getItem('userDetail').split(',');
  }

  ngOnInit() {
    this.userType = localStorage.getItem('accessReference');
    //Start Clock
    setInterval(() => {
      this.fechaHora();
    }, 1000);
  }

  gotoPage(item:string){
    console.log(item);
  }

  // Helper functions



  fechaHora(){ // Función para obtener fecha y hora.
    var today=new Date(); // Obtengo fecha del sistema
    var h=today.getHours(); // Obtengo hora
    var m=this.checkTime(today.getMinutes()); // Minutos
    var s=this.checkTime(today.getSeconds()); // Segundos


    var hoy = new Date();
    var meridiano = (h >= 12) ? " PM" : " AM";

    var mes = new Array();
    mes[0]="Enero";  mes[1]="Febrero";  mes[2]="Marzo"; // String de los meses
    mes[3]="Abril";   mes[4]="Mayo";  mes[5]="Junio";
    mes[6]="Julio";    mes[7]="Agosto";   mes[8]="Septiembre";
    mes[9]="Octubre";   mes[10]="Noviembre"; mes[11]="Diciembre";

    
    if (h > 12){
        h = h - 12;
    }

    this.dateTxt = h+" : "+m+" : "+s+" "+meridiano;
    this.date = hoy.getDate()+" de "+mes[hoy.getMonth()]+" del "+ hoy.getFullYear();
        
  }

  checkTime(i:any){ // Función para agregar un 0 cuando el número es menor a 10.
      if (i<10){
        i="0" + i;
      }
      return i;
  }


}