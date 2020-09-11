import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import swal from'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './tech-request-list.component.html',
  styleUrls: ['./tech-request-list.component.css']
})
export class TechRequestListComponent implements OnInit {
  batch :any[] = [];
  progressBatch: any[] = [];
  userProfile:any;
  userType:any;
  loaded: boolean = true;

  constructor(private firebase:FirebaseService, private router: Router) { 
    this.userProfile = localStorage.getItem('userDetail').split(',');
    this.userType = localStorage.getItem('accessReference');
  }

  ngOnInit() {
    this.getBatchesForTech();
  }

  getBatchesForTech(){
    this.firebase.getBatchbyTech('glennys@eaton.com').subscribe((snapshot)=>{
      snapshot.forEach((data:any)=>{

        let dataCont = data.payload.doc.data();
        if(dataCont.Status == 'Tech Assign'){
          this.batch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
        }
        else if(dataCont.Status == 'In Progress'){
          this.progressBatch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
        }
      });
    });
  }
  details(id:string){
    this.firebase.getBatchbyId(id).subscribe((snapshot)=>{
       const data = snapshot.payload.data();
       if(data['Comment']==null){
         data['Comment'] = '';
       }
      swal.fire({
        title: `<strong>Batch ID: ${data['BatchID']} </strong>`,
        html: `<strong>L&iacute;nea</strong>: ${data['Line']} <br>
              <strong>Cat&aacute;logo</strong>: ${data['Catalog']} <br>
              <strong>Prop&oacute;sito</strong>: ${data['Purpose']} <br>
              <strong>Prioridad</strong>: ${data['Priority']} <br>
              <strong>TestTypes</strong>: ${data['TestTypes']} <br> 
              <strong>Fecha de Registro</strong>: ${data['Date']}<br>
              <strong>Status</strong>: ${data['Status']} <br>
              <strong>Comentario</strong>: ${data['Comment']} <br>
              <strong>Disposici&oacute;n</strong>: ${data['Disposition']}
        `,
        type: "info"
      });
    });
  }
  changeStatus(id:string, status:string){
    this.firebase.changeStatus(id, status).then(res => {
      swal.fire('Batch Updated', 'Status Changed...', 'success');
    }).catch(res => {
      swal.fire('Something Wrong', 'Try Again... ' + res, 'error');
    });
  }
  changeComment(id:string){
    swal.fire({
      title: 'Comentarios',
      type: 'info',
      text: 'Introduzca su comentario',
      input: 'textarea'
    }).then((result)=>{
      this.progressBatch = [];
      this.firebase.updateComment(id,result.value);
    });
  }
}

