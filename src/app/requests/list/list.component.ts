import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import swal from'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batch :any[] = [];
  batch2:any[] = [];
  completed: any[] = []

  userProfile:any;
  userType:any;
  techUsers:any;

  constructor(private firebase:FirebaseService) {
    this.userProfile = localStorage.getItem('userDetail').split(',');
    this.userType = localStorage.getItem('accessReference');
   }

  ngOnInit() {
    this.supervisor();
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
    console.log(id);
  }

  selectTech(id:string, tech:string){
    this.firebase.asignTech(id, tech).then(res => {
      swal.fire('Batch Updated', 'Tech Assigned...', 'success');
    }).catch(res => {
      swal.fire('Something Wrong', 'Try Again... ' + res, 'error');
    });
  }

}
