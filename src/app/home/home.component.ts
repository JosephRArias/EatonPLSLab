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
  DoneRequests: any[] = [];
  PendingRequests: any[] = []; 
  InProgressRequests: any[] = [];

  actions : any[];

  lastFive: any[] = [];

  constructor(private router:Router, private appService:AppService, private firebase:FirebaseService) { 
    this.userProfile = localStorage.getItem('userDetail').split(',');
  }

  ngOnInit() {
    this.userType = localStorage.getItem('accessReference');
    this.firebase.getBatchbyStatus('Done').subscribe((res: any)=>{
      return res.map((item:any)=>{
        this.DoneRequests.push(item.payload.doc.data())
      });
    });
    this.firebase.getBatchbyStatus('Tech Assign').subscribe((res: any)=>{
      return res.map((item:any) => {
        this.PendingRequests.push(item.payload.doc.data);
      });
    });
    this.firebase.getBatchbyStatus('New').subscribe((res: any)=>{
      return res.map((item: any)=>{
        this.PendingRequests.push(item.payload.doc.data());
      })
    })
    this.firebase.getBatchbyStatus('In Progress').subscribe((res:any)=>{
      return res.map((item:any)=>{
        this.InProgressRequests.push(item.payload.doc.data);
      });
    });
    //Start Clock
    setInterval(() => {
      this.fechaHora();
    }, 1000);

    this.firebase.getLastBatch().subscribe((res:any) => {
      return res.map( (item:any) => {
        this.lastFive.push(item.payload.doc.data());
      });
    });


    this.actions = [
        {'name' : 'Nuevo Request', 'color' : 'green', 'icon' : 'cloud', 'action' : 'requestForm', 'user' : '5,4,3'},
        {'name' : 'Mis Pendientes', 'color' : 'cyan', 'icon' : 'check', 'action' : 'pendientes', 'user' : '5,2'},
        {'name' : 'Reporte Tecnico', 'color' : 'red', 'icon' : 'check', 'action' : 'tecnicos', 'user' : '1'},
        {'name' : 'Accion 5', 'color' : 'orange', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
        {'name' : 'Accion 6', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
        {'name' : 'Accion 7', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '2'},
        {'name' : 'Accion 8', 'color' : 'green', 'icon' : 'check', 'action' : '/form', 'user' : '1'},
    ];
  }

  gotoPage(item:string){
    this.router.navigate(['./'+item]);
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