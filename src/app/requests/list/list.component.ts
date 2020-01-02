import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as _ from 'lodash';
import swal from'sweetalert2';
import { BatchModel } from 'src/app/models/batch.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batch :any[] = [];
  statusSort = false;
  batch2:any[] = [];
  completed: any[] = [];
  data: any[] = [];
  userProfile:any;
  userType:any;
  techUsers:any;
  public searchFilter: string;
  public desc: false;
  prioritySort = false;

  constructor(private firebase:FirebaseService) {
    this.userProfile = localStorage.getItem('userDetail').split(',');
    this.userType = localStorage.getItem('accessReference');
   }

  ngOnInit() {
    this.supervisor();
    console.log(this.userProfile);
    console.log(this.userType);
  }
  supervisor() {
    //get tech userList
    this.techUsers = this.firebase.getTechList();

    this.firebase.getAllBatch().subscribe((snapshot) => {
      this.batch = [];
      this.batch2 = [];
      
      snapshot.forEach((data:any)=>{

        let dataCont = data.payload.doc.data();

        if(dataCont.Status != "Done"){
          this.batch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
          this.data = this.batch;
          if(!dataCont.tech){  
            this.batch2.push({
              id: data.payload.doc.id,
              data: dataCont
            });
          }
        }else{
          this.completed.push({
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
  getBatchesByID(batchID: string){
     return this.batch.filter(foundBatch=>foundBatch.BatchID == batchID);
  }
  Sort(Criteria: string){
    if(Criteria === 'Priority' && !this.prioritySort){
      this.data.sort(this.SortByPriority);
      this.prioritySort = true;
    }else if(Criteria === 'Priority' && this.prioritySort){
      this.data = [...this.batch].map(item=>({...item}));
      this.prioritySort = false;
    }
    else if(Criteria === 'Status' && !this.statusSort){
      this.data.sort(this.SortByStatus);
      this.statusSort = true;
      return;
    }else{
      this.data = [...this.batch].map(item=>({...item}));
      this.statusSort = false;
    }
  }

  selectTech(id:string, tech:string){
    this.firebase.asignTech(id, tech).then(res => {
      swal.fire('Batch Updated', 'Tech Assigned...', 'success');
    }).catch(res => {
      swal.fire('Something Wrong', 'Try Again... ' + res, 'error');
    });
  }
  SortByPriority(c1: any, c2: any){
      if(c1.data.Priority < c2.data.Priority){
        return 1;
      }
      else if(c1.data.Priority === c2.data.Priority){
        return 0;
      }
      else {
        return -1;
      }

  }
  SortByStatus(c1: any, c2: any){
    if(c1.data.Status > c2.data.Status){
      return 1;
    }
    else if(c1.data.Status === c2.data.Status){
      return 0;
    }
    else {
      return -1;
    }

  }


}
