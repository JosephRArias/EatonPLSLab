import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-engineer-request-list',
  templateUrl: './engineer-request-list.component.html',
  styleUrls: ['./engineer-request-list.component.css']
})
export class EngineerRequestListComponent implements OnInit {
  batch :any[] = [];
  userProfile:any;
  userType:any;
  batch2: any[] = [];
  loaded: boolean = true;

  constructor(private firebase:FirebaseService) { 
    this.userProfile = localStorage.getItem('userDetail').split(',');
    this.userType = localStorage.getItem('accessReference');
  }


  ngOnInit() {
    if(this.loaded){
      console.log('Llegue');
      this.getBatchesForEngineer();
    }
  }
  getBatchesForEngineer(){
    this.firebase.getBatchbyUser(this.userProfile[1]).subscribe((snapshot)=>{
      snapshot.forEach((data:any)=>{

        let dataCont = data.payload.doc.data();
        if(dataCont.Status == 'Tech Assign' || dataCont.Status == 'In Progress'){
          this.batch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
        }
        else if(dataCont.Status == 'New'){
          this.batch2.push({
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

}
